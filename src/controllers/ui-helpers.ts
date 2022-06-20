import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
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

  let wbtcPrice = BigNumber.from(0), ethPrice = BigNumber.from(0), usdtValue0 = 0, usdtValue1 = 0, totalUsdtValue = 0;
  const balance0 = balances.balance0 as BigNumber;
  const balance1 = balances.balance1 as BigNumber;
  const balance2 = (balances.balance2 as BigNumber).toNumber();
  const value1 = balances.value1 as BigNumber;
  const value2 = balances.value2 as BigNumber;
  const e18 = ethers.utils.parseUnits('1', 18);
  const e10 = ethers.utils.parseUnits('1', 10);

  if (!value2.isZero()) {
    ethPrice = e18.mul(balance2).div(value2);
  }
  if (!balance1.isZero()) {
    wbtcPrice = value1.mul(ethPrice).div(balance1).div(e10);
  }

  usdtValue0 = balance0.mul(ethPrice).div(e18).toNumber();
  usdtValue1 = balance1.mul(wbtcPrice).div(e10).toNumber();
  totalUsdtValue = usdtValue0 + usdtValue1 + balance2;
  
  const result: Balance = {
    balance0: balance0.toNumber(),
    balance1: balance1.toNumber(),
    balance2: balance2,
    rblBalance: (balances.rblBalance as BigNumber).div(e18).toNumber(),
    rblRawBalance: balances.rblBalance,
    usdtValue0,
    usdtValue1,
    totalUsdtValue,
  }

  console.log(result, balances);

  return result;
}

export const deposit = async (amount: number) => {
  const iface = new ethers.utils.Interface(abi);
  const ethereum = (window as any).ethereum;
  
  const depositFixedAmount = 1000;
  const data = iface.encodeFunctionData('deposit', [depositFixedAmount])
  const value = ethers.utils.parseUnits(amount.toString(), 18).toString();

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value, // Only required to send ether to the recipient from the initiating external account.
    data,
  };
  
  // txHash is a hex string
  // As with any RPC call, it may throw an error
  const txHash = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
  });
  console.log(txHash);
}

export const withdraw =async (amount: BigNumber) => {
  const iface = new ethers.utils.Interface(abi);
  const ethereum = (window as any).ethereum;

  const data = iface.encodeFunctionData('withdraw', [amount])
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    data,
  };
  
  // txHash is a hex string
  // As with any RPC call, it may throw an error
  const txHash = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
  });
  console.log(txHash);
}

export const checkConnection = async () => {
  const ethereum = (window as any).ethereum;
  try {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
  } catch (err) {
    return '';
  }
}
