# NekoDAO

## Install Dependencies
```bash
$ pnpm install
```

## Compile
```bash
$ npx hardhat compile
# or
$ pnpm run compile
```

## Deploy
```bash
# Using Hardhat Network
$ npx hardhat run scripts/deploy.js
# or
$ pnpm run deploy

# Using Localhost Network
$ npx hardhat run scripts/deploy.js --network localhost
# or
$ pnpm run deploy:localhost
```
