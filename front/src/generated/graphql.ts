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
  invoice_id: Scalars['String'];
  judgement?: Maybe<Judgement>;
  judgement_id?: Maybe<Scalars['Int']>;
  request?: Maybe<Request>;
  request_id: Scalars['Int'];
  user: User;
  user_id: Scalars['Int'];
};

export type Company = {
  __typename?: 'Company';
  city: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  phone_number: Scalars['String'];
  postal_code: Scalars['String'];
  prefecture?: Maybe<Prefecture>;
  rest_address: Scalars['String'];
};

export type Construction = {
  __typename?: 'Construction';
  code?: Maybe<Scalars['String']>;
  company: Company;
  company_id: Scalars['Int'];
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Invoice = {
  __typename?: 'Invoice';
  billing_date: Scalars['DateTime'];
  company: Company;
  company_id: Scalars['Int'];
  construction?: Maybe<Construction>;
  construction_id?: Maybe<Scalars['Int']>;
  created_at: Scalars['DateTime'];
  created_by: User;
  created_by_id: Scalars['Int'];
  due_date_for_payment: Scalars['DateTime'];
  id: Scalars['ID'];
  payment_amount: Scalars['Float'];
  status: InvoiceStatus;
  updated_at: Scalars['DateTime'];
};

export type InvoiceFormat = {
  __typename?: 'InvoiceFormat';
  company: Company;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type InvoiceFormatElement = {
  __typename?: 'InvoiceFormatElement';
  id: Scalars['ID'];
  label: Scalars['String'];
  order: Scalars['Int'];
  own: Scalars['Boolean'];
};

export type InvoiceFormatLog = {
  __typename?: 'InvoiceFormatLog';
  created_at: Scalars['DateTime'];
  elements: Array<InvoiceFormatElement>;
  id: Scalars['ID'];
  invoiceFormat: InvoiceFormat;
};

export type InvoiceLog = {
  __typename?: 'InvoiceLog';
  body: Array<InvoiceLogElement>;
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  invoice_format_log: InvoiceFormatLog;
};

export type InvoiceLogElement = {
  __typename?: 'InvoiceLogElement';
  elementId: Scalars['String'];
  value: Scalars['String'];
};

export type InvoiceLogElementInput = {
  elementId: Scalars['String'];
  value: Scalars['String'];
};

export type InvoiceStatus =
  | 'completely_approved'
  | 'not_requested'
  | 'rejected'
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
  addInvoiceLog: InvoiceLog;
  addJudgement: Judgement;
  addRequest: Request;
  addRequestNotification: RequestNotification;
  addRequestReceiver: RequestReceiver;
  addUser: User;
  removeComment: Scalars['Boolean'];
  removeCompany: Scalars['Boolean'];
  removeInvoice: Scalars['Boolean'];
  removeInvoiceFormat: Scalars['Boolean'];
  removeInvoiceLog: Scalars['Boolean'];
  removeRequestNotification: Scalars['Boolean'];
  removeRequestReceiver: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
  updateInvoiceLog: InvoiceLog;
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


export type MutationAddInvoiceLogArgs = {
  newInvoiceLog: NewInvoiceLogInputLog;
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
  id: Scalars['String'];
};


export type MutationRemoveInvoiceFormatArgs = {
  id: Scalars['String'];
};


export type MutationRemoveInvoiceLogArgs = {
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


export type MutationUpdateInvoiceLogArgs = {
  input: UpdateInvoiceLogInput;
};

export type NewCommentInput = {
  content: Scalars['String'];
  invoice_id: Scalars['String'];
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

export type NewInvoiceInput = {
  company_id: Scalars['Int'];
  status: Scalars['Int'];
  user_id: Scalars['Int'];
};

export type NewInvoiceLogInputLog = {
  body: Array<InvoiceLogElementInput>;
  invoice_format_log_id: Scalars['String'];
};

export type NewJudgementInput = {
  comment: Scalars['String'];
  request_id: Scalars['Int'];
  type: Scalars['String'];
  user_id: Scalars['Int'];
};

export type NewRequestInput = {
  comment: Scalars['String'];
  invoice_id: Scalars['String'];
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

export type PartnerCompany = {
  __typename?: 'PartnerCompany';
  city: Scalars['String'];
  code: Scalars['String'];
  general_contractor: Company;
  general_contractor_id: Scalars['Float'];
  id: Scalars['Int'];
  name: Scalars['String'];
  phone_number: Scalars['String'];
  postal_code: Scalars['String'];
  prefecture?: Maybe<Prefecture>;
  rest_address: Scalars['String'];
};

export type Prefecture =
  | 'AICHI'
  | 'AKITA'
  | 'AOMORI'
  | 'CHIBA'
  | 'EHIME'
  | 'FUKUI'
  | 'FUKUOKA'
  | 'FUKUSHIMA'
  | 'GIFU'
  | 'GUNMA'
  | 'HIROSHIMA'
  | 'HOKKAIDO'
  | 'HYOGO'
  | 'IBARAKI'
  | 'ISHIKAWA'
  | 'IWATE'
  | 'KAGAWA'
  | 'KAGOSHIMA'
  | 'KANAGAWA'
  | 'KOCHI'
  | 'KUMAMOTO'
  | 'KYOTO'
  | 'MIE'
  | 'MIYAGI'
  | 'MIYAZAKI'
  | 'NAGANO'
  | 'NAGASAKI'
  | 'NARA'
  | 'NIIGATA'
  | 'OITA'
  | 'OKAYAMA'
  | 'OKINAWA'
  | 'OSAKA'
  | 'SAGA'
  | 'SAITAMA'
  | 'SHIGA'
  | 'SHIMANE'
  | 'SHIZUOKA'
  | 'TOCHIGI'
  | 'TOKUSHIMA'
  | 'TOKYO'
  | 'TOTTORI'
  | 'TOYAMA'
  | 'WAKAYAMA'
  | 'YAMAGATA'
  | 'YAMAGUCHI'
  | 'YAMANASHI';

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  companies: Array<Company>;
  getComment: Comment;
  getCompany: Company;
  getInvoice: Invoice;
  getInvoiceFormat: InvoiceFormat;
  getInvoiceFormatElement: InvoiceFormatElement;
  getInvoiceFormatLog: InvoiceFormatLog;
  getInvoiceLog: InvoiceLog;
  getJudgement: Judgement;
  getRequest: Request;
  getRequestNotification: RequestNotification;
  getRequestReceiver: RequestReceiver;
  getUser: User;
  invoiceFormatElements: Array<InvoiceFormatElement>;
  invoiceFormatLogs: Array<InvoiceFormatLog>;
  invoice_formats: Array<InvoiceFormat>;
  invoice_logs: Array<InvoiceLog>;
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
  id: Scalars['String'];
};


export type QueryGetInvoiceFormatArgs = {
  id: Scalars['String'];
};


export type QueryGetInvoiceFormatElementArgs = {
  id: Scalars['String'];
};


export type QueryGetInvoiceFormatLogArgs = {
  id: Scalars['String'];
};


export type QueryGetInvoiceLogArgs = {
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


export type QueryInvoiceFormatElementsArgs = {
  logId: Scalars['String'];
};

export type Request = {
  __typename?: 'Request';
  comments: Array<Comment>;
  company: Company;
  company_id: Scalars['Int'];
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  invoice: Invoice;
  invoice_id: Scalars['String'];
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

export type UpdateInvoiceLogInput = {
  body: Array<InvoiceLogElementInput>;
  id: Scalars['String'];
};

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
  partner_company?: Maybe<PartnerCompany>;
  partner_company_id: Scalars['Int'];
};

export type ApprovalsQueryVariables = Exact<{ [key: string]: never; }>;


export type ApprovalsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, family_name: string, given_name: string, family_name_furigana: string, given_name_furigana: string, email: string, is_admin: boolean, employee_code?: string | null | undefined }>, invoices: Array<{ __typename?: 'Invoice', id: string, created_at: any, created_by_id: number, company_id: number, status: InvoiceStatus }> };

export type RequestSendQueryVariables = Exact<{ [key: string]: never; }>;


export type RequestSendQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, family_name: string, given_name: string, family_name_furigana: string, given_name_furigana: string, email: string, is_admin: boolean, employee_code?: string | null | undefined }> };

export type CreateRequestMutationVariables = Exact<{
  newRequest: NewRequestInput;
}>;


export type CreateRequestMutation = { __typename?: 'Mutation', addRequest: { __typename?: 'Request', id: number, requester: { __typename?: 'User', id: number, given_name: string, family_name: string, email: string, employee_code?: string | null | undefined, company: { __typename?: 'Company', id: number, name: string } } } };

export type InvoiceLogQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type InvoiceLogQuery = { __typename?: 'Query', getInvoiceLog: { __typename?: 'InvoiceLog', id: string, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoice_format_log: { __typename?: 'InvoiceFormatLog', id: string, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, order: number, label: string, own: boolean }> } } };

