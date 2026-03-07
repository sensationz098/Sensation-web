"use client";
import { TransactionCard } from "@/components/Products/TransactionCard";
import { useAuth } from "@/context/AuthContext";
import getAllTransactions from "@/lib/user/getAllTransactions";
import getProfileId from "@/lib/user/getProfileId";
import getSpecificTransaction from "@/lib/user/getSpecificTransaction";
import { TransactionType } from "@/types/TransactionType";
import { useEffect, useState } from "react";

// REMOVED 'async' from the component definition
const Page = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<TransactionType[] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!user?.uid) return;
      try {
        setLoading(true);
        const userId = await getProfileId(user.uid);
        const data = await getAllTransactions(userId);
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [user?.uid]);

  if (!user) return <div className="p-20 text-center">Not authenticated!</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-4 py-8 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
          Recent <span className="text-[#DC8916]">Transactions</span>
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 italic">
          Loading your history...
        </div>
      ) : transactions && transactions.length > 0 ? (
        transactions.map((tx) => (
          <button onClick={() => getSpecificTransaction(tx.id)}>
            <TransactionCard key={tx.id} transaction={tx} />
          </button>
        ))
      ) : (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
          <p className="text-slate-400">No transactions found.</p>
        </div>
      )}
    </div>
  );
};

export default Page;
