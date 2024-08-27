const CertificationABI = require('../../smart-contracts/build/contracts/Certification.json');

const certificationContract = new web3.eth.Contract(CertificationABI.abi, process.env.CERTIFICATION_CONTRACT_ADDRESS);

// @desc    Issue a course completion certificate
// @route   POST /api/certificates/issue
// @access  Private (Teacher only)
const issueCertificate = async (req, res) => {
  const { studentAddress, course, studentName, grade } = req.body;

  const accounts = await web3.eth.getAccounts();
  const senderAddress = accounts[0];

  try {
    const certificateId = await certificationContract.methods
      .issueCertificate(studentAddress, course, studentName, grade)
      .send({ from: senderAddress });

    res.status(200).json({ certificateId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to issue certificate', details: error.message });
  }
};

module.exports = {
  issueCertificate,
};
