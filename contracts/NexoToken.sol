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
    uint8 constant public decimals = 18;


    /// ALOCATIONS
    // To calculate vesting periods we assume that 1 month is always equal to 30 days 


    /*** Initial Investors' tokens ***/

    // 525,000,000 (52.50%) tokens are distributed among initial investors
    // These tokens will be distributed without vesting

    address investorsAllocation = address(0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF);
    uint256 investorsTotal = withDecimals(525000000, decimals);


    /*** Overdraft Funding Reserves ***/

    // 250,000,000 (25%) tokens will be eventually available for overdraft
    // These tokens will be distributed monthly with a 6 month cliff within a year
    // 41,666,666 tokens will be unlocked every month after the cliff
    // 4 tokens will be unlocked without vesting to ensure that total amount sums up to 250,000,000.

    address overdraftAllocation = address(0x1111111111111111111111111111111111111111);
    uint256 overdraftTotal = withDecimals(250000000, decimals);
    uint256 overdraftPeriodAmount = withDecimals(41666666, decimals);
    uint256 overdraftUnvested = 0;
    uint256 overdraftCliff = 6 * 30 days;
    uint256 overdraftPeriodLength = 30 days;
    uint8 overdraftPeriodsNumber = 6;


    /*** Team Funding Reserves ***/

    // 112,500,000 (11.25%) tokens will be eventually available for the team
    // These tokens will be distributed every 3 month without a cliff within 4 years
    // 7,031,250 tokens will be unlocked every 3 month

    address teamAllocation  = address(0x2222222222222222222222222222222222222222);
    uint256 teamTotal = withDecimals(112500000, decimals);
    uint256 teamPeriodAmount = withDecimals(7031250, decimals);
    uint256 teamUnvested = 0;
    uint256 teamCliff = 0;
    uint256 teamPeriodLength = 3 * 30 days;
    uint8 teamPeriodsNumber = 16;



    /*** AirDrop Funding Reserves ***/

    // 60,000,000 (6%) tokens will be eventually available for the airdrop
    // 10,000,002 tokens will be available instantly without vesting
    // 49,999,998 tokens will be distributed every 3 month without a cliff within 18 months
    // 8,333,333 tokens will be unlocked every 3 month


    address airdropAllocation  = address(0x3333333333333333333333333333333333333333);
    uint256 airdropTotal = withDecimals(60000000, decimals);
    uint256 airdropPeriodAmount = withDecimals(8333333, decimals);
    uint256 airdropUnvested = withDecimals(10000002, decimals);
    uint256 airdropCliff = 0;
    uint256 airdropPeriodLength = 3 * 30 days;
    uint8 airdropPeriodsNumber = 6;



    /*** Advisers Funding Reserves ***/

    // 52,500,000 (5.25%) tokens will be eventually available for advisers
    // 25,000,008 tokens will be available instantly without vesting
    // 27 499 992 tokens will be distributed monthly without a cliff within 12 months
    // 2,291,666 tokens will be unlocked every month

    address advisersAllocation  = address(0x4444444444444444444444444444444444444444);
    uint256 advisersTotal = withDecimals(52500000, decimals);
    uint256 advisersPeriodAmount = withDecimals(2291666, decimals);
    uint256 advisersUnvested = withDecimals(25000008, decimals);
    uint256 advisersCliff = 0;
    uint256 advisersPeriodLength = 30 days;
    uint8 advisersPeriodsNumber = 12;


    /// CONSTRUCTOR
    function NexoToken() public {
        //  Overall, 1,000,000,000 tokens exist
        totalSupply = withDecimals(1000000000, decimals);

        balances[investorsAllocation] = investorsTotal;
        balances[overdraftAllocation] = overdraftTotal;
        balances[teamAllocation] = teamTotal;
        balances[airdropAllocation] = airdropTotal;
        balances[advisersAllocation] = advisersTotal;

        // Unlock some tokens without vesting
        allowed[investorsAllocation][msg.sender] = investorsTotal;
        allowed[overdraftAllocation][msg.sender] = overdraftTotal;
        allowed[airdropAllocation][msg.sender] = airdropUnvested;
        allowed[advisersAllocation][msg.sender] = advisersTotal;

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
        require(transferFrom(airdropAllocation, to, amountWithDecimals));
    }

    function distributeAdvisersAllocation(address to, uint256 amountWithDecimals) public onlyOwner {
        require(transferFrom(advisersAllocation, to, amountWithDecimals));
    }

    /// VESTING

    function calculateUnlockedTokens(uint256 cliff, uint256 periodLength, uint256 periodAmount, uint8 periodsNumber, uint256 unvestedAmount)
        view
        private
        returns (uint256) 
    {
        if (cliff != 0) cliff = cliff - periodLength; // to ensure that the first unlock occurs right after the cliff
        uint256 periods = (now - (creationTime + cliff)) / periodLength;
        periods = periods > periodsNumber ? periodsNumber : periods;
        return unvestedAmount + (periods * periodAmount);
    }

    function withdawOverdraftTokens(uint256 amountWithDecimals, address _to)
        public
        onlyOwner
    {
        uint256 unlockedTokens = 
            calculateUnlockedTokens(overdraftCliff, overdraftPeriodLength, overdraftPeriodAmount, overdraftPeriodsNumber, overdraftUnvested);
        uint256 spentTokens = overdraftTotal - balanceOf(overdraftAllocation);
        allowed[overdraftAllocation][msg.sender] = unlockedTokens - spentTokens;
        transferFrom(overdraftAllocation, _to, amountWithDecimals);
    }


    function withdawTeamTokens(uint256 amountWithDecimals, address _to)
        public
        onlyOwner 
    {
        uint256 unlockedTokens = 
            calculateUnlockedTokens(teamCliff, teamPeriodLength, teamPeriodAmount, teamPeriodsNumber, teamUnvested);
        uint256 spentTokens = teamTotal - balanceOf(teamAllocation);
        allowed[teamAllocation][msg.sender] = unlockedTokens - spentTokens;
        transferFrom(teamAllocation, _to, amountWithDecimals);
    }

    function witdrawAirdropTokens(uint256 amountWithDecimals, address _to)
        public
        onlyOwner 
    {
        uint256 unlockedTokens = 
            calculateUnlockedTokens(airdropCliff, airdropPeriodLength, airdropPeriodAmount, airdropPeriodsNumber, airdropUnvested);
        uint256 spentTokens = airdropTotal - balanceOf(airdropAllocation);
        allowed[airdropAllocation][msg.sender] = unlockedTokens - spentTokens;
        transferFrom(airdropAllocation, _to, amountWithDecimals);
    }

    function withdrawAdvisersTokens(uint256 amountWithDecimals, address _to)
        public
        onlyOwner 
    {
        uint256 unlockedTokens = 
            calculateUnlockedTokens(advisersCliff, advisersPeriodLength, advisersPeriodAmount, advisersPeriodsNumber, advisersUnvested);
        uint256 spentTokens = advisersTotal - balanceOf(advisersAllocation);
        allowed[advisersAllocation][msg.sender] = unlockedTokens - spentTokens;
        transferFrom(advisersAllocation, _to, amountWithDecimals);
    }
}
