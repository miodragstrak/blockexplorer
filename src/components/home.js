import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
export const alchemy = new Alchemy(settings);

export function Home() {
  const [blockNumber, setBlockNumber] = useState();
  const [recentBlocks, setRecentBlocks] = useState();
  const [recentTransactions, setRecentTransaction] = useState();
  useEffect(() => {
    const blockArray = [];
    const transactionArray = [];

    const getRecentBlocks = async () => {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNumber);
      for (let i = blockNumber; i >= blockNumber - 20; i--) {
        const block = await alchemy.core.getBlock(i);
        blockArray.push(block);
      }
      setRecentBlocks(blockArray);
      console.log("recentBlocks", recentBlocks);
    };

    const getRecentTransactions = async () => {
      const { transactions } = await alchemy.core.getBlockWithTransactions(
        blockNumber
      );
      for (let i = 0; i <= 10; i++) {
        transactionArray.push(transactions[i]);
      }
      setRecentTransaction(transactionArray);
      console.log("recentTransaction", recentTransactions);
    };

    getRecentBlocks();
    getRecentTransactions();
  }, []);

  return recentBlocks.map(block, i);
}