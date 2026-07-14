export default function Dashboard({ expenses }) {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const totalTransactions = expenses.length;

  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((expense) => Number(expense.amount)))
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* Total Expenses */}
      <div className="bg-blue-600 text-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold">
          Total Expenses
        </h2>

        <p className="text-3xl font-bold mt-2">
          ₹{totalExpenses}
        </p>
      </div>

      {/* Transactions */}
      <div className="bg-green-600 text-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold">
          Transactions
        </h2>

        <p className="text-3xl font-bold mt-2">
          {totalTransactions}
        </p>
      </div>

      {/* Highest Expense */}
      <div className="bg-purple-600 text-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold">
          Highest Expense
        </h2>

        <p className="text-3xl font-bold mt-2">
          ₹{highestExpense}
        </p>
      </div>
    </div>
  );
}