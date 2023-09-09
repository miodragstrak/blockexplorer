import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "./home";


const { Utils } = require("alchemy-sdk");

export function Address() {
  const { id } = useParams();
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      const balance = await alchemy.core.getBalance(id, "latest");
      setBalance(Utils.formatEther(balance));
    };
    getBalance();
  }, [id]);
  
  return balance;
}