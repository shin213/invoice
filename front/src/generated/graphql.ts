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

export type Mutation = {
  __typename?: 'Mutation';
  addCompany: Company;
  addInvoiceFormat: InvoiceFormat;
  addUser: User;
  removeCompany: Scalars['Boolean'];
  removeInvoiceFormat: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
};


export type MutationAddCompanyArgs = {
  newCompany: NewCompanyInput;
};


export type MutationAddInvoiceFormatArgs = {
  newInvoiceFormat: NewInvoiceFormatInput;
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
  getUser: User;
  invoice_formats: Array<InvoiceFormat>;
  users: Array<User>;
};


export type QueryGetCompanyArgs = {
  id: Scalars['Int'];
};


export type QueryGetInvoiceFormatArgs = {
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

export type AllQueryVariables = Exact<{ [key: string]: never; }>;


export type AllQuery = { __typename?: 'Query', companies: Array<{ __typename?: 'Company', id: string, name: string }>, invoice_formats: Array<{ __typename?: 'InvoiceFormat', id: string, name: string }>, users: Array<{ __typename?: 'User', id: string, name: string }> };

export type CompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesQuery = { __typename?: 'Query', companies: Array<{ __typename?: 'Company', id: string, name: string }> };


export const AllDocument = gql`
    query All {
  companies {
    id
    name
  }
  invoice_formats {
    id
    name
  }
  users {
    id
    name
  }
}
    `;

/**
 * __useAllQuery__
 *
 * To run a query within a React component, call `useAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllQuery(baseOptions?: Apollo.QueryHookOptions<AllQuery, AllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllQuery, AllQueryVariables>(AllDocument, options);
      }
export function useAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllQuery, AllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllQuery, AllQueryVariables>(AllDocument, options);
        }
export type AllQueryHookResult = ReturnType<typeof useAllQuery>;
export type AllLazyQueryHookResult = ReturnType<typeof useAllLazyQuery>;
export type AllQueryResult = Apollo.QueryResult<AllQuery, AllQueryVariables>;
export const CompaniesDocument = gql`
    query Companies {
  companies {
    id
    name
  }
}
    `;

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
      }
export function useCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
        }
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>;
export type CompaniesQueryResult = Apollo.QueryResult<CompaniesQuery, CompaniesQueryVariables>;