dotbit: .bit JavaScript SDK
==================
![NPM](https://img.shields.io/npm/l/dotbit)
![npm](https://img.shields.io/npm/v/dotbit)

A complete [.bit](https://did.id) SDK and utilities in JavaScript (and TypeScript).

> This is the new version of .bit (Previously DAS) JavaScript SDK. If you are looking for the source code of npm package [das-sdk](https://www.npmjs.com/package/das-sdk)(Deprecated), please check out the branch [das-sdk](https://github.com/dotbitHQ/dotbit.js/tree/das-sdk).

## Features
- Query .bit account info, including **owner, manager, status**, and more.
- Query .bit account records, including **addresses, profiles, dwebs and custom data**.
- Enable .bit [Sub-Account](https://www.did.id/sub-account) for a specific account.
- **Mint a sub-account** of a .bit main account.
- Query all the sub-accounts of a .bit main account.
- Manage the **ownership** of a .bit account(sub-account included).
- Manage the **records** of a .bit account(sub-account included).
- **Register a .bit account** with CKB. (Coming soon)

## Installation
```shell
npm install dotbit --save
```

## QuickStart
#### Query different records:

```javascript
// import { createInstance } from 'dotbit' // For ES Module
const { createInstance } = require('dotbit')
const dotbit = createInstance()

// Get all .bit account records
dotbit.records('imac.bit').then(console.log)

// Get all `eth` addresses of a .bit account
dotbit.addrs('imac.bit', 'eth').then(console.log)

// Get `twitter` account of a .bit account
dotbit.profiles('imac.bit', 'twitter').then(console.log)
```

#### Query [.bit Alias](https://www.did.id/bit-alias)(Reverse Record)

```javascript
const account = await dotbit.reverse({
  key: '0x1D643FAc9a463c9d544506006a6348c234dA485f'
})
console.log(account.account) // jeffx.bit
```

#### Mint a sub-account in `testnet`:

> Currently, sub-account is fully available in **testnet**, and need whitelist on **mainnet**.
> If you would like to distribute sub-accounts on **mainnet**, please email [supermancy@did.id](supermancy@did.id) with a brief description of your project.

```javascript
// import { createInstance, ProviderSigner, BitNetwork } from 'dotbit' // For ES Module
const { createInstance, ProviderSigner, BitNetwork } = require('dotbit')

const signer = new ProviderSigner(window.ethereum)
const dotbit = createInstance({
  network: BitNetwork.testnet,
  signer
})

const bitAccount = dotbit.account('imac.bit')

bitAccount.mintSubAccount({
  account: '001.imac.bit',
  keyInfo: {
    key: '0x...',
    coin_type: '60',
  },
  registerYears: 1,
}).then(console.log)
```
`coin_type` is the Coin Types defined in [slip44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) to distinguish different Coins/Chains. 
For all `coin_type` .bit supported, please check [const.ts](./src/const.ts) 

For more complete usages, please check out the examples: [For browser](./example/browser/index.js), [For Node.js](./example/node/index.js).

## Plugins
.bit has partnerships with the greatest teams & projects in the ecosystems.

`dotbit.js` provided a simple yet powerful plugin system, with which we can add more powerful features to this library.

#### Usage
Basically, you can install and use a plugin like the codes below.

```javascript
import { PluginXXX } from 'dotbit-plugin-xxx'
import { createInstance } from 'dotbit'

const dotbit = createInstance()

dotbit.installPlugin(new PluginXXX())

dotbit.methodAddedByXXX()
```

For detailed usage, please follow the instructions in the specific plugin's README.

#### List of plugins
- [@dotbit/plugin-template](./packages/plugin-template/README.md): A demo plugin demonstrating the basic structure of a .bit plugin.
- [@dotbit/plugin-web3mq](./packages/plugin-web3mq/README.md): A plugin for integrating [Web3MQ](https://www.web3messaging.online/)

#### Write your own plugin
Write a plugin for .bit is easy! 

If you want to write a plugin for your or other projects, please follow the same structure of [plugin template](./packages/plugin-template/README.md).

## Get help
Please join our [Discord channel](https://discord.gg/fVppR7z4ht), or raise an issue: [Issues](https://github.com/dotbitHQ/dotbit.js/issues)

## Contribute
This SDK is still under heavily development. Any contribution including PR is welcome.

Please raise an [issue](https://github.com/dotbitHQ/dotbit.js/issues) if you find any bugs or have any suggestions.

## License
MIT License (including **all** dependencies).