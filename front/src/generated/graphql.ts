/* eslint-disable */
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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type InvoiceFormat = {
  __typename?: 'InvoiceFormat';
  company: Company;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type InvoiceFormatElement = {
  __typename?: 'InvoiceFormatElement';
  label: Scalars['String'];
  order: Scalars['Int'];
  value_type: Scalars['String'];
};

export type InvoiceFormatElementInput = {
  label: Scalars['String'];
  order: Scalars['Int'];
  value_type: Scalars['String'];
};

export type InvoiceFormatLog = {
  __typename?: 'InvoiceFormatLog';
  body: Array<InvoiceFormatElement>;
  created_at: Scalars['DateTime'];
  created_by: User;
  id: Scalars['String'];
  invoice_format: InvoiceFormat;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCompany: Company;
  addInvoiceFormat: InvoiceFormat;
  addInvoiceFormatLog: InvoiceFormatLog;
  addUser: User;
  removeCompany: Scalars['Boolean'];
  removeInvoiceFormat: Scalars['Boolean'];
  removeInvoiceFormatLog: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
};


export type MutationAddCompanyArgs = {
  newCompany: NewCompanyInput;
};


export type MutationAddInvoiceFormatArgs = {
  newInvoiceFormat: NewInvoiceFormatInput;
};


export type MutationAddInvoiceFormatLogArgs = {
  newInvoiceFormatLog: NewInvoiceFormatInputLog;
};


export type MutationAddUserArgs = {
  newUser: NewUserInput;
};


export type MutationRemoveCompanyArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveInvoiceFormatArgs = {
  id: Scalars['String'];
};


export type MutationRemoveInvoiceFormatLogArgs = {
  id: Scalars['String'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};

export type NewCompanyInput = {
  name: Scalars['String'];
};

export type NewInvoiceFormatInput = {
  company_id: Scalars['Int'];
  name: Scalars['String'];
};

export type NewInvoiceFormatInputLog = {
  body: Array<InvoiceFormatElementInput>;
  created_by: Scalars['Int'];
  invoice_format_id: Scalars['String'];
};

export type NewUserInput = {
  company_id: Scalars['Int'];
  email: Scalars['String'];
  is_admin: Scalars['Boolean'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  companies: Array<Company>;
  getCompany: Company;
  getInvoiceFormat: InvoiceFormat;
  getInvoiceFormatLog: InvoiceFormatLog;
  getUser: User;
  invoice_format_logs: Array<InvoiceFormatLog>;
  invoice_formats: Array<InvoiceFormat>;
  users: Array<User>;
};


export type QueryGetCompanyArgs = {
  id: Scalars['Int'];
};


export type QueryGetInvoiceFormatArgs = {
  id: Scalars['String'];
};


export type QueryGetInvoiceFormatLogArgs = {
  id: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  company: Company;
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  is_admin: Scalars['Boolean'];
  name: Scalars['String'];
};

export type RegistrationsQueryVariables = Exact<{ [key: string]: never; }>;


export type RegistrationsQuery = { __typename?: 'Query', invoice_formats: Array<{ __typename?: 'InvoiceFormat', id: string, name: string }>, users: Array<{ __typename?: 'User', id: string, name: string, email: string, is_admin: boolean }> };

export type RequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type RequestsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, email: string, is_admin: boolean }> };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, email: string, is_admin: boolean }> };


export const RegistrationsDocument = gql`
    query Registrations {
  invoice_formats {
    id
    name
  }
  users {
    id
    name
    email
    is_admin
  }
}
    `;

/**
 * __useRegistrationsQuery__
 *
 * To run a query within a React component, call `useRegistrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegistrationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRegistrationsQuery(baseOptions?: Apollo.QueryHookOptions<RegistrationsQuery, RegistrationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RegistrationsQuery, RegistrationsQueryVariables>(RegistrationsDocument, options);
      }
export function useRegistrationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RegistrationsQuery, RegistrationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RegistrationsQuery, RegistrationsQueryVariables>(RegistrationsDocument, options);
        }
export type RegistrationsQueryHookResult = ReturnType<typeof useRegistrationsQuery>;
export type RegistrationsLazyQueryHookResult = ReturnType<typeof useRegistrationsLazyQuery>;
export type RegistrationsQueryResult = Apollo.QueryResult<RegistrationsQuery, RegistrationsQueryVariables>;
export const RequestsDocument = gql`
    query Requests {
  users {
    id
    name
    email
    is_admin
  }
}
    `;

/**
 * __useRequestsQuery__
 *
 * To run a query within a React component, call `useRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRequestsQuery(baseOptions?: Apollo.QueryHookOptions<RequestsQuery, RequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestsQuery, RequestsQueryVariables>(RequestsDocument, options);
      }
export function useRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestsQuery, RequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestsQuery, RequestsQueryVariables>(RequestsDocument, options);
        }
export type RequestsQueryHookResult = ReturnType<typeof useRequestsQuery>;
export type RequestsLazyQueryHookResult = ReturnType<typeof useRequestsLazyQuery>;
export type RequestsQueryResult = Apollo.QueryResult<RequestsQuery, RequestsQueryVariables>;
export const SettingsDocument = gql`
    query Settings {
  users {
    id
    name
    email
    is_admin
  }
}
    `;

/**
 * __useSettingsQuery__
 *
 * To run a query within a React component, call `useSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsQuery(baseOptions?: Apollo.QueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
      }
export function useSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingsQuery, SettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingsQuery, SettingsQueryVariables>(SettingsDocument, options);
        }
export type SettingsQueryHookResult = ReturnType<typeof useSettingsQuery>;
export type SettingsLazyQueryHookResult = ReturnType<typeof useSettingsLazyQuery>;
export type SettingsQueryResult = Apollo.QueryResult<SettingsQuery, SettingsQueryVariables>;