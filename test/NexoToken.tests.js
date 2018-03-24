import assertRevert from './helpers/assertRevert';
let constants = require('./constants.js');

var token = artifacts.require('../contracts/NexoToken.sol');
const increaseTime = require('./helpers/time_travel');
const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();


contract('NexoTokens Contract', function(accounts) {

var investorAddress = accounts[9];
var owner = accounts[0];

var contract;

const overdraftAllocationAddress = "0x1111111111111111111111111111111111111111";
const teamAllocationAddress = "0x2222222222222222222222222222222222222222";
const airDropAllocationAddress = "0x3333333333333333333333333333333333333333";
const advisersAllocationAddress  = "0x4444444444444444444444444444444444444444";


const totalUnvestedTokens = new BigNumber('560000000000000000000000000');;

const investorsAllocation = new BigNumber('525000000000000000000000000');
const AirDropUnvestedTokens = new BigNumber('10000000000000000000000000');
const AdvisersUnvestedTokens = new BigNumber('25000000000000000000000000');

var overdraftAllocation = new BigNumber('4000000000000000000');
var teamAllocation = new BigNumber('0000000000000000000');
var airDropAllocation= new BigNumber('2000000000000000000');
var advisersAllocation = new BigNumber('8000000000000000000');


const overdraftPartition = new BigNumber('41666666000000000000000000');  // 1/6
const teamPartition = new BigNumber('7031250000000000000000000');        // 1/16
const airDropPartition = new BigNumber('8333333000000000000000000');     // 1/6
const advisersPartition = new BigNumber('2291666000000000000000000');     // 1/12








describe('Unvested distribution', function () {
  it('Should distribute tokens to investorAddress from Investors Allocation', async function () {
    //Deploy contract
    contract = await token.new();
    await contract.distributeInvestorsAllocation(investorAddress, investorsAllocation);
    });
  it('Should distribute tokens to investorAddress from Air Allocation', async function () {
    await contract.distributeAirDropAllocation(investorAddress, AirDropUnvestedTokens);
    });
  it('Should distribute tokens to investorAddress from advisers Allocation', async function () {
    await contract.distributeAdvisersAllocation(investorAddress, AdvisersUnvestedTokens);
    });
});
describe('Should check totalSupply', function () {
  it('Should check total Unvested tokens ballance', async function () {
    const ivestorBallance = await contract.balanceOf(investorAddress)
    ivestorBallance.should.be.bignumber.equal(totalUnvestedTokens);
    });
      });
  it('Shouldn\'t distribute tokens to investorAddress from Investors Allocation more then unlocked', async function () {
      //Deploy contract
      contract = await token.new();
      await contract.distributeInvestorsAllocation(investorAddress, investorsAllocation);
      });
  it('Shouldn\'tdistribute tokens to investorAddress from Air Allocation more then unlocked', async function () {
      await contract.distributeAirDropAllocation(investorAddress, AirDropUnvestedTokens);
      });
  it('Shouldn\'t distribute tokens to investorAddress from advisers Allocation more then unlocked', async function () {
      await contract.distributeAdvisersAllocation(investorAddress, AdvisersUnvestedTokens);
      });
describe('Should check totalSupply', function () {
  it('Should check total Unvested tokens ballance, it mustn\'t change', async function () {
      const ivestorBallance = await contract.balanceOf(investorAddress)
      ivestorBallance.should.be.bignumber.equal(totalUnvestedTokens);
      });
  });

      describe('month 1', function () {
        var a;

        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should  unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 2', function () {
        var a;

        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should  unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 3', function () {
        var a;

        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        teamAllocation = await teamAllocation.plus(teamPartition);
        await contract.unlockTeam()
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should unlock airDropAllocation', async function () {
        await a;
        airDropAllocation = await airDropAllocation.plus(airDropPartition);
        await contract.unlockAirDrop()
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 4', function () {
        var a;

        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 5', function () {
        var a;

        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 6', function () {
        var a;

        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should unlock overdraftAllocation', async function () {
        await a;
        overdraftAllocation = await overdraftAllocation.plus(overdraftPartition);
        await contract.unlockOverdraft()
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        teamAllocation = await teamAllocation.plus(teamPartition);
        await contract.unlockTeam()
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should unlock airDropAllocation', async function () {
        await a;
        airDropAllocation = await airDropAllocation.plus(airDropPartition);
        await contract.unlockAirDrop()
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 7', function () {
        var a;

        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should unlock overdraftAllocation', async function () {
        await a;
        overdraftAllocation = await overdraftAllocation.plus(overdraftPartition);
        await contract.unlockOverdraft()
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 8', function () {
        var a;

        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should unlock overdraftAllocation', async function () {
        await a;
        overdraftAllocation = await overdraftAllocation.plus(overdraftPartition);
        await contract.unlockOverdraft()
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 9', function () {
        var a;

        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should unlock overdraftAllocation', async function () {
        await a;
        overdraftAllocation = await overdraftAllocation.plus(overdraftPartition);
        await contract.unlockOverdraft()
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        teamAllocation = await teamAllocation.plus(teamPartition);
        await contract.unlockTeam()
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should unlock airDropAllocation', async function () {
        await a;
        airDropAllocation = await airDropAllocation.plus(airDropPartition);
        await contract.unlockAirDrop()
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 10', function () {
        var a;

        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should unlock overdraftAllocation', async function () {
        await a;
        overdraftAllocation = await overdraftAllocation.plus(overdraftPartition);
        await contract.unlockOverdraft()
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 11', function () {
        var a;

        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should unlock overdraftAllocation', async function () {
        await a;
        overdraftAllocation = await overdraftAllocation.plus(overdraftPartition);
        await contract.unlockOverdraft()
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 12', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should unlock airDropAllocation', async function () {
        await a;
        await contract.unlockAirDrop()
        airDropAllocation = await airDropAllocation.plus(airDropPartition);
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should unlock advisersAllocation', async function () {
        await a;
        advisersAllocation = await advisersAllocation.plus(advisersPartition);
        await contract.unlockAdvisers()
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 13', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 14', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 15', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should unlock airDropAllocation', async function () {
        await a;
        await contract.unlockAirDrop()
        airDropAllocation = await airDropAllocation.plus(airDropPartition);
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 16', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 17', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 18 ', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should unlock airDropAllocation', async function () {
        await a;
        await contract.unlockAirDrop()
        airDropAllocation = await airDropAllocation.plus(airDropPartition);
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 19', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 20', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 21', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 22', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 23', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 24', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 25', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 26', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 27', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 28', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 29', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 30', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 31', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 32', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 33', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 34', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 35', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 36', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 37', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 38', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 39', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 40', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 41', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 42', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 43', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 44', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 46', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 47', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should not unlock teamAllocation', async function () {
        await a;
        await assertRevert(contract.unlockTeam())
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });
      describe('month 48', function () {
        var a;
        it('Should increaseTime', async function () {
          a = increaseTime(2592360);
        });
        it('Should not unlock overdraftAllocation', async function () {
        await a;
        await assertRevert(contract.unlockOverdraft())
        const currentOverdraftAllocation = await contract.allowance(overdraftAllocationAddress, owner);
        currentOverdraftAllocation.should.be.bignumber.equal(overdraftAllocation);
        });
        it('Should unlock teamAllocation', async function () {
        await a;
        await contract.unlockTeam()
        teamAllocation = await teamAllocation.plus(teamPartition);
        const currentTeamAllocation = await contract.allowance(teamAllocationAddress, owner);
        currentTeamAllocation.should.be.bignumber.equal(teamAllocation);
        });
        it('Should not unlock airDropAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAirDrop())
        const currentAirDropAllocation = await contract.allowance(airDropAllocationAddress, owner);
        currentAirDropAllocation.should.be.bignumber.equal(airDropAllocation);
        });
        it('Should not unlock advisersAllocation', async function () {
        await a;
        await assertRevert(contract.unlockAdvisers())
        const currentAdvisersAllocation = await contract.allowance(advisersAllocationAddress, owner);
        currentAdvisersAllocation.should.be.bignumber.equal(advisersAllocation);
        });
      });



//  });

});
