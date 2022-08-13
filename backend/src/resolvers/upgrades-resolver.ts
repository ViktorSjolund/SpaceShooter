import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Upgrades } from '../entities/upgrades'
import { ApolloContextType } from '../types/context'
import util from 'util'

/**
 * A resolver for handling upgrade events.
 */
@Resolver()
export class UpgradesResolver {
  /**
   * Gets the user's unlocked upgrades for the given character.
   * 
   * @param characterId The id of the character the user has selected.
   * @returns An array of the unlocked upgrades.
   */
  @Query(() => [Upgrades])
  async upgrades(
    @Arg('character_id', () => Int) characterId: number,
    @Ctx() { connection, req }: ApolloContextType
  ): Promise<Upgrades[]> {
    const query = util.promisify(connection.query).bind(connection)

    const upgrades: any = await query(`
      SELECT * 
      FROM upgrades 
      WHERE user_id = ${req.session.userId} 
      AND character_id = ${characterId}
    `)

    return upgrades
  }

  /**
   * Adds an upgrade to the user.
   * 
   * @param upgradeId The id of the upgrade.
   * @param characterId The id of the character the user has selected.
   * @returns False if the user already has the upgrade.
   */
  @Mutation(() => Boolean)
  async addUpgrade(
    @Arg('upgrade_id', () => Int) upgradeId: number,
    @Arg('character_id', () => Int) characterId: number,
    @Ctx() { connection, req }: ApolloContextType
  ): Promise<Boolean> {
    const query = util.promisify(connection.query).bind(connection)

    const result: any = await query(`
      SELECT * 
      FROM upgrades 
      WHERE (user_id = ${req.session.userId} 
      AND upgrade_id = ${upgradeId} 
      AND character_id = ${characterId})
    `)
    
    if (result[0]) {
      return false
    }

    await query(`
      INSERT INTO upgrades (id, user_id, upgrade_id, character_id) 
      VALUES (${null}, ${req.session.userId}, ${upgradeId}, ${characterId})
    `)
    return true
  }
}
