pragma solidity ^0.4.21;

//
// This source file is part of the current-contracts open source project
// Copyright 2018 Zerion LLC
// Licensed under Apache License v2.0
//

import "./StandardToken.sol";
import "./SafeMath.sol";


/// @title Token contract - Implements Standard ERC20 with additional features.
/// @author Zerion - <inbox@zerion.io>
contract Token is StandardToken, SafeMath {

    // Time of the contract creation
    uint public creationTime;

    function Token() public {
        creationTime = now;
    }


    /// @dev Owner can transfer out any accidentally sent ERC20 tokens
    function transferERC20Token(address tokenAddress)
        public
        onlyOwner
        returns (bool)
    {
        uint balance = AbstractToken(tokenAddress).balanceOf(this);
        return AbstractToken(tokenAddress).transfer(owner, balance);
    }

    /// @dev Multiplies the given number by 10^(decimals)
    function withDecimals(uint number, uint decimals)
        internal
        pure
        returns (uint)
    {
        return mul(number, pow(10, decimals));
    }


    /// @dev Increases approved amount of tokens for spender. Returns success.
    function increaseApproval(address _spender, uint _value) public returns (bool) {
        allowed[msg.sender][_spender] = add(allowed[msg.sender][_spender], _value);
        emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
        return true;
    }

    /// @dev Decreases approved amount of tokens for spender. Returns success.
    function decreaseApproval(address _spender, uint _value) public returns (bool) {
        uint oldValue = allowed[msg.sender][_spender];
        if (_value > oldValue) {
            allowed[msg.sender][_spender] = 0;
        } else {
            allowed[msg.sender][_spender] = sub(oldValue, _value);
        }
        emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
        return true;
    }
}
