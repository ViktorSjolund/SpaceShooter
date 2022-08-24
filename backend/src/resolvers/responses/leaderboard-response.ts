import { Field, ObjectType } from 'type-graphql'

/**
 * A response class for the leaderboard.
 */
@ObjectType()
export class LeaderboardResponse {
  @Field()
  username!: string

  @Field()
  time!: string

  @Field()
  experience!: number
}
