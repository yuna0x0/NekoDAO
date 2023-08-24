module.exports = {
  dashboard: {
    port: 24012,
    host: "localhost",
    verbose: false,
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    dashboard: {
      host: "localhost",
      port: 24012,
      network_id: "*"
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1350
        }
      }
    }
  },
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    goerli_basescan: 'PLACEHOLDER_STRING',
  },
};
