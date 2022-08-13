import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import { AppRouter } from './components/router'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  credentials: 'include',
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppRouter client={client}/>
    </ApolloProvider>
  </React.StrictMode>
)
