import assertRevert from './helpers/assertRevert';

var token = artifacts.require('../contracts/NexoToken.sol');
const increaseTime = require('./helpers/time_travel');
const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();


contract('NexoTokens Contract', function(accounts) {




});
