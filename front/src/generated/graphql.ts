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
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  invoice: Invoice;
  invoiceId: Scalars['String'];
  judgement?: Maybe<Judgement>;
  judgementId?: Maybe<Scalars['Int']>;
  request?: Maybe<Request>;
  requestId: Scalars['Int'];
  user: User;
  userId: Scalars['ID'];
};

export type Company = {
  __typename?: 'Company';
  city?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  prefecture?: Maybe<Prefecture>;
  restAddress?: Maybe<Scalars['String']>;
};

export type Construction = {
  __typename?: 'Construction';
  code?: Maybe<Scalars['String']>;
  company: Company;
  companyId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ElementValueType =
  | 'date'
  | 'number'
  | 'string';

export type Invoice = {
  __typename?: 'Invoice';
  billingDate?: Maybe<Scalars['DateTime']>;
  company: Company;
  companyId: Scalars['Int'];
  construction?: Maybe<Construction>;
  constructionId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['Int'];
  dueDateForPayment?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  paymentAmount?: Maybe<Scalars['Int']>;
  status: InvoiceStatus;
  updatedAt: Scalars['DateTime'];
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
  valueType: ElementValueType;
};

export type InvoiceFormatLog = {
  __typename?: 'InvoiceFormatLog';
  billingDateId?: Maybe<Scalars['String']>;
  constructionNameId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  elements: Array<InvoiceFormatElement>;
  id: Scalars['ID'];
  invoiceFormat: InvoiceFormat;
  paymentAmountId?: Maybe<Scalars['String']>;
  paymentDeadlineId?: Maybe<Scalars['String']>;
};

export type InvoiceLog = {
  __typename?: 'InvoiceLog';
  body: Array<InvoiceLogElement>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  invoiceFormatLog: InvoiceFormatLog;
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
  | 'completelyApproved'
  | 'notRequested'
  | 'rejected'
  | 'requested';

export type IsRead =
  | 'read'
  | 'unread';

export type Judgement = {
  __typename?: 'Judgement';
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  request: Request;
  requestId: Scalars['Int'];
  type: JudgementType;
  user: User;
  userId: Scalars['ID'];
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
  newInvoiceLog: NewInvoiceLogInput;
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
  invoiceId: Scalars['String'];
  requestId: Scalars['Int'];
  userId: Scalars['ID'];
};

export type NewCompanyInput = {
  name: Scalars['String'];
};

export type NewInvoiceFormatInput = {
  companyId: Scalars['Int'];
  name: Scalars['String'];
};

export type NewInvoiceInput = {
  companyId: Scalars['Int'];
  status: Scalars['Int'];
  userId: Scalars['ID'];
};

export type NewInvoiceLogInput = {
  body: Array<InvoiceLogElementInput>;
  invoiceFormatLogId: Scalars['String'];
};

export type NewJudgementInput = {
  comment: Scalars['String'];
  requestId: Scalars['Int'];
  type: Scalars['String'];
  userId: Scalars['ID'];
};

export type NewRequestInput = {
  comment: Scalars['String'];
  invoiceId: Scalars['String'];
  requestReceiverIds: Array<Scalars['ID']>;
  requesterId: Scalars['ID'];
};

export type NewRequestNotificationInput = {
  isRead: Scalars['String'];
  requestReceiverId: Scalars['Int'];
  type: Scalars['String'];
  userId: Scalars['ID'];
};

export type NewRequestReceiverInput = {
  receiverId: Scalars['ID'];
  requestId: Scalars['Int'];
};

export type NewUserInput = {
  companyId: Scalars['Int'];
  confirmationCode: Scalars['String'];
  email: Scalars['String'];
  employeeCode?: InputMaybe<Scalars['String']>;
  familyName: Scalars['String'];
  familyNameFurigana: Scalars['String'];
  givenName: Scalars['String'];
  givenNameFurigana: Scalars['String'];
  isAdmin: Scalars['Boolean'];
};

export type NotificationRequestType =
  | 'requestAccepted'
  | 'requestComing'
  | 'requestDeclined';

export type Prefecture =
  | 'aichi'
  | 'akita'
  | 'aomori'
  | 'chiba'
  | 'ehime'
  | 'fukui'
  | 'fukuoka'
  | 'fukushima'
  | 'gifu'
  | 'gunma'
  | 'hiroshima'
  | 'hokkaido'
  | 'hyogo'
  | 'ibaraki'
  | 'ishikawa'
  | 'iwate'
  | 'kagawa'
  | 'kagoshima'
  | 'kanagawa'
  | 'kochi'
  | 'kumamoto'
  | 'kyoto'
  | 'mie'
  | 'miyagi'
  | 'miyazaki'
  | 'nagano'
  | 'nagasaki'
  | 'nara'
  | 'niigata'
  | 'oita'
  | 'okayama'
  | 'okinawa'
  | 'osaka'
  | 'saga'
  | 'saitama'
  | 'shiga'
  | 'shimane'
  | 'shizuoka'
  | 'tochigi'
  | 'tokushima'
  | 'tokyo'
  | 'tottori'
  | 'toyama'
  | 'wakayama'
  | 'yamagata'
  | 'yamaguchi'
  | 'yamanashi';

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  companies: Array<Company>;
  getAnyCompany: Company;
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
  invoiceFormats: Array<InvoiceFormat>;
  invoiceLogs: Array<InvoiceLog>;
  invoices: Array<Invoice>;
  judgements: Array<Judgement>;
  requestNotifications: Array<RequestNotification>;
  requestReceivers: Array<RequestReceiver>;
  requests: Array<Request>;
  users: Array<User>;
};


export type QueryGetAnyCompanyArgs = {
  id: Scalars['Int'];
};


export type QueryGetCommentArgs = {
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
  id: Scalars['ID'];
};


export type QueryInvoiceFormatElementsArgs = {
  logId: Scalars['String'];
};

export type Request = {
  __typename?: 'Request';
  comments: Array<Comment>;
  company: Company;
  companyId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  invoice: Invoice;
  invoiceId: Scalars['String'];
  judgements: Array<Judgement>;
  requestReceivers: Array<RequestReceiver>;
  requester: User;
  requesterId: Scalars['ID'];
  status: RequestStatus;
};

export type RequestNotification = {
  __typename?: 'RequestNotification';
  id: Scalars['Int'];
  isRead: IsRead;
  requestReceiver: RequestReceiver;
  requestReceiverId: Scalars['Int'];
  type: NotificationRequestType;
  user: User;
  userId: Scalars['ID'];
};

export type RequestReceiver = {
  __typename?: 'RequestReceiver';
  id: Scalars['Int'];
  receiver: User;
  receiverId: Scalars['ID'];
  request: Request;
  requestId: Scalars['Int'];
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
  companyId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  employeeCode?: Maybe<Scalars['String']>;
  familyName: Scalars['String'];
  familyNameFurigana: Scalars['String'];
  givenName: Scalars['String'];
  givenNameFurigana: Scalars['String'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
};

export type ApprovalsQueryVariables = Exact<{ [key: string]: never; }>;


export type ApprovalsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode?: string | null | undefined }>, invoices: Array<{ __typename?: 'Invoice', id: string, createdAt: any, createdById: number, companyId: number, status: InvoiceStatus }> };

