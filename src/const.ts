export enum BitNetwork {
  mainnet = 'mainnet',
  testnet = 'testnet',
}

export enum CoinType {
  ETH = '60',
  TRX = '195',
  CKB = '309',
  MATIC = '966',
  BSC = '9006',
}

export const EvmCoinTypes = [CoinType.ETH, CoinType.BSC, CoinType.MATIC]

export enum EvmChainId {
  ETH = 1,
  ETH_GOERILI = 5,
  BSC = 56,
  BSC_TEST = 97,
  MATIC = 137,
  MATIC_TEST = 80001,
}

// legacy custom chain type, should be replaced by CoinType in the future
export enum ChainType {
  ckb,
  eth,
  btc,
  tron,
  fiat,
  bsc = 56,
  polygon = 137
}

export const EvmChainId2CoinType = {
  [EvmChainId.ETH]: CoinType.ETH,
  [EvmChainId.ETH_GOERILI]: CoinType.ETH,
  [EvmChainId.BSC]: CoinType.BSC,
  [EvmChainId.BSC_TEST]: CoinType.BSC,
  [EvmChainId.MATIC]: CoinType.MATIC,
  [EvmChainId.MATIC_TEST]: CoinType.MATIC,
}

export const CoinType2ChainType = {
  [CoinType.ETH]: ChainType.eth,
  [CoinType.TRX]: ChainType.tron,
  [CoinType.CKB]: ChainType.ckb,
  [CoinType.MATIC]: ChainType.polygon,
  [CoinType.BSC]: ChainType.bsc,
}

export enum RecordType {
  address = 'address',
  profile = 'profile',
  dweb = 'dweb',
  custom = 'custom_key',
}

export enum AccountStatus {
  notOpenRegister= -1,
  registerable,
  registeringPaymentConfirm,
  registeringLockedAccount,
  registering,
  registeringIncludeProposal,
  registeringConfirmProposal,
  registered,
  reservedAccount,
  onePriceSell,
  auctionSell,
  candidateAccount,
  expired,
  othersRegistering,
  unavailableAccount,
  subAccountNotCreated,
  onCross
}

export enum AlgorithmId {
  ethPersonalSign = 3,
  tronSign = 4,
  eip712 = 5,
  ed2519 = 6,
}

export const AlgorithmId2CoinType = {
  [AlgorithmId.ethPersonalSign]: CoinType.ETH,
  [AlgorithmId.eip712]: CoinType.ETH,
  [AlgorithmId.tronSign]: CoinType.TRX,
}

export enum SubAccountEnabledStatus {
  unknown = -1,
  off,
  on
}

export enum CheckSubAccountStatus {
  ok,
  fail,
  registered,
  registering
}

export enum EditRecordAction {
  delete = 'delete',
  change = 'change',
  add = 'add',
}

export const ACCOUNT_SUFFIX = '.bit'

// source: https://github.com/dotbitHQ/das-types/blob/master/rust/src/constants.rs#L145
export enum CHAR_TYPE {
  emoji = 0,
  number = 1,
  english = 2,
  simplifiedChinese = 3,
  traditionalChinese,
  japanese,
  korean,
  russian,
  turkish,
  thai,
  vietnamese,
  unknown = 99
}

export const languageToCharType = {
  en: CHAR_TYPE.english,
  tr: CHAR_TYPE.turkish,
  vi: CHAR_TYPE.vietnamese,
  th: CHAR_TYPE.thai,
  ko: CHAR_TYPE.korean
}

export const languages = ['en', 'tr', 'vi', 'th', 'ko']

export enum DigitalEmojiUnifiedMap {
  '0⃣️' = '0️⃣',
  '1⃣️' = '1️⃣',
  '2⃣️' = '2️⃣',
  '3⃣️' = '3️⃣',
  '4⃣️' = '4️⃣',
  '5⃣️' = '5️⃣',
  '6⃣️' = '6️⃣',
  '7⃣️' = '7️⃣',
  '8⃣️' = '8️⃣',
  '9⃣️' = '9️⃣',
  '0⃣' = '0️⃣',
  '1⃣' = '1️⃣',
  '2⃣' = '2️⃣',
  '3⃣' = '3️⃣',
  '4⃣' = '4️⃣',
  '5⃣' = '5️⃣',
  '6⃣' = '6️⃣',
  '7⃣' = '7️⃣',
  '8⃣' = '8️⃣',
  '9⃣' = '9️⃣'
}

// ID of the payment method, source: https://github.com/dotbitHQ/das-register/blob/main/API.md#token-list
export enum PaymentMethodIDs {
  eth = 'eth_eth',
  bnb = 'bsc_bnb',
  matic = 'polygon_matic',
  trx = 'tron_trx',
  // portalWallet = 'ckb_ckb',
  dotbitBalance = 'ckb_das',
}
