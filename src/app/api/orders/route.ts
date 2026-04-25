import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { emailService } from '@/lib/email-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const orderId = searchParams.get('orderId');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    console.log('--- Order Search Debug ---');
    console.log('Params:', { userId, orderId, email, phone });

    let query = supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (orderId) {
      const cleanId = orderId.trim().replace(/^#/, '').toUpperCase();
      const searchId = cleanId.startsWith('ORD-') ? cleanId : `ORD-${cleanId}`;
      
      // Sipariş ID varsa direkt onu ara, diğer bilgilere gerek kalmasın
      query = query.or(`id.ilike.${searchId},id.ilike.${cleanId}`);
    } else if (email || phone) {
      // ID yoksa iletişim bilgileriyle ara
      if (email) query = query.ilike('customer_email', email.trim());
      if (phone) query = query.eq('customer_phone', phone.trim());
    } else if (userId && userId !== 'guest') {
      query = query.eq('user_id', userId);
    }
    // Eğer hiçbir parametre yoksa (Admin paneli gibi), tüm siparişleri getirir (varsayılan davranış)

    const { data, error } = await query;
    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }
    console.log('Result count:', data?.length || 0);
    if (data && data.length > 0) console.log('First result ID:', data[0].id);

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Siparişler okunamadı' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      user_id: body.userId || 'guest',
      items: body.items || [],
      total_amount: body.totalAmount,
      used_credit: body.usedCredit || 0,
      status: body.status || 'pending',
      shipping_address: body.shippingAddress || '',
      customer_email: body.customerEmail || null,
      customer_phone: body.customerPhone || null,
      payment_method: body.paymentMethod || 'iban',
      is_archived: false,
    };

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert(newOrder)
      .select()
      .single();

    if (error) throw error;

    // Kredi kullanıldıysa profilden düş
    if (body.userId && body.userId !== 'guest' && body.usedCredit > 0) {
      // Mevcut bakiyeyi al
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('credit_balance')
        .eq('id', body.userId)
        .single();

      if (profile) {
        const newBalance = Math.max(0, (profile.credit_balance || 0) - body.usedCredit);
        await supabaseAdmin
          .from('profiles')
          .update({ credit_balance: newBalance })
          .eq('id', body.userId);
      }
    }

    // Kupon kullanıldıysa kullanım sayısını artır
    if (body.couponCode) {
      const { data: coupon } = await supabaseAdmin
        .from('coupons')
        .select('used_count')
        .eq('code', body.couponCode.toUpperCase())
        .single();
      
      if (coupon) {
        await supabaseAdmin
          .from('coupons')
          .update({ used_count: (coupon.used_count || 0) + 1 })
          .eq('code', body.couponCode.toUpperCase());
      }
    }

    // Mail Operasyonlarını Başlat (Awaited for reliability in serverless)
    await emailService.sendAdminOrderNotification(data);
    await emailService.sendCustomerOrderConfirmation(data);

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sipariş oluşturulamadı' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID zorunludur' }, { status: 400 });

    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({ 
        status: body.status !== undefined ? body.status : undefined,
        is_archived: body.is_archived !== undefined ? body.is_archived : undefined,
        cargo_company: body.cargo_company !== undefined ? body.cargo_company : undefined,
        tracking_number: body.tracking_number !== undefined ? body.tracking_number : undefined,
        cancel_reason: body.cancel_reason !== undefined ? body.cancel_reason : undefined,
        is_new: body.is_new !== undefined ? body.is_new : undefined
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    // Durum Değişikliğine Göre Mail Tetikle (Awaited for reliability)
    try {
      if (body.status === 'processing') {
        await emailService.sendOrderApprovedNotification(data);
      } else if (body.status === 'shipped') {
        await emailService.sendShippingNotification(data);
      } else if (body.status === 'cancelled') {
        await emailService.sendCancellationNotification(data);
      }
    } catch (mailErr) {
      console.error('API Durum Mail Hatası:', mailErr);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sipariş güncellenemedi' }, { status: 500 });
  }
}
