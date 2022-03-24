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
  userId: Scalars['Int'];
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

export type DetailElementValueType =
  | 'date'
  | 'number'
  | 'string';

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

export type InvoiceFormatDetailElement = {
  __typename?: 'InvoiceFormatDetailElement';
  id: Scalars['ID'];
  label: Scalars['String'];
  order: Scalars['Int'];
  own: Scalars['Boolean'];
  valueType: DetailElementValueType;
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
  detailElements: Array<InvoiceFormatDetailElement>;
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
  detail: Array<Array<InvoiceLogDetailElement>>;
  id: Scalars['String'];
  invoiceFormatLog: InvoiceFormatLog;
};

export type InvoiceLogDetailElement = {
  __typename?: 'InvoiceLogDetailElement';
  elementId: Scalars['String'];
  value: Scalars['String'];
};

export type InvoiceLogDetailElementInput = {
  elementId: Scalars['String'];
  value: Scalars['String'];
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
  userId: Scalars['Int'];
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
  userId: Scalars['Int'];
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
  userId: Scalars['Int'];
};

export type NewInvoiceLogInput = {
  body: Array<InvoiceLogElementInput>;
  invoiceFormatLogId: Scalars['String'];
};

export type NewJudgementInput = {
  comment: Scalars['String'];
  requestId: Scalars['Int'];
  type: Scalars['String'];
  userId: Scalars['Int'];
};

export type NewRequestInput = {
  comment: Scalars['String'];
  invoiceId: Scalars['String'];
  requestReceiverIds: Array<Scalars['Int']>;
  requesterId: Scalars['Int'];
};

export type NewRequestNotificationInput = {
  isRead: Scalars['String'];
  requestReceiverId: Scalars['Int'];
  type: Scalars['String'];
  userId: Scalars['Int'];
};

export type NewRequestReceiverInput = {
  receiverId: Scalars['Int'];
  requestId: Scalars['Int'];
};

export type NewUserInput = {
  companyId: Scalars['Int'];
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
  getComment: Comment;
  getCompany: Company;
  getInvoice: Invoice;
  getInvoiceFormat: InvoiceFormat;
  getInvoiceFormatDetailElement: InvoiceFormatDetailElement;
  getInvoiceFormatElement: InvoiceFormatElement;
  getInvoiceFormatLog: InvoiceFormatLog;
  getInvoiceLog: InvoiceLog;
  getJudgement: Judgement;
  getRequest: Request;
  getRequestNotification: RequestNotification;
  getRequestReceiver: RequestReceiver;
  getUser: User;
  invoiceFormatDetailElements: Array<InvoiceFormatDetailElement>;
  invoiceFormatElements: Array<InvoiceFormatElement>;
  invoiceFormatLogs: Array<InvoiceFormatLog>;
  invoiceFormats: Array<InvoiceFormat>;
  invoiceLogs: Array<InvoiceLog>;
  invoices: Array<Invoice>;
  judgements: Array<Judgement>;
  notRequestedInvoices: Array<Invoice>;
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


export type QueryGetInvoiceFormatDetailElementArgs = {
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


export type QueryInvoiceFormatDetailElementsArgs = {
  logId: Scalars['String'];
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
  requesterId: Scalars['Int'];
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
  userId: Scalars['Int'];
};

export type RequestReceiver = {
  __typename?: 'RequestReceiver';
  id: Scalars['Int'];
  receiver: User;
  receiverId: Scalars['Int'];
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
  id: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
};

export type ApprovalsQueryVariables = Exact<{ [key: string]: never; }>;


export type ApprovalsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode?: string | null | undefined }>, invoices: Array<{ __typename?: 'Invoice', id: string, createdAt: any, createdById: number, companyId: number, status: InvoiceStatus }> };

export type FormatsQueryVariables = Exact<{ [key: string]: never; }>;


