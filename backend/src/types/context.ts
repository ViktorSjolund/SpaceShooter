import mysql from 'mysql'
import { Request, Response } from 'express'

export type ApolloContextType = {
  connection: mysql.Connection
  req: Request & { session: any },
  res: Response
}