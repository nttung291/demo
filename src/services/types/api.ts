import { TokenPrice } from "@types";

export type Status = {
  timestamp: Date;
  error_code: number;
  error_message: string;
  elapsed: number;
  credit_count: number;
};

export type CryptocurrencyListingsRequest = {
  start?: number;
  limit?: number;
};

export type CryptocurrencyListingsResponse = Token[];

export type CryptocurrencyQuotesRequest = {
  id?: string;
  slug?: string;
  symbol?: string;
};

export type CryptocurrencyQuotesResponse = Record<string, TokenPrice>;

export interface GamesResponse {
  total: number
  data: Daum[]
  limit: number
  skip: number
}

export interface Daum {
  _id: string
  slug: string
  description: string
  price: Price
  id: string
  status: string
  createdAt: number
  blurb: string
  tokens?: Token[]
  metrics: Metrics
  engineWalletAddress?: string
  rules?: Rule[]
  activity?: Activity[]
  platforms: string[]
  nftContract?: string
  allowedOrigins?: string[]
  mobilePreferredOrientation?: string
  currentlyPlaying?: number
  lastPlayed?: string
  sessions?: any[]
  primaryColor: string
  title: string
  media: Medium[]
  updatedAt: number
  network?: string
  releases?: Release[]
  management: Management
  categoryIds: string[]
  chainId: number
  clientSafe?: boolean
  promotion?: Promotion
  leaderboard?: Leaderboard
  mintContracts?: MintContract[]
  linkedNFTs?: LinkedNft[]
  trustedSessions?: boolean
  externalUrls?: ExternalUrls
  menu?: Menu
  gameplayVideoContract?: string
  achievements?: Achievements
  tokenGate?: TokenGate
}

export interface Price {
  amount: number
  currency: string
  chain: string
}

export interface Token {
  tokenAddress: string
  title: string
  description: string
  chainId?: number
}

export interface Metrics {
  plays: number
  secondsPlayed: number
  owners: number
  ratingCount?: number
  avgRating?: number
  subRatings?: SubRating[]
}

export interface SubRating {
  subCategory: string
  count: number
  avgRating: number
}

export interface Rule {
  trigger: string
  actions: Action[]
}

export interface Action {
  type: string
  ratio?: number
  token?: string
  achievementId?: string
  conditions?: Condition[]
  message?: string
  notificationType?: string
  name?: string
}

export interface Condition {
  conditionType: string
  value: number
  comparisonType: string
}

export interface Activity {
  type: string
  label: string
  token?: string
}

export interface Medium {
  mimeType: string
  type: string
  url: string
  alt: string
  id?: string
}

export interface Release {
  version: string
  date: number
  description: string
  platforms: string[]
  target: string
  status: string
  metrics: Metrics2
  id: string
  isExternalUrl?: boolean
}

export interface Metrics2 {
  plays: number
}

export interface Management {
  publisherName: string
  moderators: string[]
  creatorId: string
}

export interface Promotion {
  earnBP: boolean
  onSale: boolean
}

export interface Leaderboard {
  leaderboards: Leaderboard2[]
  contractAddress: string
  status: string
}

export interface Leaderboard2 {
  deployment: string
  title: string
  maxlimit: number
  startTime: number
  endTime: number
  sdkLabel: string
}

export interface MintContract {
  contractAddress: string
  chainId: number
  mintProvider: string
  slug: string
  primaryButtonColor: string
  id: string
}

export interface LinkedNft {
  nftAddress: string
  chainId: number
}

export interface ExternalUrls {
  telegram: string
  discord: string
  twitter: string
  website: string
}

export interface Menu {
  desktop: string
  mobile: string
}

export interface Achievements {
  achievementContractAddress: string
  achievementsData: AchievementsDaum[]
  achievementContractChainId: number
}

export interface AchievementsDaum {
  id: string
  achievementTokenMetadata: AchievementTokenMetadata
  isOnchain: boolean
  achievementCondition?: AchievementCondition
}

export interface AchievementTokenMetadata {
  tokenId: number
  title: string
  description: string
  media: Media
  revokable: boolean
  attributes?: Attribute[]
}

export interface Media {
  alt: string
  id?: string
  mimeType: string
  type: string
  url: string
}

export interface Attribute {
  trait_type: string
  value: string
}

export interface AchievementCondition {
  type: string
  value: string
}

export interface TokenGate {
  enabled: boolean
  groups: any[]
}

