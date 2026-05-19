import { RequestData, Signer } from '@mancho.devs/authorizer';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    const baseUrl = 'https://api.acquiring.averspay.kg';
    const host = new URL(baseUrl).host;

    const apiKey = process.env.FINIK_API_KEY!;
    const privateKey = process.env.FINIK_PRIVATE_PEM!.replace(/\\n/g, '\n').replace(/\r/g, '');
    const accountId = process.env.FINIK_ACCOUNT_ID!;
    const timestamp = Date.now().toString();
    const generatedPaymentId = uuidv4();

    const body = {
      Amount: Number(amount),
      CardType: 'FINIK_QR',
      PaymentId: generatedPaymentId,
      RedirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
      Data: {
        accountId: accountId,
        merchantCategoryCode: '0742',
        name_en: 'Yldam Market Payment',
        webhookUrl: 'http://localhost:3000/api/payments/webhook',
      },
    };

    const requestData: RequestData = {
      httpMethod: 'POST',
      path: '/v1/payment',
      headers: {
        Host: host,
        'X-API-KEY': apiKey, // Изменено на верхний регистр
        'X-API-TIMESTAMP': timestamp, // Изменено на верхний регистр
      },
      body,
    };

    const signature = await new Signer(requestData).sign(privateKey);

    const res = await fetch(`${baseUrl}/v1/payment`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'x-api-timestamp': timestamp,
        signature,
      },
      body: JSON.stringify(body),
      redirect: 'manual',
    });

    if (res.status === 302) {
      const paymentUrl = res.headers.get('location');
      return NextResponse.json({ url: paymentUrl }, { status: 200 });
    }

    // Подробный лог ошибки от Finik
    const errorText = await res.text();
    console.log('Статус ответа Finik:', res.status);
    console.log('Заголовки ответа:', Object.fromEntries(res.headers.entries()));
    console.log('Тело ответа Finik:', errorText);

    return NextResponse.json({ error: errorText }, { status: res.status });
  } catch (error: any) {
    console.error('Ошибка на бэкенде Next.js:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
