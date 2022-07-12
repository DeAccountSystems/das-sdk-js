import { ethers, Wallet } from 'ethers'
import { BitAccount } from '../src/BitAccount'
import { RemoteTxBuilder } from '../src/builders/RemoteTxBuilder'
import { CheckSubAccountStatus, CoinType } from '../src/const'
import { BitIndexer } from '../src/fetchers/BitIndexer'
import { EthersSigner, SubAccount } from '../src/index'

const bitIndexer = new BitIndexer({
  // uri: 'https://indexer-v1.did.id',
  uri: 'https://test-indexer.did.id',
  // uri: 'https://test-indexer-not-use-in-production-env.did.id',
})
const bitBuilder = new RemoteTxBuilder({
  subAccountUri: 'https://test-subaccount-api.did.id/v1'
})
const address = '0x7df93d9F500fD5A9537FEE086322a988D4fDCC38'
const privateKey1 = '87d8a2bccdfc9984295748fa2058136c8131335f59930933e9d4b3e74d4fca42'
const provider = new ethers.providers.InfuraProvider('goerli')
const wallet = new Wallet(privateKey1, provider)
const signer = new EthersSigner(wallet)

const account = new BitAccount({
  account: 'imac.bit',
  bitIndexer,
  bitBuilder,
  signer,
})

describe('constructor', () => {
  expect(() => {
    const account = new BitAccount({
      account: '.bit',
    })
  }).toThrow('.bit is not a valid .bit account')
})

describe('info', function () {
  const localAccount = new BitAccount({
    account: 'imac.bit',
    bitIndexer,
  })

  it('work', async function () {
    const start = Date.now()
    const info1 = await localAccount.info()
    const end1 = Date.now()

    const info2 = await localAccount.info()
    const end2 = Date.now()

    expect(end1 - start).toBeGreaterThan(500)
    expect(end2 - end1).toBe(0) // cache effect
    expect(info1).toMatchObject({
      account: 'imac.bit',
      account_alias: 'imac.bit',
      account_id_hex: '0x5728088435fb8788472a9ca601fbc0b9cbea8be3',
      next_account_id_hex: '0x572861ec594b4f8d2dda64885f0561e4fb1591ca',
      create_at_unix: 1631851320,
      expired_at_unix: 1663387320,
      status: 0,
      das_lock_arg_hex: '0x051d643fac9a463c9d544506006a6348c234da485f051d643fac9a463c9d544506006a6348c234da485f',
      owner_algorithm_id: 5,
      owner_key: '0x1d643fac9a463c9d544506006a6348c234da485f',
      manager_algorithm_id: 5,
      manager_key: '0x1d643fac9a463c9d544506006a6348c234da485f'
    })
  })
})

describe('records', function () {
  it('work', async function () {
    const records = await account.records()

    expect(records).toStrictEqual([
      {
        key: 'address.eth',
        type: 'address',
        subtype: 'eth',
        label: '',
        value: '0x1d643fac9a463c9d544506006a6348c234da485f',
        ttl: '300'
      },
      {
        key: 'address.trx',
        type: 'address',
        subtype: 'trx',
        label: '',
        value: 'TPzZyfAgkqASrKkkxiMWBRoJ6jgt718SCX',
        ttl: '300'
      },
      {
        key: 'address.trx',
        type: 'address',
        subtype: 'trx',
        label: '',
        value: 'TWiV82cSnCffyqkAwCuyjuvqUwZJx2nr3a',
        ttl: '300'
      },
      {
        key: 'profile.website',
        type: 'profile',
        subtype: 'website',
        label: 'Apple',
        value: 'https://www.apple.com/imac',
        ttl: '300'
      },
      {
        key: 'profile.avatar',
        type: 'profile',
        subtype: 'avatar',
        label: '',
        value: 'https://thiscatdoesnotexist.com',
        ttl: '300'
      }
    ])
  })

  it('filter by key', async function () {
    const records = await account.records('address.eth')

    expect(records).toMatchObject([{
      key: 'address.eth',
      type: 'address',
      subtype: 'eth',
      label: '',
      value: '0x1d643fac9a463c9d544506006a6348c234da485f',
      ttl: '300'
    }])
  })

  it('filter by key result in multiple records', async function () {
    const records = await account.records('address.trx')

    expect(records).toMatchObject([{
      key: 'address.trx',
      type: 'address',
      subtype: 'trx',
      label: '',
      value: 'TPzZyfAgkqASrKkkxiMWBRoJ6jgt718SCX',
      ttl: '300'
    },
    {
      key: 'address.trx',
      type: 'address',
      subtype: 'trx',
      label: '',
      value: 'TWiV82cSnCffyqkAwCuyjuvqUwZJx2nr3a',
      ttl: '300'
    }])
  })

  it('filter by key result in empty records', async function () {
    const records = await account.records('address.btc')

    expect(records).toMatchObject([])
  })
})

