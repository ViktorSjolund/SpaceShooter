import * as mysql from 'mysql2/promise'
import { Request, Response } from 'express'

export type ApolloContextType = {
  connection: mysql.Connection
  req: Request & { session: any },
  res: Response
}