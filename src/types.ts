export type Token = {
  tokenId: string;
  startMonth: number;
  redeemed: boolean;
  count: number;
  ethAsset: number;
  btcAsset: number;
  usdcAsset: number;
  ethPrice: number;
  btcPrice: number;
}[];

export type TokenData = {
  tokenId: string;
  startMonth: number;
  redeemed: boolean;
  count: number;
  ethAsset: number;
  btcAsset: number;
  usdcAsset: number;
  ethPrice: number;
  btcPrice: number;
};

export type ChainInfo = {
  chainId: number;
  name: string;
  valid: boolean;
};