export type FormatsQuery = { __typename?: 'Query', invoiceFormatLogs: Array<{ __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', id: string, name: string, company: { __typename?: 'Company', id: number, name: string } } }> };

export type FormatsCreateInvoiceLogMutationVariables = Exact<{
  input: NewInvoiceLogInput;
}>;


export type FormatsCreateInvoiceLogMutation = { __typename?: 'Mutation', addInvoiceLog: { __typename?: 'InvoiceLog', id: string } };

export type InvoiceIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type InvoiceIdQuery = { __typename?: 'Query', getInvoice: { __typename?: 'Invoice', id: string, billingDate?: any | null | undefined, dueDateForPayment?: any | null | undefined, paymentAmount?: number | null | undefined, status: InvoiceStatus, createdBy: { __typename?: 'User', id: number, familyName: string, givenName: string }, construction?: { __typename?: 'Construction', id: number, name: string } | null | undefined, company: { __typename?: 'Company', id: number, name: string } }, getInvoiceLog: { __typename?: 'InvoiceLog', id: string, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, detail: Array<Array<{ __typename?: 'InvoiceLogDetailElement', elementId: string, value: string }>>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', name: string, company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, label: string, order: number, own: boolean, valueType: ElementValueType }>, detailElements: Array<{ __typename?: 'InvoiceFormatDetailElement', id: string, order: number, label: string, valueType: DetailElementValueType, own: boolean }> } }, users: Array<{ __typename?: 'User', id: number, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode?: string | null | undefined }> };

export type InvoiceIdCreateApprovalRequestMutationVariables = Exact<{
  newRequest: NewRequestInput;
}>;


export type InvoiceIdCreateApprovalRequestMutation = { __typename?: 'Mutation', addRequest: { __typename?: 'Request', id: number, requester: { __typename?: 'User', id: number, givenName: string, familyName: string, company: { __typename?: 'Company', id: number, name: string } } } };

export type InvoicesIdRequestQueryVariables = Exact<{ [key: string]: never; }>;


export type InvoicesIdRequestQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode?: string | null | undefined }> };

export type InvoicesIdRequestCreateRequestMutationVariables = Exact<{
  newRequest: NewRequestInput;
}>;


export type InvoicesIdRequestCreateRequestMutation = { __typename?: 'Mutation', addRequest: { __typename?: 'Request', id: number, requester: { __typename?: 'User', id: number, givenName: string, familyName: string, email: string, employeeCode?: string | null | undefined, company: { __typename?: 'Company', id: number, name: string } } } };

export type InvoicesIdRequestsIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InvoicesIdRequestsIdQuery = { __typename?: 'Query', getRequest: { __typename?: 'Request', id: number, requester: { __typename?: 'User', id: number, givenName: string, familyName: string }, comments: Array<{ __typename?: 'Comment', id: number, content: string, user: { __typename?: 'User', id: number, givenName: string, familyName: string } }> } };

export type CreateJudgementMutationVariables = Exact<{
  newJudgement: NewJudgementInput;
}>;


export type CreateJudgementMutation = { __typename?: 'Mutation', addJudgement: { __typename?: 'Judgement', id: number, type: JudgementType, user: { __typename?: 'User', id: number }, request: { __typename?: 'Request', id: number } } };

export type IssueIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IssueIdQuery = { __typename?: 'Query', getInvoiceLog: { __typename?: 'InvoiceLog', id: string, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, detail: Array<Array<{ __typename?: 'InvoiceLogDetailElement', elementId: string, value: string }>>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', name: string, company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, label: string, order: number, own: boolean, valueType: ElementValueType }>, detailElements: Array<{ __typename?: 'InvoiceFormatDetailElement', id: string, order: number, label: string, valueType: DetailElementValueType, own: boolean }> } } };

export type IssueIdUpdateInvoiceLogMutationVariables = Exact<{
  input: UpdateInvoiceLogInput;
}>;


export type IssueIdUpdateInvoiceLogMutation = { __typename?: 'Mutation', updateInvoiceLog: { __typename?: 'InvoiceLog', id: string, createdAt: any, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, order: number, label: string, valueType: ElementValueType, own: boolean }> } } };

export type IssueIdViewQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IssueIdViewQuery = { __typename?: 'Query', getInvoiceLog: { __typename?: 'InvoiceLog', id: string, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, detail: Array<Array<{ __typename?: 'InvoiceLogDetailElement', elementId: string, value: string }>>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', name: string, company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, label: string, order: number, own: boolean, valueType: ElementValueType }>, detailElements: Array<{ __typename?: 'InvoiceFormatDetailElement', id: string, order: number, label: string, valueType: DetailElementValueType, own: boolean }> } } };

export type IssuesQueryVariables = Exact<{ [key: string]: never; }>;


export type IssuesQuery = { __typename?: 'Query', invoiceLogs: Array<{ __typename?: 'InvoiceLog', id: string, createdAt: any, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, constructionNameId?: string | null | undefined, billingDateId?: string | null | undefined, paymentDeadlineId?: string | null | undefined, paymentAmountId?: string | null | undefined, invoiceFormat: { __typename?: 'InvoiceFormat', company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, order: number, label: string, valueType: ElementValueType, own: boolean }> } }> };

export type ReceiptsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReceiptsQuery = { __typename?: 'Query', notRequestedInvoices: Array<{ __typename?: 'Invoice', id: string, billingDate?: any | null | undefined, dueDateForPayment?: any | null | undefined, paymentAmount?: number | null | undefined, status: InvoiceStatus, construction?: { __typename?: 'Construction', id: number, name: string } | null | undefined, company: { __typename?: 'Company', id: number, name: string } }> };

export type RegistrationsQueryVariables = Exact<{ [key: string]: never; }>;


export type RegistrationsQuery = { __typename?: 'Query', invoiceFormats: Array<{ __typename?: 'InvoiceFormat', id: string, name: string }>, users: Array<{ __typename?: 'User', id: number, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode?: string | null | undefined }> };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode?: string | null | undefined }> };


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
export const FormatsDocument = gql`
    query Formats {
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
 * __useFormatsQuery__
 *
 * To run a query within a React component, call `useFormatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFormatsQuery(baseOptions?: Apollo.QueryHookOptions<FormatsQuery, FormatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FormatsQuery, FormatsQueryVariables>(FormatsDocument, options);
      }
export function useFormatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormatsQuery, FormatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FormatsQuery, FormatsQueryVariables>(FormatsDocument, options);
        }
