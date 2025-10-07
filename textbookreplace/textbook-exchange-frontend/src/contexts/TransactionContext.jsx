// src/contexts/TransactionContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext();

export function useTransactions() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("te_transactions");
      if (raw) setTransactions(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to read transactions from localStorage", e);
      setTransactions([]);
    }
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("te_transactions", JSON.stringify(transactions));
    } catch (e) {
      console.error("Failed to save transactions to localStorage", e);
    }
  }, [transactions]);

  const addTransaction = ({ bookId, buyerEmail, sellerEmail, amount = 0, type = "buy", paymentInfo = {} }) => {
    const tx = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      bookId,
      buyerEmail,
      sellerEmail,
      amount,
      type,
      status: "pending",
      createdAt: new Date().toISOString(),
      paymentInfo,
    };
    setTransactions((prev) => [tx, ...prev]);
    return tx;
  };

  const updateTransactionStatus = (id, status, paymentInfo = {}) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, status, paymentInfo: { ...t.paymentInfo, ...paymentInfo } } : t)));
  };

  const getTransactionsForUser = (email) => {
    return transactions.filter((t) => t.buyerEmail === email || t.sellerEmail === email);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, updateTransactionStatus, getTransactionsForUser }}>
      {children}
    </TransactionContext.Provider>
  );
}