export type InvoiceFormatLogsQueryVariables = Exact<{ [key: string]: never; }>;


export type InvoiceFormatLogsQuery = { __typename?: 'Query', invoiceFormatLogs: Array<{ __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', id: string, name: string, company: { __typename?: 'Company', id: number, name: string } } }> };

export type CreateInvoiceLogMutationVariables = Exact<{
  input: NewInvoiceLogInput;
}>;


export type CreateInvoiceLogMutation = { __typename?: 'Mutation', addInvoiceLog: { __typename?: 'InvoiceLog', id: string } };

export type RequestSendQueryVariables = Exact<{ [key: string]: never; }>;


export type RequestSendQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode?: string | null | undefined }> };

export type CreateRequestMutationVariables = Exact<{
  newRequest: NewRequestInput;
}>;


export type CreateRequestMutation = { __typename?: 'Mutation', addRequest: { __typename?: 'Request', id: number, requester: { __typename?: 'User', id: string, givenName: string, familyName: string, email: string, employeeCode?: string | null | undefined, company: { __typename?: 'Company', id: number, name: string } } } };

export type GetRequestQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetRequestQuery = { __typename?: 'Query', getRequest: { __typename?: 'Request', id: number, requester: { __typename?: 'User', id: string, givenName: string, familyName: string }, comments: Array<{ __typename?: 'Comment', id: number, content: string, user: { __typename?: 'User', id: string, givenName: string, familyName: string } }> } };

