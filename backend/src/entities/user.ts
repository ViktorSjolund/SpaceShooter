import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  username!: string

  @Field()
  @Column()
  password!: string

  @Field()
  @Column()
  created_at!: string

  @Field()
  @Column()
  updated_at!: string

  @Field(() => Int, { nullable: true })
  @Column()
  currency?: number

  @Field(() => Int, { nullable: true })
  @Column()
  experience?: number
}
