import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import { Token } from "../types";
import { abi } from "./configs";
import { mockResponse } from "../mock/dataTokenMock";

export const initialize = () => {
  const { ethereum } = window as any;
  return Boolean(ethereum && ethereum.isMetaMask);
};

export const loadEnv = () => {
  const contractAddress = process.env.REACT_APP_CONTRACT as string;
  const supportedChainId = Number(process.env.REACT_APP_CHAIN_ID);
  return { contractAddress, supportedChainId };
};

export const connectMetamask = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    const { ethereum } = window as any;
    const res = await ethereum.request({ method: "eth_requestAccounts" });
    return res[0] as string;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const installMetaMask = () => {
  window.alert("Please install MetaMask extension first");
};

export const getBalances = async (): Promise<Token> => {
  return new Promise((done) => {
    setTimeout(() => {
      done(mockResponse);
    }, 0);
  });
};

export const deposit = async (amount: number) => {
  const iface = new ethers.utils.Interface(abi);
  const ethereum = (window as any).ethereum;
  const { contractAddress } = loadEnv();

  const depositFixedAmount = 1000;
  const data = iface.encodeFunctionData("deposit", [depositFixedAmount]);
  const value = ethers.utils.parseEther(amount.toString()).toHexString();

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value, // Only required to send ether to the recipient from the initiating external account.
    data,
  };

  // txHash is a hex string
  // As with any RPC call, it may throw an error
  const txHash = await ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  });
  console.log(txHash);
};

export const withdraw = async (amount: BigNumber) => {
  const iface = new ethers.utils.Interface(abi);
  const ethereum = (window as any).ethereum;
  const { contractAddress } = loadEnv();

  const data = iface.encodeFunctionData("withdraw", [amount]);
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    data,
  };

  // txHash is a hex string
  // As with any RPC call, it may throw an error
  const txHash = await ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  });
  console.log(txHash);
};

export const checkConnection = async () => {
  const ethereum = (window as any).ethereum;
  try {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    return accounts[0];
  } catch (err) {
    return "";
  }
};
