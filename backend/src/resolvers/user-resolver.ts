import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'
import util from 'util'
import bcrypt from 'bcrypt'
import { ApolloContextType } from '../types/context'
import { UserResponse } from './responses/user-response'
import { RegisterResponse } from './responses/register-response'

/**
 * A resolver for handling user events.
 */
@Resolver()
export class UserResolver {
  /**
   * Adds a new currency amount to the already existing currency the user has.
   * 
   * @param currency The currency amount to be added.
   * @returns True if it successfully added the currency.
   */
  @Mutation(() => Boolean)
  async updateCurrency(
    @Arg('currency', () => Int) currency: number,
    @Ctx() { connection, req }: ApolloContextType
  ): Promise<Boolean> {
    await connection.query(
      `UPDATE user SET currency = currency + ${currency} WHERE id = ${req.session.userId}`
    )

    return true
  }

  /**
   * Adds a new experience amount to the already existing experience the user has.
   * 
   * @param experience The experience amount to be added.
   * @returns True if it succesfully added the experience.
   */
  @Mutation(() => Boolean)
  async updateExperience(
    @Arg('experience', () => Int) experience: number,
    @Ctx() { connection, req }: ApolloContextType
  ): Promise<Boolean> {
    await connection.query(
      `UPDATE user SET experience = experience + ${experience} WHERE id = ${req.session.userId}`
    )

    return true
  }

  /**
   * Gets the current logged in user.
   * 
   * @returns An object with the user or an error if unauthorized.
   */
  @Query(() => UserResponse)
  async me(
    @Ctx() { connection, req }: ApolloContextType
  ): Promise<UserResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: 'auth',
            message: 'unauthorized',
          },
        ],
      }
    }

    const user: any = await connection.query(
      `SELECT * FROM user WHERE (id = ${req.session.userId})`
    )

    return {
      user: user[0],
    }
  }

  /**
   * Logout the current user.
   * 
   * @returns True if the user successfully logged out.
   */
  @Mutation(() => Boolean)
  logout(@Ctx() { req }: ApolloContextType) {
    let response = true
    req.session.destroy((err: any) => {
      if (err) {
        response = false
      }
    })
    return response
  }

  /**
   * Login a user.
   * 
   * @param username The username of the user.
   * @param password The password of the user.
   * @returns An object with the user or an error if the credentials are bad.
   */
  @Query(() => UserResponse)
  async login(
    @Arg('username', () => String) username: string,
    @Arg('password', () => String) password: string,
    @Ctx() { connection, req }: ApolloContextType
  ): Promise<UserResponse> {
    const result: any = await connection.query(
      `SELECT * FROM user WHERE (username = '${username}')`
    )

    if (result[0].length === 0) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username does not exist.',
          },
        ],
      }
    }
    const user = result[0][0]

    const isValidPw = await bcrypt.compare(password, user.password)

    if (!isValidPw) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Incorrect password.',
          },
        ],
      }
    }

    req.session.userId = user.id

    return {
      user: user,
    }
  }

  /**
   * Registers a new user.
   * 
   * @param username The username of the user.
   * @param password The password of the user.
   * @returns An object with a success key or an error if something went bad.
   */
  @Mutation(() => RegisterResponse)
  async register(
    @Arg('username', () => String) username: string,
    @Arg('password', () => String) password: string,
    @Ctx() { connection }: ApolloContextType
  ): Promise<RegisterResponse> {
    const minUsernameLength = 3
    if (username.length <= minUsernameLength) {
      return {
        errors: [
          {
            field: 'username',
            message: `username must be longer than ${minUsernameLength} characters.`,
          },
        ],
      }
    }

    const minPasswordLength = 5
    if (password.length <= minPasswordLength) {
      return {
        errors: [
          {
            field: 'password',
            message: `password must be longer than ${minPasswordLength} characters.`,
          },
        ],
      }
    }

    const saltRounds = 10
    const hashedPw = await bcrypt.hash(password, saltRounds)

    try {
      await connection.query(
        `INSERT INTO user (id, username, password) VALUES (${null}, '${username}', '${hashedPw}')`
      )
    } catch (err: any) {
      // Username already exists error.
      if (err.errno === 1062) {
        return {
          errors: [
            {
              field: 'username',
              message: 'Username already exists.',
            },
          ],
        }
      } else {
        return {
          errors: [
            {
              field: 'internal server',
              message: 'user could not be inserted.',
            },
          ],
        }
      }
    }

    return {
      success: true,
    }
  }
}