export type FormatsQueryHookResult = ReturnType<typeof useFormatsQuery>;
export type FormatsLazyQueryHookResult = ReturnType<typeof useFormatsLazyQuery>;
export type FormatsQueryResult = Apollo.QueryResult<FormatsQuery, FormatsQueryVariables>;
export const FormatsCreateInvoiceLogDocument = gql`
    mutation FormatsCreateInvoiceLog($input: NewInvoiceLogInput!) {
  addInvoiceLog(newInvoiceLog: $input) {
    id
  }
}
    `;
export type FormatsCreateInvoiceLogMutationFn = Apollo.MutationFunction<FormatsCreateInvoiceLogMutation, FormatsCreateInvoiceLogMutationVariables>;

/**
 * __useFormatsCreateInvoiceLogMutation__
 *
 * To run a mutation, you first call `useFormatsCreateInvoiceLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFormatsCreateInvoiceLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [formatsCreateInvoiceLogMutation, { data, loading, error }] = useFormatsCreateInvoiceLogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFormatsCreateInvoiceLogMutation(baseOptions?: Apollo.MutationHookOptions<FormatsCreateInvoiceLogMutation, FormatsCreateInvoiceLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FormatsCreateInvoiceLogMutation, FormatsCreateInvoiceLogMutationVariables>(FormatsCreateInvoiceLogDocument, options);
      }
export type FormatsCreateInvoiceLogMutationHookResult = ReturnType<typeof useFormatsCreateInvoiceLogMutation>;
export type FormatsCreateInvoiceLogMutationResult = Apollo.MutationResult<FormatsCreateInvoiceLogMutation>;
export type FormatsCreateInvoiceLogMutationOptions = Apollo.BaseMutationOptions<FormatsCreateInvoiceLogMutation, FormatsCreateInvoiceLogMutationVariables>;
export const InvoiceIdDocument = gql`
    query InvoiceId($id: String!) {
  getInvoice(id: $id) {
    id
    billingDate
    dueDateForPayment
    paymentAmount
    status
    createdBy {
      id
      familyName
      givenName
    }
    construction {
      id
      name
    }
    company {
      id
      name
    }
  }
  getInvoiceLog(id: "fd4aebf6-559f-4a21-b655-b5483a9a0fab") {
    id
    body {
      elementId
      value
    }
    detail {
      elementId
      value
    }
    invoiceFormatLog {
      id
      invoiceFormat {
        name
        company {
          name
        }
      }
      elements {
        id
        label
        order
        own
        valueType
      }
      detailElements {
        id
        order
        label
        valueType
        own
      }
    }
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
 * __useInvoiceIdQuery__
 *
 * To run a query within a React component, call `useInvoiceIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoiceIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoiceIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInvoiceIdQuery(baseOptions: Apollo.QueryHookOptions<InvoiceIdQuery, InvoiceIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoiceIdQuery, InvoiceIdQueryVariables>(InvoiceIdDocument, options);
      }
export function useInvoiceIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoiceIdQuery, InvoiceIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoiceIdQuery, InvoiceIdQueryVariables>(InvoiceIdDocument, options);
        }
export type InvoiceIdQueryHookResult = ReturnType<typeof useInvoiceIdQuery>;
export type InvoiceIdLazyQueryHookResult = ReturnType<typeof useInvoiceIdLazyQuery>;
export type InvoiceIdQueryResult = Apollo.QueryResult<InvoiceIdQuery, InvoiceIdQueryVariables>;
export const InvoiceIdCreateApprovalRequestDocument = gql`
    mutation InvoiceIdCreateApprovalRequest($newRequest: NewRequestInput!) {
  addRequest(newRequest: $newRequest) {
    id
    requester {
      id
      givenName
      familyName
      company {
        id
        name
      }
    }
  }
}
    `;
export type InvoiceIdCreateApprovalRequestMutationFn = Apollo.MutationFunction<InvoiceIdCreateApprovalRequestMutation, InvoiceIdCreateApprovalRequestMutationVariables>;

/**
 * __useInvoiceIdCreateApprovalRequestMutation__
 *
 * To run a mutation, you first call `useInvoiceIdCreateApprovalRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvoiceIdCreateApprovalRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invoiceIdCreateApprovalRequestMutation, { data, loading, error }] = useInvoiceIdCreateApprovalRequestMutation({
 *   variables: {
 *      newRequest: // value for 'newRequest'
 *   },
 * });
 */
