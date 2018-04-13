pragma solidity 0.4.21;

//
// This source file is part of the current-contracts open source project
// Copyright 2018 Zerion LLC
// Licensed under Apache License v2.0
//

import './StandardToken.sol';


/// @title Token contract - Implements Standard ERC20 with additional features.
/// @author Zerion - <inbox@zerion.io>
contract Token is StandardToken {

	// Time of the contract creation
	uint256 public creationTime;

	function Token() public {
		/* solium-disable-next-line security/no-block-members */
		creationTime = now;
	}

	/// @dev Owner can transfer out any accidentally sent ERC20 tokens
	function transferERC20Token(address _tokenAddress)
		public
		onlyOwner
		returns (bool success)
	{
		uint256 contractBalance = AbstractToken(_tokenAddress).balanceOf(address(this));
		uint256 ownerBalance = AbstractToken(_tokenAddress).balanceOf(address(owner));
		require(AbstractToken(_tokenAddress).transfer(owner, contractBalance));

		uint256 newOwnerBalance = AbstractToken(_tokenAddress).balanceOf(address(owner));
		assert(newOwnerBalance == add(ownerBalance, contractBalance));

		return true;
	}

	/// @dev Increases approved amount of tokens for spender. Returns success.
	function increaseApproval(address _spender, uint256 _value) public returns (bool success) {
		allowed[msg.sender][_spender] = add(allowed[msg.sender][_spender], _value);
		emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
		return true;
	}

	/// @dev Decreases approved amount of tokens for spender. Returns success.
	function decreaseApproval(address _spender, uint256 _value) public returns (bool success) {
		uint256 oldValue = allowed[msg.sender][_spender];
		if (_value > oldValue) {
			allowed[msg.sender][_spender] = 0;
		} else {
			allowed[msg.sender][_spender] = sub(oldValue, _value);
		}
		emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
		return true;
	}
}