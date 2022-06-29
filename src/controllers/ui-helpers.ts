import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import { Token } from "../types";
import { abi } from "./configs";

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

export const getTokens = async (address: string): Promise<Token> => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const { contractAddress } = loadEnv();
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const balance = (await contract.balanceOf(address)) as BigNumber;

  let tokens = [] as Token;

  for (let i = 0; i < Number(balance); i++) {
    const tokenId = await contract.tokenOfOwnerByIndex(address, i);
    const tokenValue = await contract.getValue(tokenId);

    const e18 = ethers.utils.parseUnits("1", 18);
    const e8 = ethers.utils.parseUnits("1", 8);
    const ethAsset = tokenValue.ethAsset as BigNumber;
    const btcAsset = tokenValue.btcAsset as BigNumber;
    const usdcAsset = tokenValue.usdcAsset as BigNumber;
    const ethPrice = tokenValue.ethPrice as BigNumber;
    const btcPrice = tokenValue.btcPrice as BigNumber;
    let btcValue = BigNumber.from(0);
    let ethValue = BigNumber.from(0);

    btcValue = btcAsset.mul(btcPrice).div(e8);
    ethValue = ethAsset.mul(ethPrice).div(e18);

    tokens.push({
      tokenId: tokenId.toNumber(),
      startMonth: tokenValue.startMonth.toNumber(),
      redeemed: tokenValue.redeemed,
      count: tokenValue.count.toNumber(),
      ethAsset: Number(ethers.utils.formatUnits(ethAsset, 18)),
      btcAsset: Number(ethers.utils.formatUnits(btcAsset, 8)),
      usdcAsset: Number(ethers.utils.formatUnits(usdcAsset, 6)),
      ethPrice: Number(ethers.utils.formatUnits(ethPrice, 6)),
      btcPrice: Number(ethers.utils.formatUnits(btcPrice, 6)),
      ethValue: Number(ethers.utils.formatUnits(ethValue, 6)),
      btcValue: Number(ethers.utils.formatUnits(btcValue, 6)),
    });
  }

  return tokens;
};

export const buy = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const { contractAddress } = loadEnv();
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const iface = new ethers.utils.Interface(abi);
  const ethereum = (window as any).ethereum;
  const data = iface.encodeFunctionData("mint", [contractAddress, true]);
  const estimatedEth = (await contract.estimateEthForUnitPrice()) as BigNumber;
  const value = Number(estimatedEth) * 1.01;

  const transactionParameters = {
    to: contractAddress,
    from: ethereum.selectedAddress,
    data,
    value,
  };

  const txHash = await ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  });
  console.log(txHash);
};

export const redeem = async (tokenId: number) => {
  const iface = new ethers.utils.Interface(abi);
  const ethereum = (window as any).ethereum;
  const { contractAddress } = loadEnv();

  const data = iface.encodeFunctionData("redeem", [tokenId]);
  const transactionParameters = {
    to: contractAddress,
    from: ethereum.selectedAddress,
    data,
  };
  
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