export function useInvoiceIdCreateApprovalRequestMutation(baseOptions?: Apollo.MutationHookOptions<InvoiceIdCreateApprovalRequestMutation, InvoiceIdCreateApprovalRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InvoiceIdCreateApprovalRequestMutation, InvoiceIdCreateApprovalRequestMutationVariables>(InvoiceIdCreateApprovalRequestDocument, options);
      }
export type InvoiceIdCreateApprovalRequestMutationHookResult = ReturnType<typeof useInvoiceIdCreateApprovalRequestMutation>;
export type InvoiceIdCreateApprovalRequestMutationResult = Apollo.MutationResult<InvoiceIdCreateApprovalRequestMutation>;
export type InvoiceIdCreateApprovalRequestMutationOptions = Apollo.BaseMutationOptions<InvoiceIdCreateApprovalRequestMutation, InvoiceIdCreateApprovalRequestMutationVariables>;
export const InvoicesIdRequestDocument = gql`
    query InvoicesIdRequest {
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
 * __useInvoicesIdRequestQuery__
 *
 * To run a query within a React component, call `useInvoicesIdRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoicesIdRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoicesIdRequestQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvoicesIdRequestQuery(baseOptions?: Apollo.QueryHookOptions<InvoicesIdRequestQuery, InvoicesIdRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoicesIdRequestQuery, InvoicesIdRequestQueryVariables>(InvoicesIdRequestDocument, options);
      }
export function useInvoicesIdRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoicesIdRequestQuery, InvoicesIdRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoicesIdRequestQuery, InvoicesIdRequestQueryVariables>(InvoicesIdRequestDocument, options);
        }
