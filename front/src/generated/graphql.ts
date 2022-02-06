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

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  invoice: Invoice;
  invoice_id: Scalars['Int'];
  judgement?: Maybe<Judgement>;
  judgement_id?: Maybe<Scalars['Int']>;
  request?: Maybe<Request>;
  request_id: Scalars['Int'];
  user: User;
  user_id: Scalars['Int'];
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Invoice = {
  __typename?: 'Invoice';
  company: Company;
  company_id: Scalars['Int'];
  created_at: Scalars['DateTime'];
  created_by: User;
  id: Scalars['Int'];
  status: InvoiceStatus;
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

export type InvoiceStatus =
  | 'completely_approved'
  | 'not_requested'
  | 'requested';

export type IsRead =
  | 'read'
  | 'unread';

export type Judgement = {
  __typename?: 'Judgement';
  comments: Array<Comment>;
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  request: Request;
  request_id: Scalars['Int'];
  type: JudgementType;
  user: User;
  user_id: Scalars['Int'];
};

export type JudgementType =
  | 'approve'
  | 'decline';

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  addCompany: Company;
  addInvoice: Invoice;
  addInvoiceFormat: InvoiceFormat;
  addInvoiceFormatLog: InvoiceFormatLog;
  addJudgement: Judgement;
  addRequest: Request;
  addRequestNotification: RequestNotification;
  addRequestReceiver: RequestReceiver;
  addUser: User;
  removeComment: Scalars['Boolean'];
  removeCompany: Scalars['Boolean'];
  removeInvoice: Scalars['Boolean'];
  removeInvoiceFormat: Scalars['Boolean'];
  removeInvoiceFormatLog: Scalars['Boolean'];
  removeRequestNotification: Scalars['Boolean'];
  removeRequestReceiver: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
};


export type MutationAddCommentArgs = {
  newComment: NewCommentInput;
};


export type MutationAddCompanyArgs = {
  newCompany: NewCompanyInput;
};


export type MutationAddInvoiceArgs = {
  newInvoice: NewInvoiceInput;
};


export type MutationAddInvoiceFormatArgs = {
  newInvoiceFormat: NewInvoiceFormatInput;
};


export type MutationAddInvoiceFormatLogArgs = {
  newInvoiceFormatLog: NewInvoiceFormatInputLog;
};


export type MutationAddJudgementArgs = {
  newJudgement: NewJudgementInput;
};


export type MutationAddRequestArgs = {
  newRequest: NewRequestInput;
};


export type MutationAddRequestNotificationArgs = {
  newRequestNotification: NewRequestNotificationInput;
};


export type MutationAddRequestReceiverArgs = {
  newRequestReceiver: NewRequestReceiverInput;
};


export type MutationAddUserArgs = {
  newUser: NewUserInput;
};


export type MutationRemoveCommentArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCompanyArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveInvoiceArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveInvoiceFormatArgs = {
  id: Scalars['String'];
};


export type MutationRemoveInvoiceFormatLogArgs = {
  id: Scalars['String'];
};


export type MutationRemoveRequestNotificationArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveRequestReceiverArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};

export type NewCommentInput = {
  content: Scalars['String'];
  invoice_id: Scalars['Int'];
  request_id: Scalars['Int'];
  user_id: Scalars['Int'];
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

export type NewInvoiceInput = {
  company_id: Scalars['Float'];
  status: Scalars['String'];
  user_id: Scalars['Float'];
};

export type NewJudgementInput = {
  comment: Scalars['String'];
  request_id: Scalars['Int'];
  type: Scalars['String'];
  user_id: Scalars['Int'];
};

export type NewRequestInput = {
  invoice_id: Scalars['Int'];
  request_receiver_ids: Array<Scalars['Int']>;
  requester_id: Scalars['Int'];
};

export type NewRequestNotificationInput = {
  is_read: Scalars['String'];
  request_receiver_id: Scalars['Int'];
  type: Scalars['String'];
  user_id: Scalars['Int'];
};

export type NewRequestReceiverInput = {
  receiver_id: Scalars['Int'];
  request_id: Scalars['Int'];
};

export type NewUserInput = {
  company_id: Scalars['Int'];
  email: Scalars['String'];
  employee_code?: InputMaybe<Scalars['String']>;
  family_name: Scalars['String'];
  family_name_furigana: Scalars['String'];
  given_name: Scalars['String'];
  given_name_furigana: Scalars['String'];
  is_admin: Scalars['Boolean'];
};

export type NotificationRequestType =
  | 'request_accepted'
  | 'request_coming'
  | 'request_declined';

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  companies: Array<Company>;
  getComment: Comment;
  getCompany: Company;
  getInvoice: Invoice;
  getInvoiceFormat: InvoiceFormat;
  getInvoiceFormatLog: InvoiceFormatLog;
  getJudgement: Judgement;
  getRequest: Request;
  getRequestNotification: RequestNotification;
  getRequestReceiver: RequestReceiver;
  getUser: User;
  invoice_format_logs: Array<InvoiceFormatLog>;
  invoice_formats: Array<InvoiceFormat>;
  invoices: Array<Invoice>;
  judgements: Array<Judgement>;
  requestNotifications: Array<RequestNotification>;
  requestReceivers: Array<RequestReceiver>;
  requests: Array<Request>;
  users: Array<User>;
};


export type QueryGetCommentArgs = {
  id: Scalars['Int'];
};


export type QueryGetCompanyArgs = {
  id: Scalars['Int'];
};


export type QueryGetInvoiceArgs = {
  id: Scalars['Int'];
};


