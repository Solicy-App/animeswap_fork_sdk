import { AptosClient } from 'aptos'
import { SwapModule } from './modules/SwapModule'
import { RouteModule } from './modules/RouteModule'
import { MasterChefModule } from './modules/MasterChefModule'
import { ResourcesModule } from './modules/ResourcesModule'
import { AptosResourceType } from './types/aptos'

export type SdkOptions = {
  nodeUrl: string
  networkOptions: {
    nativeCoin: AptosResourceType
    modules: {
      CoinInfo: AptosResourceType
      CoinStore: AptosResourceType
      Scripts: AptosResourceType
      ResourceAccountAddress: AptosResourceType
      DeployerAddress: AptosResourceType
      AniAddress: AptosResourceType
      MasterChefScripts: AptosResourceType
      MasterChefDeployerAddress: AptosResourceType
      MasterChefResourceAccountAddress: AptosResourceType
    } & Record<string, AptosResourceType>
  }
}

export enum NetworkType {
  Mainnet,
  Devnet,
  Testnet,
}

export class SDK {
  protected _client: AptosClient
  protected _swap: SwapModule
  protected _route: RouteModule
  protected _masterchef: MasterChefModule
  protected _resources: ResourcesModule
  protected _networkOptions: SdkOptions['networkOptions']

  get swap() {
    return this._swap
  }

  get route() {
    return this._route
  }

  get MasterChef() {
    return this._masterchef
  }


  get resources() {
    return this._resources
  }

  get client() {
    return this._client
  }

  get networkOptions() {
    return this._networkOptions
  }

  /**
   * SDK constructor
   * @param nodeUrl string
   * @param networkType? NetworkType
   */
  constructor(nodeUrl: string, networkType?: NetworkType) {
    const mainnetOptions = {
      nativeCoin: '0x1::aptos_coin::AptosCoin',
      modules: {
        Scripts: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57::AnimeSwapPoolV1',
        CoinInfo: '0x1::coin::CoinInfo',
        CoinStore: '0x1::coin::CoinStore',
        DeployerAddress: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57',
        ResourceAccountAddress: '0x70e66f1b792bdf49275461a3a39bda125257771784b7f0fffdbaaccd78be588e',
        AniAddress: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57::AnimeMasterChefV1::ANI', // WIP
        MasterChefScripts: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57::AnimeMasterChefV1', // WIP
        MasterChefDeployerAddress: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57', // WIP
        MasterChefResourceAccountAddress: '0x8615f5671592532631e56c76ca09d332fae1cd03d463bc379eec1007973966ef', // WIP
      },
    }
    const devnetOptions = {
      nativeCoin: '0x1::aptos_coin::AptosCoin',
      modules: {
        Scripts: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57::AnimeSwapPoolV1',
        CoinInfo: '0x1::coin::CoinInfo',
        CoinStore: '0x1::coin::CoinStore',
        DeployerAddress: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57',
        ResourceAccountAddress: '0x70e66f1b792bdf49275461a3a39bda125257771784b7f0fffdbaaccd78be588e',
        AniAddress: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57::AnimeMasterChefV1::ANI',
        MasterChefScripts: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57::AnimeMasterChefV1',
        MasterChefDeployerAddress: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57',
        MasterChefResourceAccountAddress: '0x8615f5671592532631e56c76ca09d332fae1cd03d463bc379eec1007973966ef',
      },
    }
    const testnetOptions = {
      nativeCoin: '0x1::aptos_coin::AptosCoin',
      modules: {
        Scripts: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57::AnimeSwapPoolV1f1',
        CoinInfo: '0x1::coin::CoinInfo',
        CoinStore: '0x1::coin::CoinStore',
        DeployerAddress: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57',
        ResourceAccountAddress: '0x70e66f1b792bdf49275461a3a39bda125257771784b7f0fffdbaaccd78be588e',
        AniAddress: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57::AnimeMasterChefV1::ANI',
        MasterChefScripts: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57::AnimeMasterChefV1',
        MasterChefDeployerAddress: '0x801ccf2187d7c75da60294212613a29ea90d37abc5c98feefffcbcf87739ae57',
        MasterChefResourceAccountAddress: '0x8615f5671592532631e56c76ca09d332fae1cd03d463bc379eec1007973966ef',
      },
    }
    let networkOptions = mainnetOptions  // default network
    if (networkType == NetworkType.Mainnet) networkOptions = mainnetOptions
    if (networkType == NetworkType.Devnet) networkOptions = devnetOptions
    if (networkType == NetworkType.Testnet) networkOptions = testnetOptions
    const options = {
      nodeUrl,
      networkOptions: networkOptions,
    }
    this._networkOptions = options.networkOptions
    this._client = new AptosClient(options.nodeUrl)
    this._swap = new SwapModule(this)
    this._route = new RouteModule(this)
    this._masterchef = new MasterChefModule(this)
    this._resources = new ResourcesModule(this)
  }
}
