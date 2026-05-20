import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        {/* Иконка успешной оплаты */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Оплата прошла успешно!
        </h1>
        <p className="mb-8 text-gray-600">
          Спасибо за покупку. Ваш заказ уже обрабатывается и скоро будет доступен в личном кабинете.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            На главную
          </Link>
          {/* Если есть страница заказов, можно раскомментировать: */}
          {/* <Link
            href="/profile"
            className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Мои заказы
          </Link> */}
        </div>
      </div>
    </div>
  );
}