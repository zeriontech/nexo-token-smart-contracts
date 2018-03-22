pragma solidity ^0.4.13;
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
}
