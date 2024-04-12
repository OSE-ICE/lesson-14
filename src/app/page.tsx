"use client";
import { ChangeEvent, useEffect, useState } from "react";

type Expense = {
  id: number;
  name: string;
  cost: number;
};

const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch("http://localhost:3001/api/expenses");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  console.log(response);
  return response;
};

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    const fetchedExpenses = await getExpenses();
    setExpenses(fetchedExpenses);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (!expenses.length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {expenses.map((expense) => (
        <div className="expense-container" key={expense.id}>
          <h2>{expense.name}</h2>
          <p>Cost: {expense.cost}</p>
        </div>
      ))}
    </div>
  );
};

export default Expenses;
