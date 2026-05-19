import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createTransaction } from '@/lib/actions/transaction.action';

// Бета ключ
const FINIK_BETA_PUBLIC_KEY = `----- НАЧАЛО ОБЩЕГО КЛЮЧА ----- 
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwlrlKz / 8gLWd1ARWGA / 8 
o3a3Qy8G + hPifyqiPosiTY6nCHovANMIJXk6DH4qAqqZeLu8pLGxudkPbv8dSyG7 
F9PZEAryMPzjoB / 9P / F6g0W46K / FHDtwTM3YIVvstbEbL19m8yddv / xCT9JPPJTb 
LsSTVZq5zCqvKzpupwlGS3Q3oPyLAYe + ZUn4Bx2J1WQrBu3b08fNaR3E8pAkCK27 
JqFnP0eFfa817VCtyVKcFHb5ij / D0eUP519Qr / pgn + gsoG63W4pPHN / pKwQUUiAy 
uLSHqL5S2yu1dffyMcMVi9E / Q2HCTcez5OvOllgOtkNYHSv9pnrMRuws3u87 + hNT 
ZwIDAQAB 
----- КОНЕЦ ПУБЛИЧНОГО КЛЮЧА -----`;

export async function POST(request: Request) {
  try {
    const rawBody = await request.text(); 
    const body = JSON.parse(rawBody);
    
    const signature = request.headers.get('signature');
    const timestamp = request.headers.get('x-api-timestamp');

    if (!signature || !timestamp) {
      return NextResponse.json({ error: 'Missing security headers' }, { status: 400 });
    }

    // Проверка подписи
    const verify = crypto.createVerify('SHA256');
    verify.update(rawBody); 
    const isVerified = verify.verify(FINIK_BETA_PUBLIC_KEY, signature, 'base64');

    if (!isVerified) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Если оплата прошла успешно в интерфейсе Finik
    if (body.status === 'SUCCEEDED') {
      await createTransaction({
        paymentId: body.transactionId || 'unknown_id', // ID транзакции от Finik
        amount: body.amount ? Number(body.amount) : 0,  // Сумма платежа
        plan: 'Покупка товара в Yldam Market',
        buyerId: body.accountId || 'anonymous',
        createdAt: new Date()
      });
    }

    return NextResponse.json({ message: "OK" }, { status: 200 });

  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ message: "webhook error", error: error.message }, { status: 500 });
  }
}