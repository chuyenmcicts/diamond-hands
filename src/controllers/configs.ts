export const abi = [
    "function getReserves() public view returns (uint256 balance0, uint256 balance1, uint256 balance2, uint256 value1, uint256 value2)",
    "function getBalances(address _owner) external view returns (uint256 rblBalance, uint256 balance0, uint256 balance1, uint256 balance2, uint256 value1, uint256 value2)",
    "function deposit(uint256 _slippage) public payable returns (bool)",
    "  function withdraw(uint256 _amount) external returns (bool)",
];

export const contractAddress = "0x8d8d9Faa21db21E00706111b5034cC533e6E660d";
