const Web3 = require('web3');
const EduTokenABI = require('../../smart-contracts/build/contracts/EduToken.json');

const web3 = new Web3(process.env.BLOCKCHAIN_PROVIDER);
const eduTokenContract = new web3.eth.Contract(EduTokenABI.abi, process.env.EDUTOKEN_CONTRACT_ADDRESS);

// @desc    Reward student with EduTokens
// @route   POST /api/tokens/reward
// @access  Private (Teacher only)
const rewardStudent = async (req, res) => {
  const { studentAddress, amount } = req.body;

  const accounts = await web3.eth.getAccounts();
  const senderAddress = accounts[0]; // Ensure this is the teacher's address or an authorized address

  try {
    await eduTokenContract.methods.rewardStudent(studentAddress, amount).send({ from: senderAddress });
    res.status(200).json({ message: `Rewarded ${amount} EduTokens to ${studentAddress}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reward EduTokens', details: error.message });
  }
};

module.exports = {
  rewardStudent,
};
