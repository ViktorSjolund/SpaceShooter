import { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types'
import { ApolloClient } from '@apollo/client/core/ApolloClient'
import type { TAddUpgradeResponse, TCouldPurchaseResponse, TUpgrade } from '@/types/types'
import {
  AddUpgradeDocument,
  AddUpgradeMutationResult,
  MeDocument,
  MeQueryResult,
  RemoveAllUpgradesDocument,
  UpdateCurrencyDocument,
  UpdateCurrencyMutationResult,
  UpgradesDocument,
  UpgradesQueryResult
} from '../../generated/graphql'
import { Character, UpgradeType } from '../util/enums'
import { upgrades } from './upgrades'
import { PlayerLevelHandler } from '../player-level-handler'

/**
 * Handles upgrades for the player.
 */
export class UpgradesHandler {
  #upgrades: TUpgrade[]
  #apolloClient

  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    this.#apolloClient = apolloClient
    this.#upgrades = upgrades
  }

  get upgrades() {
    return this.#upgrades
  }

  /**
   * Checks if the player can purchase an upgrade.
   *
   * @param upgradeId The upgrade id that is to be checked.
   * @param lvlHandler The player level handler.
   * @returns An object containing information about the purchase success.
   */
  async canPurchaseUpgrade(
    upgradeId: number,
    lvlHandler: PlayerLevelHandler
  ): Promise<TCouldPurchaseResponse> {
    const result = (await this.#apolloClient.query({
      query: MeDocument
    })) as MeQueryResult

    if (result.error || !result.data?.me.user) {
      return {
        error: {
          message: 'Something went wrong...'
        }
      }
    }

    let upgrade: TUpgrade | null = null

    for (const [, u] of this.#upgrades.entries()) {
      if (u.id === upgradeId) {
        upgrade = u
      }
    }

    if (!upgrade) {
      return {
        success: false
      }
    }

    const user = result.data.me.user
    const currency = user.currency || 0

    const playerLvl = lvlHandler.getPlayerLevel(user.experience!)

    if (upgrade.cost > currency) {
      return {
        error: {
          message: 'Insufficient funds.'
        }
      }
    } else if (upgrade.requirement > playerLvl) {
      return {
        error: {
          message: 'Lvl requirement was not met.'
        }
      }
    } else {
      return {
        success: true
      }
    }
  }

  /**
   * Adds an upgrade to the database.
   *
   * @param upgradeId The id of the upgrade.
   * @param characterId The character id the upgrade applies to.
   * @returns False if the upgrade could not be added to the database.
   */
  async #addUpgradeToDb(upgradeId: number, characterId: Character): Promise<Boolean> {
    let upgrade: TUpgrade | null = null

    for (const [, u] of this.#upgrades.entries()) {
      if (u.id === upgradeId) {
        upgrade = u
      }
    }

    if (!upgrade) {
      return false
    }

    const result = (await this.#apolloClient.mutate({
      mutation: AddUpgradeDocument,
      variables: {
        characterId,
        upgradeId
      },
      refetchQueries: [
        {
          query: UpgradesDocument,
          variables: {
            characterId
          }
        },
        {
          query: MeDocument
        }
      ]
    })) as AddUpgradeMutationResult

    if (result.error) {
      return false
    }

    if (result.data?.addUpgrade) {
      ;(await this.#apolloClient.mutate({
        mutation: UpdateCurrencyDocument,
        variables: {
          currency: -upgrade.cost
        },
        refetchQueries: [
          {
            query: UpgradesDocument,
            variables: {
              characterId
            }
          },
          {
            query: MeDocument
          }
        ]
      })) as UpdateCurrencyMutationResult
    }

    return true
  }

  /**
   * Attempts to purchase an upgrade.
   *
   * @param upgradeId The id of the upgrade.
   * @param characterId The character id the upgrade applies to,
   * @param lvlHandler The player level handler.
   * @returns An object containing information about the purchase success.
   */
  async purchaseUpgrade(
    upgradeId: UpgradeType,
    characterId: Character,
    lvlHandler: PlayerLevelHandler
  ): Promise<TAddUpgradeResponse> {
    const result = (await this.#apolloClient.query({
      query: UpgradesDocument,
      variables: {
        characterId
      }
    })) as UpgradesQueryResult

    if (result.error || !result.data?.upgrades) {
      return {
        error: {
          message: 'Something went wrong...'
        }
      }
    }

    const resultUpgrade = result.data.upgrades

    for (let i = 0; i < resultUpgrade.length; i++) {
      if (resultUpgrade[i].upgrade_id === upgradeId) {
        return {
          error: {
            message: 'Upgrade already bought.'
          }
        }
      }
    }

    this.#addUpgradeToDb(upgradeId, characterId)

    return {
      success: true
    }
  }

  async removeAllUpgrades(characterId: Character) {
    await this.#apolloClient.mutate({
      mutation: RemoveAllUpgradesDocument,
      variables: {
        characterId
      },
      refetchQueries: [
        {
          query: UpgradesDocument,
          variables: {
            characterId
          }
        }
      ]
    })
  }
}
