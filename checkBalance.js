// checkBalance.js
// Kiểm tra số dư USDC của ví trên Arc Testnet

require('dotenv').config();
const { ethers } = require('ethers');

// ABI tối giản, chỉ cần các hàm để đọc thông tin token
const ERC20_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)"
];

async function main() {
  // 1. Kết nối tới Arc Testnet
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  // 2. Tạo wallet từ private key trong .env
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.log("Địa chỉ ví:", wallet.address);

  // 3. Kết nối tới contract USDC
  const usdc = new ethers.Contract(process.env.USDC_ADDRESS, ERC20_ABI, provider);

  // 4. Lấy thông tin token
  const symbol = await usdc.symbol();
  const decimals = await usdc.decimals();

  // 5. Lấy số dư
  const rawBalance = await usdc.balanceOf(wallet.address);
  const balance = ethers.formatUnits(rawBalance, decimals);

  console.log(`Số dư: ${balance} ${symbol}`);
}

main().catch((error) => {
  console.error("Lỗi:", error.message);
});