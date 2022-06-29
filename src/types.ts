export type Token = {
  tokenId: number;
  startMonth: number;
  redeemed: boolean;
  count: number;
  ethAsset: number;
  btcAsset: number;
  usdcAsset: number;
  ethPrice: number;
  btcPrice: number;
  ethValue: number;
  btcValue: number;
}[];

export type TokenData = {
  tokenId: number;
  startMonth: number;
  redeemed: boolean;
  count: number;
  ethAsset: number;
  btcAsset: number;
  usdcAsset: number;
  ethPrice: number;
  btcPrice: number;
  ethValue: number;
  btcValue: number;
};

export type ChainInfo = {
  chainId: number;
  name: string;
  valid: boolean;
};