export type UpdateInvoiceLogMutationVariables = Exact<{
  input: UpdateInvoiceLogInput;
}>;


export type UpdateInvoiceLogMutation = { __typename?: 'Mutation', updateInvoiceLog: { __typename?: 'InvoiceLog', id: string, created_at: any, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoice_format_log: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, label: string, order: number, own: boolean }> } } };

export type IssuesQueryVariables = Exact<{ [key: string]: never; }>;


export type IssuesQuery = { __typename?: 'Query', invoice_logs: Array<{ __typename?: 'InvoiceLog', id: string, created_at: any, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoice_format_log: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, order: number, label: string, own: boolean }> } }> };

export type InvoiceFormatLogsQueryVariables = Exact<{ [key: string]: never; }>;


export type InvoiceFormatLogsQuery = { __typename?: 'Query', invoiceFormatLogs: Array<{ __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', id: string, name: string, company: { __typename?: 'Company', id: number, name: string } } }> };

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
  invoices {
    id
    created_at
    created_by_id
    company_id
    status
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
export const CreateRequestDocument = gql`
    mutation CreateRequest($newRequest: NewRequestInput!) {
  addRequest(newRequest: $newRequest) {
    id
    requester {
      id
      given_name
      family_name
      email
      employee_code
      company {
        id
        name
      }
    }
  }
}
    `;
export type CreateRequestMutationFn = Apollo.MutationFunction<CreateRequestMutation, CreateRequestMutationVariables>;

/**
 * __useCreateRequestMutation__
 *
 * To run a mutation, you first call `useCreateRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestMutation, { data, loading, error }] = useCreateRequestMutation({
 *   variables: {
 *      newRequest: // value for 'newRequest'
 *   },
 * });
 */
export function useCreateRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateRequestMutation, CreateRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRequestMutation, CreateRequestMutationVariables>(CreateRequestDocument, options);
      }
export type CreateRequestMutationHookResult = ReturnType<typeof useCreateRequestMutation>;
export type CreateRequestMutationResult = Apollo.MutationResult<CreateRequestMutation>;
export type CreateRequestMutationOptions = Apollo.BaseMutationOptions<CreateRequestMutation, CreateRequestMutationVariables>;
export const InvoiceLogDocument = gql`
    query InvoiceLog($id: String!) {
  getInvoiceLog(id: $id) {
    id
    body {
      elementId
      value
    }
    invoice_format_log {
      id
      elements {
        id
        order
        label
        own
      }
    }
  }
}
    `;

/**
 * __useInvoiceLogQuery__
 *
 * To run a query within a React component, call `useInvoiceLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoiceLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoiceLogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInvoiceLogQuery(baseOptions: Apollo.QueryHookOptions<InvoiceLogQuery, InvoiceLogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoiceLogQuery, InvoiceLogQueryVariables>(InvoiceLogDocument, options);
      }
export function useInvoiceLogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoiceLogQuery, InvoiceLogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoiceLogQuery, InvoiceLogQueryVariables>(InvoiceLogDocument, options);
        }
export type InvoiceLogQueryHookResult = ReturnType<typeof useInvoiceLogQuery>;
export type InvoiceLogLazyQueryHookResult = ReturnType<typeof useInvoiceLogLazyQuery>;
export type InvoiceLogQueryResult = Apollo.QueryResult<InvoiceLogQuery, InvoiceLogQueryVariables>;
export const UpdateInvoiceLogDocument = gql`
    mutation UpdateInvoiceLog($input: UpdateInvoiceLogInput!) {
  updateInvoiceLog(input: $input) {
    id
    created_at
    body {
      elementId
      value
    }
    invoice_format_log {
      id
      invoiceFormat {
        company {
          name
        }
      }
      elements {
        id
        label
        order
        own
      }
    }
  }
}
    `;
export type UpdateInvoiceLogMutationFn = Apollo.MutationFunction<UpdateInvoiceLogMutation, UpdateInvoiceLogMutationVariables>;

/**
 * __useUpdateInvoiceLogMutation__
 *
 * To run a mutation, you first call `useUpdateInvoiceLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInvoiceLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInvoiceLogMutation, { data, loading, error }] = useUpdateInvoiceLogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInvoiceLogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInvoiceLogMutation, UpdateInvoiceLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInvoiceLogMutation, UpdateInvoiceLogMutationVariables>(UpdateInvoiceLogDocument, options);
      }
export type UpdateInvoiceLogMutationHookResult = ReturnType<typeof useUpdateInvoiceLogMutation>;
export type UpdateInvoiceLogMutationResult = Apollo.MutationResult<UpdateInvoiceLogMutation>;
export type UpdateInvoiceLogMutationOptions = Apollo.BaseMutationOptions<UpdateInvoiceLogMutation, UpdateInvoiceLogMutationVariables>;
export const IssuesDocument = gql`
    query Issues {
  invoice_logs {
    id
    created_at
    body {
      elementId
      value
    }
    invoice_format_log {
      id
      invoiceFormat {
        company {
          name
        }
      }
      elements {
        id
        order
        label
        own
      }
    }
  }
}
    `;

/**
 * __useIssuesQuery__
 *
 * To run a query within a React component, call `useIssuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useIssuesQuery(baseOptions?: Apollo.QueryHookOptions<IssuesQuery, IssuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IssuesQuery, IssuesQueryVariables>(IssuesDocument, options);
      }
export function useIssuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IssuesQuery, IssuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IssuesQuery, IssuesQueryVariables>(IssuesDocument, options);
        }
export type IssuesQueryHookResult = ReturnType<typeof useIssuesQuery>;
export type IssuesLazyQueryHookResult = ReturnType<typeof useIssuesLazyQuery>;
export type IssuesQueryResult = Apollo.QueryResult<IssuesQuery, IssuesQueryVariables>;
export const InvoiceFormatLogsDocument = gql`
    query InvoiceFormatLogs {
  invoiceFormatLogs {
    id
    invoiceFormat {
      id
      name
      company {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useInvoiceFormatLogsQuery__
 *
 * To run a query within a React component, call `useInvoiceFormatLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoiceFormatLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoiceFormatLogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvoiceFormatLogsQuery(baseOptions?: Apollo.QueryHookOptions<InvoiceFormatLogsQuery, InvoiceFormatLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoiceFormatLogsQuery, InvoiceFormatLogsQueryVariables>(InvoiceFormatLogsDocument, options);
      }
export function useInvoiceFormatLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoiceFormatLogsQuery, InvoiceFormatLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoiceFormatLogsQuery, InvoiceFormatLogsQueryVariables>(InvoiceFormatLogsDocument, options);
        }
export type InvoiceFormatLogsQueryHookResult = ReturnType<typeof useInvoiceFormatLogsQuery>;
export type InvoiceFormatLogsLazyQueryHookResult = ReturnType<typeof useInvoiceFormatLogsLazyQuery>;
export type InvoiceFormatLogsQueryResult = Apollo.QueryResult<InvoiceFormatLogsQuery, InvoiceFormatLogsQueryVariables>;
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