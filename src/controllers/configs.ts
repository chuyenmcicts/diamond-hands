export const abi = [
  "function getReserves() public view returns (uint256 balance0, uint256 balance1, uint256 balance2, uint256 value1, uint256 value2)",
  "function getBalances(address _owner) external view returns (uint256 rblBalance, uint256 balance0, uint256 balance1, uint256 balance2, uint256 value1, uint256 value2)",
  "function deposit(uint256 _slippage) public payable returns (bool)",
  "  function withdraw(uint256 _amount) external returns (bool)",
  "function balanceOf(address _owner) external view returns (uint256 balance)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "function getValue(uint256 _tokenId) external view returns (uint256 startMonth, bool redeemed, uint256 count, uint256 ethAsset, uint256 btcAsset, uint256 usdcAsset, uint256 ethPrice, uint256 btcPrice)",
  "function estimateEthForUnitPrice() public view returns (uint256 ethAmount)",
  "function mint(address _to, bool _payByEth) external payable returns (bool)",
  "function redeem(uint256 _tokenId) external returns (bool)"
];

export const contractAddress = "0x8d8d9Faa21db21E00706111b5034cC533e6E660d";
export const supportedChainId = 4;
export const chainList: Record<number, string> = {
  1: "MainNet",
  2: "Ropsten",
  4: "Rinkeby",
  42: "Kovan",
};