export type CreateJudgementMutationVariables = Exact<{
  newJudgement: NewJudgementInput;
}>;


export type CreateJudgementMutation = { __typename?: 'Mutation', addJudgement: { __typename?: 'Judgement', id: number, type: JudgementType, user: { __typename?: 'User', id: string }, request: { __typename?: 'Request', id: number } } };

export type InvoiceLogQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type InvoiceLogQuery = { __typename?: 'Query', getInvoiceLog: { __typename?: 'InvoiceLog', id: string, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, order: number, label: string, valueType: ElementValueType, own: boolean }> } } };

export type UpdateInvoiceLogMutationVariables = Exact<{
  input: UpdateInvoiceLogInput;
}>;


export type UpdateInvoiceLogMutation = { __typename?: 'Mutation', updateInvoiceLog: { __typename?: 'InvoiceLog', id: string, createdAt: any, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, order: number, label: string, valueType: ElementValueType, own: boolean }> } } };

export type IssuesQueryVariables = Exact<{ [key: string]: never; }>;


export type IssuesQuery = { __typename?: 'Query', invoiceLogs: Array<{ __typename?: 'InvoiceLog', id: string, createdAt: any, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, constructionNameId?: string | null | undefined, billingDateId?: string | null | undefined, paymentDeadlineId?: string | null | undefined, paymentAmountId?: string | null | undefined, invoiceFormat: { __typename?: 'InvoiceFormat', company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, order: number, label: string, valueType: ElementValueType, own: boolean }> } }> };

export type RegistrationsQueryVariables = Exact<{ [key: string]: never; }>;


export type RegistrationsQuery = { __typename?: 'Query', invoiceFormats: Array<{ __typename?: 'InvoiceFormat', id: string, name: string }>, users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode?: string | null | undefined }> };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode?: string | null | undefined }> };


export const ApprovalsDocument = gql`
    query Approvals {
  users {
    id
    familyName
    givenName
    familyNameFurigana
    givenNameFurigana
    email
    isAdmin
    employeeCode
  }
  invoices {
    id
    createdAt
    createdById
    companyId
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
export const CreateInvoiceLogDocument = gql`
    mutation CreateInvoiceLog($input: NewInvoiceLogInput!) {
  addInvoiceLog(newInvoiceLog: $input) {
    id
  }
}
    `;
export type CreateInvoiceLogMutationFn = Apollo.MutationFunction<CreateInvoiceLogMutation, CreateInvoiceLogMutationVariables>;

/**
 * __useCreateInvoiceLogMutation__
 *
 * To run a mutation, you first call `useCreateInvoiceLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvoiceLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvoiceLogMutation, { data, loading, error }] = useCreateInvoiceLogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInvoiceLogMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvoiceLogMutation, CreateInvoiceLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvoiceLogMutation, CreateInvoiceLogMutationVariables>(CreateInvoiceLogDocument, options);
      }