export type QueryGetInvoiceFormatArgs = {
  id: Scalars['String'];
};


export type QueryGetInvoiceFormatLogArgs = {
  id: Scalars['String'];
};


export type QueryGetJudgementArgs = {
  id: Scalars['Int'];
};


export type QueryGetRequestArgs = {
  id: Scalars['Int'];
};


export type QueryGetRequestNotificationArgs = {
  id: Scalars['Int'];
};


export type QueryGetRequestReceiverArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type Request = {
  __typename?: 'Request';
  comments: Array<Comment>;
  company: Company;
  company_id: Scalars['Int'];
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  invoice: Invoice;
  invoice_id: Scalars['Int'];
  judgements: Array<Judgement>;
  request_receivers: Array<RequestReceiver>;
  requester: User;
  requester_id: Scalars['Int'];
  status: RequestStatus;
};

export type RequestNotification = {
  __typename?: 'RequestNotification';
  id: Scalars['Int'];
  is_read: IsRead;
  request_receiver: RequestReceiver;
  request_receiver_id: Scalars['Int'];
  type: NotificationRequestType;
  user: User;
  user_id: Scalars['Int'];
};

export type RequestReceiver = {
  __typename?: 'RequestReceiver';
  id: Scalars['Int'];
  receiver: User;
  receiver_id: Scalars['Int'];
  request: Request;
  request_id: Scalars['Int'];
};

export type RequestStatus =
  | 'approved'
  | 'declined'
  | 'requesting';

export type User = {
  __typename?: 'User';
  company: Company;
  company_id: Scalars['Int'];
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  employee_code?: Maybe<Scalars['String']>;
  family_name: Scalars['String'];
  family_name_furigana: Scalars['String'];
  given_name: Scalars['String'];
  given_name_furigana: Scalars['String'];
  id: Scalars['Int'];
  is_admin: Scalars['Boolean'];
};

export type ApprovalsQueryVariables = Exact<{ [key: string]: never; }>;


export type ApprovalsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, family_name: string, given_name: string, family_name_furigana: string, given_name_furigana: string, email: string, is_admin: boolean, employee_code?: string | null | undefined }> };

export type RequestSendQueryVariables = Exact<{ [key: string]: never; }>;


export type RequestSendQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, family_name: string, given_name: string, family_name_furigana: string, given_name_furigana: string, email: string, is_admin: boolean, employee_code?: string | null | undefined }> };

export type RegistrationsQueryVariables = Exact<{ [key: string]: never; }>;


export type RegistrationsQuery = { __typename?: 'Query', invoice_formats: Array<{ __typename?: 'InvoiceFormat', id: string, name: string }>, users: Array<{ __typename?: 'User', id: number, family_name: string, given_name: string, family_name_furigana: string, given_name_furigana: string, email: string, is_admin: boolean, employee_code?: string | null | undefined }> };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, family_name: string, given_name: string, family_name_furigana: string, given_name_furigana: string, email: string, is_admin: boolean, employee_code?: string | null | undefined }> };


export const ApprovalsDocument = gql`
    query Approvals {
  users {
    id
    family_name
    given_name
    family_name_furigana
    given_name_furigana
    email
    is_admin
    employee_code
  }
}
    `;

/**
 * __useApprovalsQuery__
 *
 * To run a query within a React component, call `useApprovalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApprovalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApprovalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useApprovalsQuery(baseOptions?: Apollo.QueryHookOptions<ApprovalsQuery, ApprovalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApprovalsQuery, ApprovalsQueryVariables>(ApprovalsDocument, options);
      }
export function useApprovalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApprovalsQuery, ApprovalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApprovalsQuery, ApprovalsQueryVariables>(ApprovalsDocument, options);
        }
export type ApprovalsQueryHookResult = ReturnType<typeof useApprovalsQuery>;
export type ApprovalsLazyQueryHookResult = ReturnType<typeof useApprovalsLazyQuery>;
export type ApprovalsQueryResult = Apollo.QueryResult<ApprovalsQuery, ApprovalsQueryVariables>;
export const RequestSendDocument = gql`
    query RequestSend {
  users {
    id
    family_name
    given_name
    family_name_furigana
    given_name_furigana
    email
    is_admin
    employee_code
  }
}
    `;

/**
 * __useRequestSendQuery__
 *
 * To run a query within a React component, call `useRequestSendQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestSendQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestSendQuery({
 *   variables: {
 *   },
 * });
 */
export function useRequestSendQuery(baseOptions?: Apollo.QueryHookOptions<RequestSendQuery, RequestSendQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestSendQuery, RequestSendQueryVariables>(RequestSendDocument, options);
      }
export function useRequestSendLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestSendQuery, RequestSendQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestSendQuery, RequestSendQueryVariables>(RequestSendDocument, options);
        }
export type RequestSendQueryHookResult = ReturnType<typeof useRequestSendQuery>;
export type RequestSendLazyQueryHookResult = ReturnType<typeof useRequestSendLazyQuery>;
export type RequestSendQueryResult = Apollo.QueryResult<RequestSendQuery, RequestSendQueryVariables>;
export const RegistrationsDocument = gql`
    query Registrations {
  invoice_formats {
    id
    name
  }
  users {
    id
    family_name
    given_name
    family_name_furigana
    given_name_furigana
    email
    is_admin
    employee_code
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
export const SettingsDocument = gql`
    query Settings {
  users {
    id
    family_name
    given_name
    family_name_furigana
    given_name_furigana
    email
    is_admin
    employee_code
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