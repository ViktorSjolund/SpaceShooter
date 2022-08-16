import { Field, ObjectType } from 'type-graphql'
import { FieldError } from '../misc/field-error'

/**
 * A response class for registering a user.
 */
@ObjectType()
export class RegisterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => Boolean, { nullable: true })
  success?: boolean
}
