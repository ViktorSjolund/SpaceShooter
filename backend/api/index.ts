import express from 'express'
import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server-express'
import { UserResolver } from '../src/resolvers/user-resolver'
import { buildSchema } from 'type-graphql'
import 'reflect-metadata'
import cors from 'cors'
import session from 'express-session'
import { UpgradesResolver } from '../src/resolvers/upgrades-resolver'
import { LeaderboardResolver } from '../src/resolvers/leaderboard-resolver'
const MySQLStore = require('express-mysql-session')(session)
import * as mysql from 'mysql2/promise'

dotenv.config()
const app = express()

/**
 * Main function for starting the server.
 */
const main = async () => {  
  const PORT = process.env.PORT || 3001
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
  const connection = await mysql.createConnection(process.env.DATABASE_URL!)

  if (process.env.NODE_ENV === 'production') {
    console.log(FRONTEND_URL)
    app.set('trust proxy', 1)
    app.use(cors({
      origin: [FRONTEND_URL],
      credentials: true,
    }))
  }

  app.use(
    session({
      name: 'auth',
      secret: process.env.SESSION_SECRET!,
      store: new MySQLStore(
        {
          createDatabaseTable: true,
          clearExpired: true,
        },
        connection
      ),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: process.env.NODE_ENV === 'production' ? false : true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production' ? true : false,
      },
      resave: false,
      saveUninitialized: false,
    })
  )

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, UpgradesResolver, LeaderboardResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      connection,
      req,
      res,
    }),
  })

  const corsOptions: cors.CorsOptions = {
    origin: [FRONTEND_URL]
  }

  await server.start()
  server.applyMiddleware({ app, cors: corsOptions })

  app.get('/', (req, res) => {
    res.sendStatus(200)
  })

  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

  return server
}

export default main()