export type InvoicesIdRequestQueryHookResult = ReturnType<typeof useInvoicesIdRequestQuery>;
export type InvoicesIdRequestLazyQueryHookResult = ReturnType<typeof useInvoicesIdRequestLazyQuery>;
export type InvoicesIdRequestQueryResult = Apollo.QueryResult<InvoicesIdRequestQuery, InvoicesIdRequestQueryVariables>;
export const InvoicesIdRequestCreateRequestDocument = gql`
    mutation InvoicesIdRequestCreateRequest($newRequest: NewRequestInput!) {
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
export type InvoicesIdRequestCreateRequestMutationFn = Apollo.MutationFunction<InvoicesIdRequestCreateRequestMutation, InvoicesIdRequestCreateRequestMutationVariables>;

/**
 * __useInvoicesIdRequestCreateRequestMutation__
 *
 * To run a mutation, you first call `useInvoicesIdRequestCreateRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvoicesIdRequestCreateRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invoicesIdRequestCreateRequestMutation, { data, loading, error }] = useInvoicesIdRequestCreateRequestMutation({
 *   variables: {
 *      newRequest: // value for 'newRequest'
 *   },
 * });
 */
export function useInvoicesIdRequestCreateRequestMutation(baseOptions?: Apollo.MutationHookOptions<InvoicesIdRequestCreateRequestMutation, InvoicesIdRequestCreateRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InvoicesIdRequestCreateRequestMutation, InvoicesIdRequestCreateRequestMutationVariables>(InvoicesIdRequestCreateRequestDocument, options);
      }
export type InvoicesIdRequestCreateRequestMutationHookResult = ReturnType<typeof useInvoicesIdRequestCreateRequestMutation>;
export type InvoicesIdRequestCreateRequestMutationResult = Apollo.MutationResult<InvoicesIdRequestCreateRequestMutation>;
export type InvoicesIdRequestCreateRequestMutationOptions = Apollo.BaseMutationOptions<InvoicesIdRequestCreateRequestMutation, InvoicesIdRequestCreateRequestMutationVariables>;
export const InvoicesIdRequestsIdDocument = gql`
    query InvoicesIdRequestsId($id: Int!) {
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
 * __useInvoicesIdRequestsIdQuery__
 *
 * To run a query within a React component, call `useInvoicesIdRequestsIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoicesIdRequestsIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoicesIdRequestsIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInvoicesIdRequestsIdQuery(baseOptions: Apollo.QueryHookOptions<InvoicesIdRequestsIdQuery, InvoicesIdRequestsIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoicesIdRequestsIdQuery, InvoicesIdRequestsIdQueryVariables>(InvoicesIdRequestsIdDocument, options);
      }
export function useInvoicesIdRequestsIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoicesIdRequestsIdQuery, InvoicesIdRequestsIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoicesIdRequestsIdQuery, InvoicesIdRequestsIdQueryVariables>(InvoicesIdRequestsIdDocument, options);
        }
export type InvoicesIdRequestsIdQueryHookResult = ReturnType<typeof useInvoicesIdRequestsIdQuery>;
export type InvoicesIdRequestsIdLazyQueryHookResult = ReturnType<typeof useInvoicesIdRequestsIdLazyQuery>;
export type InvoicesIdRequestsIdQueryResult = Apollo.QueryResult<InvoicesIdRequestsIdQuery, InvoicesIdRequestsIdQueryVariables>;
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
export const IssueIdDocument = gql`
    query IssueId($id: String!) {
  getInvoiceLog(id: $id) {
    id
    body {
      elementId
      value
    }
    detail {
      elementId
      value
    }
    invoiceFormatLog {
      id
      invoiceFormat {
        name
        company {
          name
        }
      }
      elements {
        id
        label
        order
        own
        valueType
      }
      detailElements {
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
 * __useIssueIdQuery__
 *
 * To run a query within a React component, call `useIssueIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssueIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssueIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIssueIdQuery(baseOptions: Apollo.QueryHookOptions<IssueIdQuery, IssueIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IssueIdQuery, IssueIdQueryVariables>(IssueIdDocument, options);
      }
export function useIssueIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IssueIdQuery, IssueIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IssueIdQuery, IssueIdQueryVariables>(IssueIdDocument, options);
        }
