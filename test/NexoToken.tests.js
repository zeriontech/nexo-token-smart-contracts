import assertRevert from './helpers/assertRevert';

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

const totalUnvestedTokens = new BigNumber('56000000000000000');;

const investorsAllocation = new BigNumber('52500000000000000');
const AirDropUnvestedTokens = new BigNumber('1000000000000000');
const AdvisersUnvestedTokens = new BigNumber('2500000000000000');

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
  it('Should check total Unvested tokens', async function () {
    const ivestorBallance = await contract.balanceOf(investorAddress)
    ivestorBallance.should.be.bignumber.equal(totalUnvestedTokens);
    });

  });
});
