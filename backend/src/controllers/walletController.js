const Web3 = require('web3');
const EduTokenABI = require('../../smart-contracts/build/contracts/EduToken.json');

const web3 = new Web3(process.env.BLOCKCHAIN_PROVIDER);
const eduTokenContract = new web3.eth.Contract(EduTokenABI.abi, process.env.EDUTOKEN_CONTRACT_ADDRESS);

// @desc    Get EduToken balance
// @route   GET /api/wallet/balance
// @access  Private
const getEduTokenBalance = async (req, res) => {
  const accounts = await web3.eth.getAccounts();
  const balance = await eduTokenContract.methods.balanceOf(accounts[0]).call();

  res.json({ balance: web3.utils.fromWei(balance, 'Ether') });
};

module.exports = {
  getEduTokenBalance,
};
