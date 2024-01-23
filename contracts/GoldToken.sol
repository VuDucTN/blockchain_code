// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "hardhat/console.sol";

contract GoldToken is ERC20, ERC20Burnable, Ownable {
    uint256 private cap = 50_000_000_000 * 10 ** decimals();

    constructor() ERC20("GoldToken", "GDT") Ownable(msg.sender) {
         _mint(msg.sender, cap);
    }
    function transfer(address to, uint256 amount) public override returns (bool) {
        require(amount <= balanceOf(msg.sender), "Not enough tokens");

            console.log(
                "Transferring from %s to %s %s tokens",
                msg.sender,
                to,
                amount
            );

        return super.transfer(to, amount);
    }

    function mint(address to, uint256 amount) public onlyOwner{
        require(ERC20.totalSupply() + amount <= cap, "Floppy: cap exceeded");
        _mint(to, amount);
    }
}