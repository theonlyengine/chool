// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EduToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("EduToken", "EDU") {
        _mint(msg.sender, initialSupply);
    }

    function rewardStudent(address student, uint256 amount) public {
        _transfer(msg.sender, student, amount);
    }
}
