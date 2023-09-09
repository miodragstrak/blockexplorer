import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { alchemy } from "./home";
const { Utils } = require("alchemy-sdk");

export function TransactionHash() {
  const { id } = useParams();
  const [recentTransaction, setRecentTransactions] = useState();
  const [block, setBlock] = useState();
  const [value, setValue] = useState();
  useEffect(() => {
    const getTransaction = async () => {
      const recentTransaction = await alchemy.core.getTransactionReceipt(id);
      setRecentTransactions(recentTransaction);

      const block = await alchemy.core.getBlockWithTransactions(
        recentTransaction.blockNumber
      );
      setBlock(block);

      let value;
      for (let i = 0; i < block.transactions.length; i++) {
        if (recentTransaction.transactionHash === block.transactions[i].hash) {
          value = Utils.formatEther(block.transactions[i].value);
          setValue(value);
        }
      }
    };
    getTransaction();
  }, [id]);
  return value;
}