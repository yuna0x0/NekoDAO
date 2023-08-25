# NekoDAO

## Install Dependencies
```bash
$ pnpm install
```

## Compile
```bash
$ truffle compile --all
# or
$ pnpm run compile
```

## Migrate (Deploy)
```bash
# Using Truffle Dashboard
$ truffle migrate --network dashboard
# or
$ pnpm run migrate

# Using Truffle Ganache (Development)
$ truffle migrate --network development
# or
$ pnpm run migrate:dev
```
