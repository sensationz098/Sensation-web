"use client";
import { TransactionCard } from "@/components/Products/TransactionCard";
import { TransactionDetailContent } from "@/components/Products/TransactionDetailContent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import getAllTransactions from "@/lib/user/getAllTransactions";
import getProfileId from "@/lib/user/getProfileId";
import getSpecificTransaction from "@/lib/user/getSpecificTransaction";
import { SpecificTransactionType } from "@/types/SpecificTransactionType";
import { TransactionType } from "@/types/TransactionType";
import { useEffect, useState } from "react";

// REMOVED 'async' from the component definition
const Page = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<TransactionType[] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [specificTransaction, setSpecificTransaction] =
    useState<SpecificTransactionType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const handleSpecificTransaction = async (id: string) => {
    try {
      const response = await getSpecificTransaction(id);
      setSpecificTransaction(response);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error loading transaction details", err);
    }
  };

  if (!user) return <div className="p-20 text-center">Not authenticated!</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-4 py-8 px-4">
      {/* ... Header Section */}

      <div className="space-y-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          transactions?.map((tx) => (
            <div
              key={tx.id}
              onClick={() => handleSpecificTransaction(tx.id)}
              className="cursor-pointer transition-transform active:scale-[0.98]"
            >
              <TransactionCard transaction={tx} />
            </div>
          ))
        )}
      </div>

      {/* MODAL / DIALOG */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">
              Transaction <span className="text-[#DC8916]">Details</span>
            </DialogTitle>
          </DialogHeader>

          {specificTransaction ? (
            <TransactionDetailContent data={specificTransaction} />
          ) : (
            <div className="py-10 text-center text-slate-400">
              Loading details...
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
