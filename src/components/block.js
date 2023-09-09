import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "./home";

import { Link } from "react-router-dom";

export function Block() {
  const { id } = useParams();
  const [block, setBlock] = useState();

  useEffect(() => {
    const getBlock = async () => {
      const block = await alchemy.core.getBlock(Number(id));
      setBlock(block);
    };
    getBlock();
    console.log(block);
  }, [id]);
  return block.gasLimit.toString()
}
