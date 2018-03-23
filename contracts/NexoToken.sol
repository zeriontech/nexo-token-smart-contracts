pragma solidity 0.4.19;

//
// This source file is part of the nexo-contracts open source project
// Copyright 2018 Zerion LLC <inbox@zerion.io>
// Licensed under Apache License v2.0
//

import "./utils/Token.sol";

/// @title Token contract - Implements Standard ERC20 Token for Current project.
/// @author Vladimir Tidva - <vladimir@zerion.io>
contract NexoToken is Token {

  /// TOKEN META DATA
  string constant public name = "NEXO";
  string constant public symbol = "NXT";  //  TODO rename
  uint8 constant public decimals = 18;

  /// UNVESTED ALLOCATIONS
  address investorsAllocation = address(0xffffffffffffffffffffffffffffffffffffffff);
  // 525,000,000 will be distributed without vesting 52.50%

  /// VESTED ALLOCATIONS
  /// Each period has 6 months cliff
  uint256 vestingStart;                 // the date when vesting starts

  /*** Overdraft Funding Reserves ***/
  address overdraftAllocation = address(0x1111111111111111111111111111111111111111);
  uint256 numberOfPastWithdrawalsForOverdraft = 6;  // 6 month cliff
  uint8 numberOfVestingPeriodsForOverdraft = 12;
  uint256 overdraftPartition = withDecimals(41666666, dicimals);
  // Each month with 6 month cliff
  // 250,000,000 - 25% - will be vested
  // 6 times by 41666666
  // 4 tokens will be unlocked without vesting because of dividing
  // 4 + 6 * 41666666 = 250,000,000
  // vested period 12 months

  /*** Team Funding Reserves ***/
  address teamAllocation  = address(0x2222222222222222222222222222222222222222);
  uint256 numberOfPastWithdrawalsForTeam = 0;
  uint8 numberOfVestingPeriodsForTeam = 16;
  uint256 teamPartition = withDecimals(7031250, dicimals);
  // Each 3 month
  // 112,500,000 - 11.25% - will be vested
  // 16 times by 7,031,250
  // vested period 48 months

  /*** AirDrop Funding Reserves ***/
  address airDropAllocation  = address(0x3333333333333333333333333333333333333333);
  uint256 numberOfPastWithdrawalsForAirDrop = 0;
  uint8 numberOfVestingPeriodsForAirDrop = 3;
  uint256 airDropPartition = withDecimals(8333333, dicimals);
  // Each 3 month
  // total 60,000,000 - 6%
  // 10,000,002 - 1% - will be distributed without vesting
  // 2 tokens will be unlocked without vesting because of dividing
  // 49,999,998 - 5% - will be vested
  // 6 times by 8,333,333
  // vested period 18 months

  /*** Advisers Funding Reserves ***/
  address advisersAllocation  = address(0x4444444444444444444444444444444444444444);
  uint256 numberOfPastWithdrawalsForAdvisers = 0;
  uint8 numberOfVestingPeriodsForAdvisers = 12;
  uint256 AdvisersPartition = withDecimals(2291666, dicimals);
  // Each month
  // total 52,500,000 - 5.25%
  // 25,000,008 - will be distributed without vesting
  // 27 499 992 - will be vested (2291666*12)
  // 12 times by 2,291,666
  // vested period 12 months

  /// CONSTRUCTOR
  function NexoToken() {

    vestingStart = now;

    //  Overall, 1,000,000,000 tokens are distributed
    totalSupply = withDecimals(1000000000, decimals);

    balances[investorsAllocation] = withDecimals(525000000, decimals);
    balances[overdraftAllocation] = withDecimals(250000000, decimals);
    balances[teamAllocation] = withDecimals(112500000, decimals);
    balances[airDropAllocation] = withDecimals(60000000, decimals);
    balances[advisersAllocation] = withDecimals(52500000, decimals);

    // unlocking funds without vesting
    allowed[investorsAllocation][msg.sender] = balanceOf(investorsAllocation);
    allowed[airDropAllocation][msg.sender] = withDecimals(10000002, decimals);
    allowed[advisersAllocation][msg.sender] = withDecimals(25000008, decimals);
    allowed[overdraftAllocation][msg.sender] = withDecimals(4, decimals);

  }

  /// DISTRIBUTION
  function distributeInvestorsAllocation(address to, uint256 amountWithDecimals) public onlyOwner {
    require(transferFrom(investorsAllocation, to, amountWithDecimals));
  }

  function distributeOverdraftAllocation(address to, uint256 amountWithDecimals) public onlyOwner {
    require(transferFrom(overdraftAllocation, to, amountWithDecimals));
  }

  function distributeTeamAllocation(address to, uint256 amountWithDecimals) public onlyOwner {
    require(transferFrom(teamAllocation, to, amountWithDecimals));
  }

  function distributeAirDropAllocation(address to, uint256 amountWithDecimals) public onlyOwner {
    require(transferFrom(airDropAllocation, to, amountWithDecimals));
  }

  function distributeAdvisersAllocation(address to, uint256 amountWithDecimals) public onlyOwner {
    require(transferFrom(advisersAllocation, to, amountWithDecimals));
  }

  /// VESTING UNLOCKING
  function unlockOverdraft() public onlyOwner {
    // 6 months cliff then monthly vesting
    // 30 days it is 1 months
    uint256 countOfAllowedAndUnspentWithdraws = uint(uint((now - vestingStart)/ 30 days) -  numberOfPastWithdrawalsForOverdraft);

    require(countOfAllowedAndUnspentWithdraws > 0 && countOfAllowedAndUnspentWithdraws <= numberOfVestingPeriodsForOverdraft);
    uint256 countOfAllowedTokens =  SafeMath.mul(withDecimals(125000000, decimals), countOfAllowedAndUnspentWithdraws);
    allowed[overdraftAllocation][msg.sender] = countOfAllowedTokens;
    numberOfPastWithdrawalsForOverdraft += countOfAllowedAndUnspentWithdraws;
  }

  function unlockTeam() public onlyOwner {
    // 3 month vest
    uint256 countOfAllowedAndUnspentWithdraws = uint(uint((now - vestingStart)/ 3 * 30 days) -  numberOfPastWithdrawalsForTeam);

    require(countOfAllowedAndUnspentWithdraws > 0 && countOfAllowedAndUnspentWithdraws <= numberOfVestingPeriodsForTeam);
    uint256 countOfAllowedTokens =  SafeMath.mul(withDecimals(14062500, decimals), countOfAllowedAndUnspentWithdraws);
    allowed[teamAllocation][msg.sender] = countOfAllowedTokens;
    numberOfPastWithdrawalsForTeam += countOfAllowedAndUnspentWithdraws;
  }

  function unlockAirDrop() public onlyOwner {
    // 3 month vest
    uint256 countOfAllowedAndUnspentWithdraws = uint(uint((now - vestingStart)/ 3 * 30 days) -  numberOfPastWithdrawalsForAirDrop);

    require(countOfAllowedAndUnspentWithdraws > 0 && countOfAllowedAndUnspentWithdraws <= numberOfVestingPeriodsForAirDrop);
    uint256 countOfAllowedTokens =  SafeMath.mul(withDecimals(16666666, decimals), countOfAllowedAndUnspentWithdraws);
    allowed[airDropAllocation][msg.sender] = countOfAllowedTokens;
    numberOfPastWithdrawalsForTeam += countOfAllowedAndUnspentWithdraws;
  }

  function unlockAdvisers() public onlyOwner {
    // monthly
    uint256 countOfAllowedAndUnspentWithdraws = uint(uint((now - vestingStart)/ 30 days) -  numberOfPastWithdrawalsForAdvisers);

    require(countOfAllowedAndUnspentWithdraws > 0 && countOfAllowedAndUnspentWithdraws <= numberOfVestingPeriodsForAdvisers);
    uint256 countOfAllowedTokens =  SafeMath.mul(withDecimals(13750000, decimals), countOfAllowedAndUnspentWithdraws);
    allowed[advisersAllocation][msg.sender] = countOfAllowedTokens;
    numberOfPastWithdrawalsForTeam += countOfAllowedAndUnspentWithdraws;
  }


}
