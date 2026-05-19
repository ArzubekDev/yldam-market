import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Получаем данные от Finik (тело запроса)
    const body = await request.json();
    
    // 2. Получаем подпись из заголовков (для верификации)
    // Название заголовка уточните в документации Finik (например, x-finik-signature)
    const signature = request.headers.get('x-finik-signature'); 

    // TODO: Здесь должна быть верификация подписи с помощью вашего приватного ключа
    // и проверка статуса платежа, например: if (body.status === 'SUCCESS') { ... }

    console.log('Получен колбэк от Finik:', body);

    // 3. ОБЯЗАТЕЛЬНО возвращаем Finik статус 200, 
    // чтобы они поняли, что ваш сервер успешно принял уведомление
    return NextResponse.json({ status: 'ok' }, { status: 200 });
    
  } catch (error) {
    console.error('Ошибка при обработке вебхука Finik:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}