describe('addrs', function () {
  it('no filter', async function () {
    const addrs = await account.addrs()

    expect(addrs).toMatchObject([{
      key: 'address.eth',
      type: 'address',
      subtype: 'eth',
      label: '',
      value: '0x1d643fac9a463c9d544506006a6348c234da485f',
      ttl: '300'
    },
    {
      key: 'address.trx',
      type: 'address',
      subtype: 'trx',
      label: '',
      value: 'TPzZyfAgkqASrKkkxiMWBRoJ6jgt718SCX',
      ttl: '300'
    }, {
      key: 'address.trx',
      label: '',
      subtype: 'trx',
      type: 'address',
      ttl: '300',
      value: 'TWiV82cSnCffyqkAwCuyjuvqUwZJx2nr3a',
    }])
  })

  it('filter `trx`', async function () {
    const addrs = await account.addrs('trx')

    expect(addrs).toMatchObject([{
      key: 'address.trx',
      type: 'address',
      subtype: 'trx',
      label: '',
      value: 'TPzZyfAgkqASrKkkxiMWBRoJ6jgt718SCX',
      ttl: '300'
    }, {
      key: 'address.trx',
      label: '',
      subtype: 'trx',
      type: 'address',
      ttl: '300',
      value: 'TWiV82cSnCffyqkAwCuyjuvqUwZJx2nr3a',
    }])
  })

  it('filter `eth`', async function () {
    const addrs = await account.addrs('eth')

    expect(addrs).toMatchObject([{
      key: 'address.eth',
      type: 'address',
      subtype: 'eth',
      label: '',
      value: '0x1d643fac9a463c9d544506006a6348c234da485f',
      ttl: '300'
    }])
  })

  it('filter `ETH`', async function () {
    const addrs = await account.addrs('ETH')

    expect(addrs).toMatchObject([{
      key: 'address.eth',
      type: 'address',
      subtype: 'eth',
      label: '',
      value: '0x1d643fac9a463c9d544506006a6348c234da485f',
      ttl: '300'
    }])
  })
})

// describe('dwebs', function () {
//   it('no filter', async function () {
//     const addrs = await account.dwebs()
//
//     expect(addrs).toMatchObject([])
//   })
// })

describe('profiles', function () {
  it('no filter', async function () {
    const profiles = await account.profiles()

    expect(profiles).toMatchObject([{
      key: 'profile.website',
      type: 'profile',
      subtype: 'website',
      label: 'Apple',
      value: 'https://www.apple.com/imac',
      ttl: '300'
    },
    {
      key: 'profile.avatar',
      type: 'profile',
      subtype: 'avatar',
      label: '',
      value: 'https://thiscatdoesnotexist.com',
      ttl: '300'
    }])
  })

  it('filter `website`', async function () {
    const profiles = await account.profiles('website')

    expect(profiles).toMatchObject([{
      key: 'profile.website',
      type: 'profile',
      subtype: 'website',
      label: 'Apple',
      value: 'https://www.apple.com/imac',
      ttl: '300'
    }])
  })
})

describe('enableSubAccount', function () {
  it('should work', function () {
    return expect(account.enableSubAccount()).rejects.toThrow('ValidationFailure: see the error code -31')
  }, 10000)
})

describe('mintSubAccount', function () {
  it('should work', async function () {
    const txs = await account.mintSubAccount({
      account: '005.imac.bit',
      keyInfo: {
        coin_type: CoinType.ETH,
        key: '0x7df93d9F500fD5A9537FEE086322a988D4fDCC38',
      },
      registerYears: 1,
    })

    console.log(txs)
    expect(txs.hash_list.length).toBe(1)
  }, 10000)
})

describe('subAccounts', function () {
  it('should work', async function () {
    const subAccounts = await account.subAccounts()
    expect(subAccounts.list.length).toBeGreaterThan(1)
  }, 10000)
})

describe('checkSubAccounts', function () {
  it('work', async function () {
    const subAccounts: SubAccount[] = [{
      account: 'xyz.imac.bit',
      type: 'blockchain',
      key_info: {
        key: '0x7df93d9F500fD5A9537FEE086322a988D4fDCC38',
        coin_type: CoinType.ETH,
      },
      register_years: 1,
    }]

    const result = await account.checkSubAccounts(subAccounts)
    expect(result.result[0].status).toBe(0)
    expect(result.result[0].message).toBe('')
  })

  it('should throw error', async function () {
    const subAccounts: SubAccount[] = [{
      account: '001.imac.bit',
      type: 'blockchain',
      key_info: {
        key: '0x7df93d9F500fD5A9537FEE086322a988D4fDCC38',
        coin_type: CoinType.ETH,
      },
      register_years: 1,
    }]

    const result = await account.checkSubAccounts(subAccounts)
    expect(result.result[0].status).toBe(CheckSubAccountStatus.registered)
    expect(result.result[0].message).toBe('registered')
  })
})