export type IssueIdQueryHookResult = ReturnType<typeof useIssueIdQuery>;
export type IssueIdLazyQueryHookResult = ReturnType<typeof useIssueIdLazyQuery>;
export type IssueIdQueryResult = Apollo.QueryResult<IssueIdQuery, IssueIdQueryVariables>;
export const IssueIdUpdateInvoiceLogDocument = gql`
    mutation IssueIdUpdateInvoiceLog($input: UpdateInvoiceLogInput!) {
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
export type IssueIdUpdateInvoiceLogMutationFn = Apollo.MutationFunction<IssueIdUpdateInvoiceLogMutation, IssueIdUpdateInvoiceLogMutationVariables>;

/**
 * __useIssueIdUpdateInvoiceLogMutation__
 *
 * To run a mutation, you first call `useIssueIdUpdateInvoiceLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIssueIdUpdateInvoiceLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [issueIdUpdateInvoiceLogMutation, { data, loading, error }] = useIssueIdUpdateInvoiceLogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIssueIdUpdateInvoiceLogMutation(baseOptions?: Apollo.MutationHookOptions<IssueIdUpdateInvoiceLogMutation, IssueIdUpdateInvoiceLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IssueIdUpdateInvoiceLogMutation, IssueIdUpdateInvoiceLogMutationVariables>(IssueIdUpdateInvoiceLogDocument, options);
      }
export type IssueIdUpdateInvoiceLogMutationHookResult = ReturnType<typeof useIssueIdUpdateInvoiceLogMutation>;
export type IssueIdUpdateInvoiceLogMutationResult = Apollo.MutationResult<IssueIdUpdateInvoiceLogMutation>;
export type IssueIdUpdateInvoiceLogMutationOptions = Apollo.BaseMutationOptions<IssueIdUpdateInvoiceLogMutation, IssueIdUpdateInvoiceLogMutationVariables>;
export const IssueIdViewDocument = gql`
    query IssueIdView($id: String!) {
  getInvoiceLog(id: $id) {
    id
    body {
      elementId
      value
    }
    detail {
      elementId
      value
    }
    invoiceFormatLog {
      id
      invoiceFormat {
        name
        company {
          name
        }
      }
      elements {
        id
        label
        order
        own
        valueType
      }
      detailElements {
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
 * __useIssueIdViewQuery__
 *
 * To run a query within a React component, call `useIssueIdViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssueIdViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssueIdViewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIssueIdViewQuery(baseOptions: Apollo.QueryHookOptions<IssueIdViewQuery, IssueIdViewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IssueIdViewQuery, IssueIdViewQueryVariables>(IssueIdViewDocument, options);
      }
export function useIssueIdViewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IssueIdViewQuery, IssueIdViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IssueIdViewQuery, IssueIdViewQueryVariables>(IssueIdViewDocument, options);
        }
export type IssueIdViewQueryHookResult = ReturnType<typeof useIssueIdViewQuery>;
export type IssueIdViewLazyQueryHookResult = ReturnType<typeof useIssueIdViewLazyQuery>;
export type IssueIdViewQueryResult = Apollo.QueryResult<IssueIdViewQuery, IssueIdViewQueryVariables>;
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
export const ReceiptsDocument = gql`
    query Receipts {
  notRequestedInvoices {
    id
    billingDate
    dueDateForPayment
    paymentAmount
    status
    construction {
      id
      name
    }
    company {
      id
      name
    }
  }
}
    `;

/**
 * __useReceiptsQuery__
 *
 * To run a query within a React component, call `useReceiptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptsQuery({
 *   variables: {
 *   },
 * });
 */
export function useReceiptsQuery(baseOptions?: Apollo.QueryHookOptions<ReceiptsQuery, ReceiptsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReceiptsQuery, ReceiptsQueryVariables>(ReceiptsDocument, options);
      }
export function useReceiptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceiptsQuery, ReceiptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReceiptsQuery, ReceiptsQueryVariables>(ReceiptsDocument, options);
        }
export type ReceiptsQueryHookResult = ReturnType<typeof useReceiptsQuery>;
export type ReceiptsLazyQueryHookResult = ReturnType<typeof useReceiptsLazyQuery>;
export type ReceiptsQueryResult = Apollo.QueryResult<ReceiptsQuery, ReceiptsQueryVariables>;
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