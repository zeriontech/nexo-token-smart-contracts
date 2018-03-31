pragma solidity 0.4.21;

//
// This source file is part of the nexo-contracts open source project
// Copyright 2018 Zerion LLC <inbox@zerion.io>
// Licensed under Apache License v2.0
//

import "./utils/Token.sol";

/// @title Token contract - Implements Standard ERC20 Token for NEXO project.
/// @author Zerion - <inbox@zerion.io>
contract NexoToken is Token {

    /// TOKEN META DATA
    string constant public name = "Nexo";
    string constant public symbol = "NEXO";
    uint8  constant public decimals = 18;


    /// ALOCATIONS
    // To calculate vesting periods we assume that 1 month is always equal to 30 days 


    /*** Initial Investors' tokens ***/

    // 525,000,000 (52.50%) tokens are distributed among initial investors
    // These tokens will be distributed without vesting

    address public investorsAllocation = address(0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF);
    uint256 public investorsTotal = withDecimals(525000000, decimals);


    /*** Overdraft Reserves ***/

    // 250,000,000 (25%) tokens will be eventually available for overdraft
    // These tokens will be distributed monthly with a 6 month cliff within a year
    // 41,666,666 tokens will be unlocked every month after the cliff
    // 4 tokens will be unlocked without vesting to ensure that total amount sums up to 250,000,000.

    address public overdraftAllocation = address(0x1111111111111111111111111111111111111111);
    uint256 public overdraftTotal = withDecimals(250000000, decimals);
    uint256 public overdraftPeriodAmount = withDecimals(41666666, decimals);
    uint256 public overdraftUnvested = withDecimals(4, decimals);
    uint256 public overdraftCliff = 5 * 30 days;
    uint256 public overdraftPeriodLength = 30 days;
    uint8   public overdraftPeriodsNumber = 6;


    /*** Tokens reserved for Founders and Team ***/

    // 112,500,000 (11.25%) tokens will be eventually available for the team
    // These tokens will be distributed every 3 month without a cliff within 4 years
    // 7,031,250 tokens will be unlocked every 3 month

    address public teamAllocation  = address(0x2222222222222222222222222222222222222222);
    uint256 public teamTotal = withDecimals(112500000, decimals);
    uint256 public teamPeriodAmount = withDecimals(7031250, decimals);
    uint256 public teamUnvested = 0;
    uint256 public teamCliff = 0;
    uint256 public teamPeriodLength = 3 * 30 days;
    uint8   public teamPeriodsNumber = 16;



    /*** Tokens reserved for Community Building and Airdrop Campaigns ***/

    // 60,000,000 (6%) tokens will be eventually available for the community
    // 10,000,002 tokens will be available instantly without vesting
    // 49,999,998 tokens will be distributed every 3 month without a cliff within 18 months
    // 8,333,333 tokens will be unlocked every 3 month


    address public communityAllocation  = address(0x3333333333333333333333333333333333333333);
    uint256 public communityTotal = withDecimals(60000000, decimals);
    uint256 public communityPeriodAmount = withDecimals(8333333, decimals);
    uint256 public communityUnvested = withDecimals(10000002, decimals);
    uint256 public communityCliff = 0;
    uint256 public communityPeriodLength = 3 * 30 days;
    uint8   public communityPeriodsNumber = 6;



    /*** Tokens reserved for Advisors, Legal and PR ***/

    // 52,500,000 (5.25%) tokens will be eventually available for advisers
    // 25,000,008 tokens will be available instantly without vesting
    // 27 499 992 tokens will be distributed monthly without a cliff within 12 months
    // 2,291,666 tokens will be unlocked every month

    address public advisersAllocation  = address(0x4444444444444444444444444444444444444444);
    uint256 public advisersTotal = withDecimals(52500000, decimals);
    uint256 public advisersPeriodAmount = withDecimals(2291666, decimals);
    uint256 public advisersUnvested = withDecimals(25000008, decimals);
    uint256 public advisersCliff = 0;
    uint256 public advisersPeriodLength = 30 days;
    uint8   public advisersPeriodsNumber = 12;


    /// CONSTRUCTOR

    function NexoToken() public {
        //  Overall, 1,000,000,000 tokens exist
        totalSupply = withDecimals(1000000000, decimals);

        balances[investorsAllocation] = investorsTotal;
        balances[overdraftAllocation] = overdraftTotal;
        balances[teamAllocation] = teamTotal;
        balances[communityAllocation] = communityTotal;
        balances[advisersAllocation] = advisersTotal;

        // Unlock some tokens without vesting
        allowed[investorsAllocation][msg.sender] = investorsTotal;
        allowed[overdraftAllocation][msg.sender] = overdraftUnvested;
        allowed[communityAllocation][msg.sender] = communityUnvested;
        allowed[advisersAllocation][msg.sender] = advisersUnvested;

    }

    /// DISTRIBUTION

    function distributeInvestorsTokens(address to, uint256 amountWithDecimals) public onlyOwner {
        require(transferFrom(investorsAllocation, to, amountWithDecimals));
    }

    function distributeOverdraftTokens(address to, uint256 amountWithDecimals) public onlyOwner {
        require(transferFrom(overdraftAllocation, to, amountWithDecimals));
    }

    function distributeTeamTokens(address to, uint256 amountWithDecimals) public onlyOwner {
        require(transferFrom(teamAllocation, to, amountWithDecimals));
    }

    function distributeAirDropTokens(address to, uint256 amountWithDecimals) public onlyOwner {
        require(transferFrom(communityAllocation, to, amountWithDecimals));
    }

    function distributeAdvisersAllocation(address to, uint256 amountWithDecimals) public onlyOwner {
        require(transferFrom(advisersAllocation, to, amountWithDecimals));
    }

    /// VESTING

    function calculateUnlockedTokens(uint256 cliff, uint256 periodLength, uint256 periodAmount, uint8 periodsNumber, uint256 unvestedAmount)
        private
        view
        returns (uint256) 
    {   
        if (now < add(creationTime, cliff)) {
            return unvestedAmount;
        }
        uint256 periods = div(sub(now, add(creationTime, cliff)), periodLength);
        periods = periods > periodsNumber ? periodsNumber : periods;
        return add(unvestedAmount, mul(periods, periodAmount));
    }

    function withdawOverdraftTokens(uint256 amountWithDecimals, address _to)
        public
        onlyOwner
    {
        uint256 unlockedTokens = 
            calculateUnlockedTokens(overdraftCliff, overdraftPeriodLength, overdraftPeriodAmount, overdraftPeriodsNumber, overdraftUnvested);
        uint256 spentTokens = sub(overdraftTotal, balanceOf(overdraftAllocation));
        allowed[overdraftAllocation][msg.sender] = sub(unlockedTokens, spentTokens);
        transferFrom(overdraftAllocation, _to, amountWithDecimals);
    }


    function withdawTeamTokens(uint256 amountWithDecimals, address _to)
        public
        onlyOwner 
    {
        uint256 unlockedTokens = 
            calculateUnlockedTokens(teamCliff, teamPeriodLength, teamPeriodAmount, teamPeriodsNumber, teamUnvested);
        uint256 spentTokens = sub(teamTotal, balanceOf(teamAllocation));
        allowed[teamAllocation][msg.sender] = sub(unlockedTokens, spentTokens);
        transferFrom(teamAllocation, _to, amountWithDecimals);
    }

    function witdrawCommunityTokens(uint256 amountWithDecimals, address _to)
        public
        onlyOwner 
    {
        uint256 unlockedTokens = 
            calculateUnlockedTokens(communityCliff, communityPeriodLength, communityPeriodAmount, communityPeriodsNumber, communityUnvested);
        uint256 spentTokens = sub(communityTotal, balanceOf(communityAllocation));
        allowed[communityAllocation][msg.sender] = sub(unlockedTokens, spentTokens);
        transferFrom(communityAllocation, _to, amountWithDecimals);
    }

    function withdrawAdvisersTokens(uint256 amountWithDecimals, address _to)
        public
        onlyOwner 
    {
        uint256 unlockedTokens = 
            calculateUnlockedTokens(advisersCliff, advisersPeriodLength, advisersPeriodAmount, advisersPeriodsNumber, advisersUnvested);
        uint256 spentTokens = sub(advisersTotal, balanceOf(advisersAllocation));
        allowed[advisersAllocation][msg.sender] = sub(unlockedTokens, spentTokens);
        transferFrom(advisersAllocation, _to, amountWithDecimals);
    }

    /// @dev Overrides StandardToken.sol function
    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256 remaining)
    {   
        if (_spender != owner) {
            return allowed[_owner][_spender];
        }

        uint256 unlockedTokens;
        uint256 spentTokens;

        if (_owner == overdraftAllocation) {
            unlockedTokens = 
                calculateUnlockedTokens(overdraftCliff, overdraftPeriodLength, overdraftPeriodAmount, overdraftPeriodsNumber, overdraftUnvested);
            spentTokens = sub(overdraftTotal, balanceOf(overdraftAllocation));
        } else if (_owner == teamAllocation) {
            unlockedTokens = 
                calculateUnlockedTokens(teamCliff, teamPeriodLength, teamPeriodAmount, teamPeriodsNumber, teamUnvested);
            spentTokens = sub(teamTotal, balanceOf(teamAllocation));
        } else if (_owner == communityAllocation) {
            unlockedTokens = 
                calculateUnlockedTokens(communityCliff, communityPeriodLength, communityPeriodAmount, communityPeriodsNumber, communityUnvested);
            spentTokens = sub(communityTotal, balanceOf(communityAllocation));
        } else if (_owner == advisersAllocation) {
            unlockedTokens = 
                calculateUnlockedTokens(advisersCliff, advisersPeriodLength, advisersPeriodAmount, advisersPeriodsNumber, advisersUnvested);
            spentTokens = sub(advisersTotal, balanceOf(advisersAllocation));
        } else {
            return allowed[_owner][_spender];
        }

        return sub(unlockedTokens, spentTokens);
    }
}
