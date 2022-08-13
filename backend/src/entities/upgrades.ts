import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Upgrades {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  upgrade_id!: number

  @Field()
  @Column()
  user_id!: number

  @Field()
  @Column()
  character_id!: number
}
