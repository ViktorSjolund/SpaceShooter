import { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types'
import { ApolloClient } from '@apollo/client/core/ApolloClient'
import type {
  TAddUpgradeResponse,
  TCouldPurchaseResponse,
  TUpgrade,
} from '@/types/types'
import {
  AddUpgradeDocument,
  MeDocument,
  UpdateCurrencyDocument,
  UpdateCurrencyMutationResult,
  UpgradesDocument,
} from '../../generated/graphql'
import { CHARACTER, UPGRADE_ID } from '../util/enums'
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
   * @param upgrade The upgrade that is to be checked.
   * @param lvlHandler The player level handler.
   * @returns An object containing information about the purchase success.
   */
  async #canPurchaseUpgrade(
    upgrade: TUpgrade,
    lvlHandler: PlayerLevelHandler
  ): Promise<TCouldPurchaseResponse> {
    const meResponse = await this.#apolloClient.query<any>({
      query: MeDocument,
    })

    if (meResponse.error) {
      return {
        error: {
          message: 'Something went wrong...',
        },
      }
    }

    const user = meResponse.data.me.user
    const currency = user.currency || 0

    const playerLvl = lvlHandler.getPlayerLevel(user.experience)

    if (upgrade.cost > currency) {
      return {
        error: {
          message: 'Insufficient funds.',
        },
      }
    } else if (upgrade.requirement > playerLvl) {
      return {
        error: {
          message: 'Lvl requirement was not met.',
        },
      }
    } else {
      return {
        success: true,
      }
    }
  }

  /**
   * Adds an upgrade to the database.
   *
   * @param upgradeId The id of the upgrade.
   * @param cost The cost of the upgrade.
   * @param characterId The character id the upgrade applies to.
   * @returns False if the upgrade could not be added to the database.
   */
  async #addUpgradeToDb(
    upgradeId: number,
    cost: number,
    characterId: CHARACTER
  ): Promise<Boolean> {
    const result = await this.#apolloClient.mutate<any>({
      mutation: AddUpgradeDocument,
      variables: {
        characterId,
        upgradeId,
      },
      refetchQueries: [
        {
          query: UpgradesDocument,
          variables: {
            characterId,
          },
        },
        {
          query: MeDocument,
        },
      ],
    })

    if (result.errors) {
      return false
    }

    if (result.data.addUpgrade) {
      await this.#apolloClient.mutate<UpdateCurrencyMutationResult>({
        mutation: UpdateCurrencyDocument,
        variables: {
          currency: -cost,
        },
        refetchQueries: [
          {
            query: UpgradesDocument,
            variables: {
              characterId,
            },
          },
          {
            query: MeDocument,
          },
        ],
      })
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
    upgradeId: UPGRADE_ID,
    characterId: CHARACTER,
    lvlHandler: PlayerLevelHandler
  ): Promise<TAddUpgradeResponse> {
    const result: any = await this.#apolloClient.query({
      query: UpgradesDocument,
      variables: {
        characterId,
      },
    })

    if (result.error) {
      return {
        error: {
          message: 'Something went wrong...',
        },
      }
    }

    const resultUpgrade = result.data?.upgrades

    for (let i = 0; i < resultUpgrade.length; i++) {
      if (resultUpgrade[i].upgrade_id === upgradeId) {
        return {
          error: {
            message: 'Upgrade already bought.',
          },
        }
      }
    }

    for (const [index, upgrade] of this.#upgrades.entries()) {
      if (upgrade.id === upgradeId) {
        const response = await this.#canPurchaseUpgrade(upgrade, lvlHandler)
        if (response.success) {
          this.#addUpgradeToDb(upgrade.id, upgrade.cost, characterId)
        }

        return response
      }
    }

    return {
      success: true,
    }
  }
}
