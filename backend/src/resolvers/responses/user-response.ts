import { Field, ObjectType } from 'type-graphql'
import { User } from '../../entities/user'
import { FieldError } from '../misc/field-error'

/**
 * A response class for getting a user.
 */
@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}
