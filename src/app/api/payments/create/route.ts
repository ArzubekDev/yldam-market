import { NextResponse } from 'next/server';
import { Signer, RequestData } from '@mancho.devs/authorizer';

export async function POST(request: Request) {
  try {
    const { amount, orderId } = await request.json();

    const baseUrl = 'https://api.acquiring.averspay.kg'; // Для теста смени на beta-версию из доки
    const host = new URL(baseUrl).host;

    // Данные берутся из .env.local (они скрыты от пользователя)
    const apiKey = process.env.FINIK_API_KEY!; 
    const privateKey = process.env.FINIK_PRIVATE_PEM!; 
    const accountId = process.env.FINIK_ACCOUNT_ID!;
    const timestamp = Date.now().toString();

    const body = {
      Amount: amount,
      CardType: 'FINIK_QR',
      PaymentId: orderId, // Твой сгенерированный UUID для заказа
      RedirectUrl: 'https://yldam-market.vercel.app/payment-success',
      Data: {
        accountId: accountId,
        merchantCategoryCode: '0742', // Код категории (уточни у Finik)
        name_en: 'Yldam Market Payment',
      },
    };

    const requestData: RequestData = {
      httpMethod: 'POST',
      path: '/v1/payment',
      headers: {
        Host: host,
        'x-api-key': apiKey,
        'x-api-timestamp': timestamp,
      },
      body,
    };

    // Генерируем подпись с помощью пакета Finik
    const signature = await new Signer(requestData).sign(privateKey);

    // Делаем реальный запрос в Finik
    const res = await fetch(`${baseUrl}/v1/payment`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'x-api-timestamp': timestamp,
        signature,
      },
      body: JSON.stringify(body),
      redirect: 'manual', // Как требует документация
    });

    if (res.status === 302) {
      const redirectUrl = res.headers.get('location');
      // Возвращаем ссылку на оплату на фронтенд
      return NextResponse.json({ url: redirectUrl });
    } 
    
    const errorText = await res.text();
    return NextResponse.json({ error: errorText }, { status: res.status });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}