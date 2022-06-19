import { ethers } from "ethers";
import BN from "bn.js";
import { Balance } from "../types";
import { abi, contractAddress } from "./configs";

export const initialize = () => {
  const { ethereum } = window as any;
  return Boolean(ethereum && ethereum.isMetaMask);
};

export const connectMetamask = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    const { ethereum } = window as any;
    const res = await ethereum.request({ method: 'eth_requestAccounts' });
    return res[0] as string;
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const installMetaMask = () => {
  window.alert('Please install MetaMask extension first')
}

export const getBalances = async (address: string): Promise<Balance> => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const balances = await contract.getBalances(address);

  let wbtcPrice = new BN(0), ethPrice = new BN(0), usdtValue0 = 0, usdtValue1 = 0, totalUsdtValue = 0;
  const balance0 = new BN(balances.balance0);
  const balance1 = new BN(balances.balance1);
  const balance2 = new BN(balances.balance2);
  const value1 = new BN(balances.valu1);
  const value2 = new BN(balances.value2);

  if (!balance2.isZero()) {
    ethPrice = value2.shln(18).div(balance2);
  }
  if (!balance1.isZero()) {
    wbtcPrice = value1.mul(ethPrice).div(balance1).shrn(10);
  }

  usdtValue0 = balance0.mul(ethPrice).toNumber();
  usdtValue1 = balance1.mul(ethPrice).toNumber();
  totalUsdtValue = usdtValue0 + usdtValue1 + balance2.toNumber();
  
  const result: Balance = {
    balance0: balance0.toNumber(),
    balance1: balance1.toNumber(),
    balance2: balance2.toNumber(),
    rblBalance: balances.rblBalance.toString(),
    usdtValue0,
    usdtValue1,
    totalUsdtValue,
  }

  console.log(result, balances);

  return result;
}
