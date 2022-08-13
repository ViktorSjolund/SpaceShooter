import { Field, ObjectType } from 'type-graphql'

/**
 * A field class type for displaying errors.
 */
@ObjectType()
export class FieldError {
  @Field()
  field!: string

  @Field()
  message!: string
}
