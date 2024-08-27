// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Certification is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Certificate {
        string course;
        string studentName;
        string grade;
    }

    mapping(uint256 => Certificate) private _certificates;

    constructor() ERC721("CourseCertification", "CERT") {}

    function issueCertificate(address student, string memory course, string memory studentName, string memory grade) public returns (uint256) {
        _tokenIds.increment();
        uint256 newCertificateId = _tokenIds.current();
        _mint(student, newCertificateId);

        _certificates[newCertificateId] = Certificate(course, studentName, grade);

        return newCertificateId;
    }

    function getCertificateDetails(uint256 certificateId) public view returns (Certificate memory) {
        return _certificates[certificateId];
    }
}
