
// import HeaderBox from "@/components/HeaderBox";
// import Loader from "@/components/Loader";
// import { Pagination } from "@/components/Pagination";
// import TransactionsTable from "@/components/TransactionsTable";
// import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
// import { getLoggedInUser } from "@/lib/actions/user.actions";
// import { formatAmount } from "@/lib/utils";
// import React from "react";

// const TransactionHistory = async ({
//   searchParams: { id, page },
// }: SearchParamProps) => {
//   const currentPage = Number(page as string) || 1;

//   const loggedIn = await getLoggedInUser();
//   const accounts = await getAccounts({
//     userId: loggedIn.$id,
//   });

//   if (!accounts) return;
  

//   const accountsData = accounts?.data;
//   const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

//   const account = await getAccount({ appwriteItemId });
//   console.log("==> account", account);

//   const rowsPerPage = 10;
//   const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

//   const indexOfLastTransaction = currentPage * rowsPerPage;
//   const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

//   const currentTransactions =
//     account?.transactions.slice(
//       indexOfFirstTransaction,
//       indexOfLastTransaction
//     ) || [];

//   if (accounts) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader />
//       </div>
//     );
//   }
//   return (
//     <div className="transactions">
//       <div className="transactions-header">
//         <HeaderBox
//           title="Transaction History"
//           subtext="See your bank details and transactions."
//         />
//       </div>

//       <div className="space-y-6">
//         <div className="transactions-account">
//           <div className="flex flex-col gap-2">
//             <h2 className="text-18 font-bold text-white">
//               {account?.data.name}
//             </h2>
//             <p className="text-14 text-blue-25">{account?.data.officialName}</p>
//             <p className="text-14 font-semibold tracking-[1.1px] text-white">
//               ●●●● ●●●● ●●●● {account?.data.mask}
//             </p>
//           </div>

//           <div className="transactions-account-balance">
//             <p className="text-14">Current balance</p>
//             <p className="text-24 text-center font-bold">
//               {formatAmount(account?.data.currentBalance)}
//             </p>
//           </div>
//         </div>

//         <section className="flex w-full flex-col gap-6">
//           <TransactionsTable transactions={currentTransactions} />
//           {totalPages > 1 && (
//             <div className="my-4 w-full">
//               <Pagination totalPages={totalPages} page={currentPage} />
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default TransactionHistory;

"use client"; // Ensure this is a client-side component

import HeaderBox from "@/components/HeaderBox";
import Loader from "@/components/Loader";
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TransactionHistory = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || undefined;
  const page = Number(searchParams.get("page")) || 1;

  const [loading, setLoading] = useState(true); // State to handle loading
  const [account, setAccount] = useState<any>(null);
  const [currentTransactions, setCurrentTransactions] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch the data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show the loader

      try {
        const loggedIn = await getLoggedInUser();
        const accounts = await getAccounts({
          userId: loggedIn.$id,
        });

        if (!accounts) return;

        const accountsData = accounts.data;
        const appwriteItemId = id || accountsData[0]?.appwriteItemId;

        const accountData = await getAccount({ appwriteItemId });
        setAccount(accountData);

        const rowsPerPage = 10;
        const total = Math.ceil(
          (accountData?.transactions?.length ?? 0) / rowsPerPage
        );
        setTotalPages(total);

        const currentPage = page;
        const indexOfLastTransaction = currentPage * rowsPerPage;
        const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

        const transactions =
          accountData?.transactions?.slice(
            indexOfFirstTransaction,
            indexOfLastTransaction
          ) || [];
        setCurrentTransactions(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false); // Hide the loader after fetching data
      }
    };

    fetchData();
  }, [id, page]); // Re-run when id or page changes

  // Show the loader while the data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">{account?.data.name}</h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={currentTransactions} />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={page} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;
