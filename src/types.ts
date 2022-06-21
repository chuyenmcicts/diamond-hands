import { BigNumber } from "ethers";

export type Balance = {
  balance0: number;
  balance1: number;
  balance2: number;
  rblBalance: number;
  rblRawBalance: BigNumber;
  usdtValue0: number;
  usdtValue1: number;
  totalUsdtValue: number;
  wbtcPrice: number;
}
