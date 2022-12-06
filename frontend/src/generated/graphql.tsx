import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LeaderboardResponse = {
  __typename?: 'LeaderboardResponse';
  experience: Scalars['Float'];
  time: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUpgrade: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  register: RegisterResponse;
  removeAllUpgrades: Scalars['Boolean'];
  updateCurrency: Scalars['Boolean'];
  updateExperience: Scalars['Boolean'];
  updateLeaderboard: Scalars['Boolean'];
};


export type MutationAddUpgradeArgs = {
  character_id: Scalars['Int'];
  upgrade_id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRemoveAllUpgradesArgs = {
  character_id: Scalars['Int'];
};


export type MutationUpdateCurrencyArgs = {
  currency: Scalars['Int'];
};


export type MutationUpdateExperienceArgs = {
  experience: Scalars['Int'];
};


export type MutationUpdateLeaderboardArgs = {
  time: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  leaderboard: Array<LeaderboardResponse>;
  login: UserResponse;
  me: UserResponse;
  upgrades: Array<Upgrades>;
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type QueryUpgradesArgs = {
  character_id: Scalars['Int'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Upgrades = {
  __typename?: 'Upgrades';
  character_id: Scalars['Float'];
  id: Scalars['Float'];
  upgrade_id: Scalars['Float'];
  user_id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['String'];
  currency?: Maybe<Scalars['Int']>;
  experience?: Maybe<Scalars['Int']>;
  id: Scalars['Float'];
  password: Scalars['String'];
  updated_at: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type AddUpgradeMutationVariables = Exact<{
  characterId: Scalars['Int'];
  upgradeId: Scalars['Int'];
}>;


export type AddUpgradeMutation = { __typename?: 'Mutation', addUpgrade: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', success?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveAllUpgradesMutationVariables = Exact<{
  characterId: Scalars['Int'];
}>;


export type RemoveAllUpgradesMutation = { __typename?: 'Mutation', removeAllUpgrades: boolean };

export type UpdateCurrencyMutationVariables = Exact<{
  currency: Scalars['Int'];
}>;


export type UpdateCurrencyMutation = { __typename?: 'Mutation', updateCurrency: boolean };

export type UpdateExperienceMutationVariables = Exact<{
  experience: Scalars['Int'];
}>;


export type UpdateExperienceMutation = { __typename?: 'Mutation', updateExperience: boolean };

export type UpdateLeaderboardMutationVariables = Exact<{
  time: Scalars['String'];
}>;


export type UpdateLeaderboardMutation = { __typename?: 'Mutation', updateLeaderboard: boolean };

export type LeaderboardQueryVariables = Exact<{ [key: string]: never; }>;


export type LeaderboardQuery = { __typename?: 'Query', leaderboard: Array<{ __typename?: 'LeaderboardResponse', username: string, time: string, experience: number }> };

export type LoginQueryVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, currency?: number | null, experience?: number | null } | null } };

export type UpgradesQueryVariables = Exact<{
  characterId: Scalars['Int'];
}>;


export type UpgradesQuery = { __typename?: 'Query', upgrades: Array<{ __typename?: 'Upgrades', upgrade_id: number }> };


export const AddUpgradeDocument = gql`
    mutation AddUpgrade($characterId: Int!, $upgradeId: Int!) {
  addUpgrade(character_id: $characterId, upgrade_id: $upgradeId)
}
    `;
export type AddUpgradeMutationFn = Apollo.MutationFunction<AddUpgradeMutation, AddUpgradeMutationVariables>;

/**
 * __useAddUpgradeMutation__
 *
 * To run a mutation, you first call `useAddUpgradeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUpgradeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUpgradeMutation, { data, loading, error }] = useAddUpgradeMutation({
 *   variables: {
 *      characterId: // value for 'characterId'
 *      upgradeId: // value for 'upgradeId'
 *   },
 * });
 */
export function useAddUpgradeMutation(baseOptions?: Apollo.MutationHookOptions<AddUpgradeMutation, AddUpgradeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUpgradeMutation, AddUpgradeMutationVariables>(AddUpgradeDocument, options);
      }
export type AddUpgradeMutationHookResult = ReturnType<typeof useAddUpgradeMutation>;
export type AddUpgradeMutationResult = Apollo.MutationResult<AddUpgradeMutation>;
export type AddUpgradeMutationOptions = Apollo.BaseMutationOptions<AddUpgradeMutation, AddUpgradeMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($password: String!, $username: String!) {
  register(password: $password, username: $username) {
    errors {
      field
      message
    }
    success
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveAllUpgradesDocument = gql`
    mutation RemoveAllUpgrades($characterId: Int!) {
  removeAllUpgrades(character_id: $characterId)
}
    `;
export type RemoveAllUpgradesMutationFn = Apollo.MutationFunction<RemoveAllUpgradesMutation, RemoveAllUpgradesMutationVariables>;

/**
 * __useRemoveAllUpgradesMutation__
 *
 * To run a mutation, you first call `useRemoveAllUpgradesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAllUpgradesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAllUpgradesMutation, { data, loading, error }] = useRemoveAllUpgradesMutation({
 *   variables: {
 *      characterId: // value for 'characterId'
 *   },
 * });
 */
export function useRemoveAllUpgradesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAllUpgradesMutation, RemoveAllUpgradesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAllUpgradesMutation, RemoveAllUpgradesMutationVariables>(RemoveAllUpgradesDocument, options);
      }
export type RemoveAllUpgradesMutationHookResult = ReturnType<typeof useRemoveAllUpgradesMutation>;
export type RemoveAllUpgradesMutationResult = Apollo.MutationResult<RemoveAllUpgradesMutation>;
export type RemoveAllUpgradesMutationOptions = Apollo.BaseMutationOptions<RemoveAllUpgradesMutation, RemoveAllUpgradesMutationVariables>;
export const UpdateCurrencyDocument = gql`
    mutation UpdateCurrency($currency: Int!) {
  updateCurrency(currency: $currency)
}
    `;
export type UpdateCurrencyMutationFn = Apollo.MutationFunction<UpdateCurrencyMutation, UpdateCurrencyMutationVariables>;

/**
 * __useUpdateCurrencyMutation__
 *
 * To run a mutation, you first call `useUpdateCurrencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCurrencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCurrencyMutation, { data, loading, error }] = useUpdateCurrencyMutation({
 *   variables: {
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useUpdateCurrencyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCurrencyMutation, UpdateCurrencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCurrencyMutation, UpdateCurrencyMutationVariables>(UpdateCurrencyDocument, options);
      }
export type UpdateCurrencyMutationHookResult = ReturnType<typeof useUpdateCurrencyMutation>;
export type UpdateCurrencyMutationResult = Apollo.MutationResult<UpdateCurrencyMutation>;
export type UpdateCurrencyMutationOptions = Apollo.BaseMutationOptions<UpdateCurrencyMutation, UpdateCurrencyMutationVariables>;
export const UpdateExperienceDocument = gql`
    mutation UpdateExperience($experience: Int!) {
  updateExperience(experience: $experience)
}
    `;
export type UpdateExperienceMutationFn = Apollo.MutationFunction<UpdateExperienceMutation, UpdateExperienceMutationVariables>;

/**
 * __useUpdateExperienceMutation__
 *
 * To run a mutation, you first call `useUpdateExperienceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExperienceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExperienceMutation, { data, loading, error }] = useUpdateExperienceMutation({
 *   variables: {
 *      experience: // value for 'experience'
 *   },
 * });
 */
export function useUpdateExperienceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExperienceMutation, UpdateExperienceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExperienceMutation, UpdateExperienceMutationVariables>(UpdateExperienceDocument, options);
      }
export type UpdateExperienceMutationHookResult = ReturnType<typeof useUpdateExperienceMutation>;
export type UpdateExperienceMutationResult = Apollo.MutationResult<UpdateExperienceMutation>;
export type UpdateExperienceMutationOptions = Apollo.BaseMutationOptions<UpdateExperienceMutation, UpdateExperienceMutationVariables>;
export const UpdateLeaderboardDocument = gql`
    mutation UpdateLeaderboard($time: String!) {
  updateLeaderboard(time: $time)
}
    `;
export type UpdateLeaderboardMutationFn = Apollo.MutationFunction<UpdateLeaderboardMutation, UpdateLeaderboardMutationVariables>;

/**
 * __useUpdateLeaderboardMutation__
 *
 * To run a mutation, you first call `useUpdateLeaderboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLeaderboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLeaderboardMutation, { data, loading, error }] = useUpdateLeaderboardMutation({
 *   variables: {
 *      time: // value for 'time'
 *   },
 * });
 */
export function useUpdateLeaderboardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLeaderboardMutation, UpdateLeaderboardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLeaderboardMutation, UpdateLeaderboardMutationVariables>(UpdateLeaderboardDocument, options);
      }
export type UpdateLeaderboardMutationHookResult = ReturnType<typeof useUpdateLeaderboardMutation>;
export type UpdateLeaderboardMutationResult = Apollo.MutationResult<UpdateLeaderboardMutation>;
export type UpdateLeaderboardMutationOptions = Apollo.BaseMutationOptions<UpdateLeaderboardMutation, UpdateLeaderboardMutationVariables>;
export const LeaderboardDocument = gql`
    query Leaderboard {
  leaderboard {
    username
    time
    experience
  }
}
    `;

/**
 * __useLeaderboardQuery__
 *
 * To run a query within a React component, call `useLeaderboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeaderboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeaderboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useLeaderboardQuery(baseOptions?: Apollo.QueryHookOptions<LeaderboardQuery, LeaderboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LeaderboardQuery, LeaderboardQueryVariables>(LeaderboardDocument, options);
      }
export function useLeaderboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LeaderboardQuery, LeaderboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LeaderboardQuery, LeaderboardQueryVariables>(LeaderboardDocument, options);
        }
export type LeaderboardQueryHookResult = ReturnType<typeof useLeaderboardQuery>;
export type LeaderboardLazyQueryHookResult = ReturnType<typeof useLeaderboardLazyQuery>;
export type LeaderboardQueryResult = Apollo.QueryResult<LeaderboardQuery, LeaderboardQueryVariables>;
export const LoginDocument = gql`
    query Login($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    errors {
      field
      message
    }
    user {
      id
    }
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    errors {
      field
      message
    }
    user {
      id
      username
      currency
      experience
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UpgradesDocument = gql`
    query Upgrades($characterId: Int!) {
  upgrades(character_id: $characterId) {
    upgrade_id
  }
}
    `;

/**
 * __useUpgradesQuery__
 *
 * To run a query within a React component, call `useUpgradesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpgradesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpgradesQuery({
 *   variables: {
 *      characterId: // value for 'characterId'
 *   },
 * });
 */
export function useUpgradesQuery(baseOptions: Apollo.QueryHookOptions<UpgradesQuery, UpgradesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UpgradesQuery, UpgradesQueryVariables>(UpgradesDocument, options);
      }
export function useUpgradesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpgradesQuery, UpgradesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UpgradesQuery, UpgradesQueryVariables>(UpgradesDocument, options);
        }
export type UpgradesQueryHookResult = ReturnType<typeof useUpgradesQuery>;
export type UpgradesLazyQueryHookResult = ReturnType<typeof useUpgradesLazyQuery>;
export type UpgradesQueryResult = Apollo.QueryResult<UpgradesQuery, UpgradesQueryVariables>;