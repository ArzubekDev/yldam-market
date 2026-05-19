'use server';

// Типизация для входных данных транзакции (чтобы TypeScript не ругался)
export type CreateTransactionParams = {
  paymentId: string;
  amount: number;
  plan?: string;
  buyerId?: string;
  createdAt: Date;
};

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    // Базы данных нет, поэтому мы просто выводим данные в консоль сервера (терминал)
    console.log('=== [MOCK DATABASE] Сохранение транзакции ===');
    console.log(`ID транзакции Finik: ${transaction.paymentId}`);
    console.log(`Сумма оплаты: ${transaction.amount} сом`);
    console.log(`Дата создания: ${transaction.createdAt}`);
    console.log('============================================');

    // Имитируем успешный ответ, возвращая чистый объект
    return {
      success: true,
      message: "Трансляция успешно обработана (статический режим)",
      data: transaction
    };
  } catch (error) {
    console.error("Ошибка при симуляции сохранения транзакции:", error);
    throw error;
  }
}