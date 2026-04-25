import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('coupons')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabaseAdmin
    .from('coupons')
    .insert([
      {
        code: body.code.toUpperCase(),
        discount_type: body.discount_type,
        discount_value: body.discount_value,
        min_amount: body.min_amount || 0,
        usage_limit: body.usage_limit ? Number(body.usage_limit) : null,
        used_count: 0,
        is_active: true
      }
    ])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID zorunludur' }, { status: 400 });

  const { error } = await supabaseAdmin
    .from('coupons')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
