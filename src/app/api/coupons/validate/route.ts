import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const { code, cartTotal } = await request.json();

    const { data: coupon, error } = await supabaseAdmin
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !coupon) {
      return NextResponse.json({ error: 'Geçersiz kupon kodu.' }, { status: 404 });
    }

    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return NextResponse.json({ error: 'Bu kuponun kullanım limiti dolmuştur.' }, { status: 400 });
    }

    if (cartTotal < coupon.min_amount) {
      return NextResponse.json({ 
        error: `Bu kupon en az ${coupon.min_amount} TL tutarındaki sepetlerde geçerlidir.` 
      }, { status: 400 });
    }

    let discountAmount = 0;
    if (coupon.discount_type === 'percentage') {
      discountAmount = (cartTotal * coupon.discount_value) / 100;
    } else {
      discountAmount = coupon.discount_value;
    }

    return NextResponse.json({
      code: coupon.code,
      discountAmount,
      discountType: coupon.discount_type,
      discountValue: coupon.discount_value
    });

  } catch (err) {
    return NextResponse.json({ error: 'Kupon kontrol edilemedi.' }, { status: 500 });
  }
}
