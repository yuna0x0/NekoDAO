module.exports = {
  dashboard: {
    port: 24012,
    host: "127.0.0.1",
    verbose: false,
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    dashboard: {
      host: "127.0.0.1",
      port: 24012,
      network_id: "*"
    },
    base_goerli: {
      network_id: 84531
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
