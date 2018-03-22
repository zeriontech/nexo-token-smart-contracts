pragma solidity ^0.4.18;
import "./util/Token.sol"

contract NexoToken is Token {

  /*
   * Token meta data
   */
  string constant public name = "NEXO";

  string constant public symbol = "NXT";  //  TODO rename
  uint8 constant public decimals = 8;

  /// UNVESTED ALLOCATIONS
  address investorsAllocation = address(0xffffffffffffffffffffffffffffffffffffffff);
  // 525,000,000 will be distributed without vesting 52.50%

  /// VESTED ALLOCATIONS
  /// Each period has 6 months cliff
  uint256 vestingStart;                 // the date when vesting starts

  /*** Overdraft Funding Reserves ***/
  address overdraftAllocation = address(0x1111111111111111111111111111111111111111);
  uint256 overdraftAllocationPeriod = 0;
  uint256 lastTimeOverdraftAllocation;
  uint8 numberOfWithdrawing = 2;
  // 250,000,000 - 25% - will be vested
  // 2 times by 125,000,000
  // vested period 12 months

  /*** Team Funding Reserves ***/
  address teamAllocation  = address(0x2222222222222222222222222222222222222222);
  uint256 numberOfPastWithdrawalsForTeam = 0;
  uint8 numberOfVestingPeriodForTeam = 8;
  // 112,500,000 - 11.25% - will be vested
  // 8 times by 14,062,500
  // vested period 48 months

  /*** AirDrop Funding Reserves ***/
  address airDropAllocation  = address(0x3333333333333333333333333333333333333333);
  uint256 numberOfPastWithdrawalsForAirDrop = 0;
  uint8 numberOfVestingPeriodForAirDrop = 3;
  // total 6,000,000 - 6%
  // 10,000,000 - 1% - will be distributed without vesting
  // 50,000,000 - 5% - will be vested
  // 3 times by 16 666 666
  // vested period 18 months

  /*** Advisers Funding Reserves ***/
  address advisersAllocation  = address(0x4444444444444444444444444444444444444444);
  uint256 numberOfPastWithdrawalsForAdvisers = 0;
  uint8 numberOfVestingPeriodForAirDrop = 2;
  // total 52,500,000 - 5.25%
  // 25,000,000 - will be distributed without vesting
  // 27,500,000 - will be vested
  // 2 times by 13 750 000
  // vested period 12 months

  /// CONSTRUCTOR
  function NexoToken() {

    //  Overall, 1,000,000,000 tokens are distributed
    totalSupply = withDecimals(1_000_000_000, decimals);

    balances[investorsAllocation] = withDecimals(525_000_000, decimals);
    balances[overdraftAllocation] = withDecimals(250_000_000, decimals);
    balances[teamAllocation] = withDecimals(112_500_000, decimals);
    balances[airDropAllocation] = withDecimals(60_000_000, decimals);
    balances[advisersAllocation] = withDecimals(52_500_000, decimals);

    // unlocking funds without vesting
    allowed[investorsAllocation][msg.sender] = balanceOf(investorsAllocation);
    allowed[airDropAllocation][msg.sender] = withDecimals(10_000_000, decimals);
    allowed[advisersAllocation][msg.sender] = withDecimals(25_000_000, decimals);

  }

  /// DISTRIBUTION
  function distributeInvestorsAllocation(address to, uint256 amountWithDecimals) public onlyOwner {
     require(transferFrom(investorsAllocation, to, amountWithDecimals));
  }

  function distributeOverdraftAllocation(address to, uint256 amountWithDecimals) public onlyOwner {
     require(transferFrom(OverdraftAllocation, to, amountWithDecimals));
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


  // TODO add vesting allowed


}
