import * as mysql from 'mysql2/promise'
import express from 'express'

export type ApolloContextType = {
  connection: mysql.Connection
  req: express.Request & { session: { userId: number } },
  res: express.Response
}