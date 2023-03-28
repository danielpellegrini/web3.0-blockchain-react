// https://eth-goerli.g.alchemy.com/v2/2m3uO_4Z0Zsim37PS52BGjpk5FtpiEQK

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/2m3uO_4Z0Zsim37PS52BGjpk5FtpiEQK',
      accounts: [ 'f8de651f0444319ca61bc98fb554e8e0d2345bede07c78c86221cee6d30642e6' ]
    }
  }
}