export type CreateInvoiceLogMutationHookResult = ReturnType<typeof useCreateInvoiceLogMutation>;
export type CreateInvoiceLogMutationResult = Apollo.MutationResult<CreateInvoiceLogMutation>;
export type CreateInvoiceLogMutationOptions = Apollo.BaseMutationOptions<CreateInvoiceLogMutation, CreateInvoiceLogMutationVariables>;
export const RequestSendDocument = gql`
    query RequestSend {
  users {
    id
    familyName
    givenName
    familyNameFurigana
    givenNameFurigana
    email
    isAdmin
    employeeCode
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
      givenName
      familyName
      email
      employeeCode
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
export const GetRequestDocument = gql`
    query GetRequest($id: Int!) {
  getRequest(id: $id) {
    id
    requester {
      id
      givenName
      familyName
    }
    comments {
      id
      content
      user {
        id
        givenName
        familyName
      }
    }
  }
}
    `;

/**
 * __useGetRequestQuery__
 *
 * To run a query within a React component, call `useGetRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRequestQuery(baseOptions: Apollo.QueryHookOptions<GetRequestQuery, GetRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRequestQuery, GetRequestQueryVariables>(GetRequestDocument, options);
      }
export function useGetRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestQuery, GetRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRequestQuery, GetRequestQueryVariables>(GetRequestDocument, options);
        }
export type GetRequestQueryHookResult = ReturnType<typeof useGetRequestQuery>;
export type GetRequestLazyQueryHookResult = ReturnType<typeof useGetRequestLazyQuery>;
export type GetRequestQueryResult = Apollo.QueryResult<GetRequestQuery, GetRequestQueryVariables>;
export const CreateJudgementDocument = gql`
    mutation CreateJudgement($newJudgement: NewJudgementInput!) {
  addJudgement(newJudgement: $newJudgement) {
    id
    type
    user {
      id
    }
    request {
      id
    }
  }
}
    `;
export type CreateJudgementMutationFn = Apollo.MutationFunction<CreateJudgementMutation, CreateJudgementMutationVariables>;

/**
 * __useCreateJudgementMutation__
 *
 * To run a mutation, you first call `useCreateJudgementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJudgementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJudgementMutation, { data, loading, error }] = useCreateJudgementMutation({
 *   variables: {
 *      newJudgement: // value for 'newJudgement'
 *   },
 * });
 */
export function useCreateJudgementMutation(baseOptions?: Apollo.MutationHookOptions<CreateJudgementMutation, CreateJudgementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJudgementMutation, CreateJudgementMutationVariables>(CreateJudgementDocument, options);
      }
export type CreateJudgementMutationHookResult = ReturnType<typeof useCreateJudgementMutation>;
export type CreateJudgementMutationResult = Apollo.MutationResult<CreateJudgementMutation>;
export type CreateJudgementMutationOptions = Apollo.BaseMutationOptions<CreateJudgementMutation, CreateJudgementMutationVariables>;
export const InvoiceLogDocument = gql`
    query InvoiceLog($id: String!) {
  getInvoiceLog(id: $id) {
    id
    body {
      elementId
      value
    }
    invoiceFormatLog {
      id
      elements {
        id
        order
        label
        valueType
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
    createdAt
    body {
      elementId
      value
    }
    invoiceFormatLog {
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
        valueType
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
  invoiceLogs {
    id
    createdAt
    body {
      elementId
      value
    }
    invoiceFormatLog {
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
        valueType
        own
      }
      constructionNameId
      billingDateId
      paymentDeadlineId
      paymentAmountId
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
export const RegistrationsDocument = gql`
    query Registrations {
  invoiceFormats {
    id
    name
  }
  users {
    id
    familyName
    givenName
    familyNameFurigana
    givenNameFurigana
    email
    isAdmin
    employeeCode
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
    familyName
    givenName
    familyNameFurigana
    givenNameFurigana
    email
    isAdmin
    employeeCode
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