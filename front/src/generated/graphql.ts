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

export type ApproveInvoiceInput = {
  comment: Scalars['String'];
  receiverIds: Array<Scalars['String']>;
  requestId: Scalars['Float'];
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
  city: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  postalCode: Scalars['String'];
  prefecture?: Maybe<Prefecture>;
  restAddress: Scalars['String'];
};

export type Construction = {
  __typename?: 'Construction';
  code: Scalars['String'];
  company: Company;
  companyId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type DeclineRequestInput = {
  comment: Scalars['String'];
  requestId: Scalars['Float'];
};

export type DetailElementValueType =
  | 'date'
  | 'number'
  | 'string';

export type ElementValueType =
  | 'date'
  | 'number'
  | 'string';

export type HandleRequestInput = {
  comment: Scalars['String'];
  requestId: Scalars['Float'];
};

export type Invoice = {
  __typename?: 'Invoice';
  billingDate?: Maybe<Scalars['DateTime']>;
  body: Array<InvoiceLogElement>;
  company: Company;
  companyId: Scalars['Int'];
  construction?: Maybe<Construction>;
  constructionId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['String'];
  detail: Array<Array<InvoiceLogDetailElement>>;
  dueDateForPayment?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  invoiceFormatLog: InvoiceFormatLog;
  paymentAmount?: Maybe<Scalars['Int']>;
  status: InvoiceStatus;
  updatedAt: Scalars['DateTime'];
  updatedDataAt: Scalars['DateTime'];
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
  | 'awaitingReceipt'
  | 'completelyApproved'
  | 'declinedToFile'
  | 'declinedToSystem'
  | 'inputtingFile'
  | 'inputtingWithSystem'
  | 'underApproval';

export type InvoiceStatusFromUserView =
  | 'approvedAwaitingNextApproval'
  | 'approvedNextApproved'
  | 'approving'
  | 'completelyApproved'
  | 'declined'
  | 'handling';

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
  addJudgement: Judgement;
  addRequest: Request;
  addRequestNotification: RequestNotification;
  addRequestReceiver: RequestReceiver;
  addUnconfirmedUser: UnconfirmedUser;
  addUser: User;
  approveInvoice: Request;
  declineInvoice: Scalars['Boolean'];
  handleInvoice: Scalars['Boolean'];
  removeComment: Scalars['Boolean'];
  removeCompany: Scalars['Boolean'];
  removeUnconfirmedUser: Scalars['Boolean'];
  sendInvoice: Invoice;
  updateInvoice: Invoice;
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


export type MutationAddUnconfirmedUserArgs = {
  newUnconfirmedUser: NewUnconfirmedUserInput;
};


export type MutationAddUserArgs = {
  newUser: NewUserInput;
};


export type MutationApproveInvoiceArgs = {
  input: ApproveInvoiceInput;
};


export type MutationDeclineInvoiceArgs = {
  input: DeclineRequestInput;
};


export type MutationHandleInvoiceArgs = {
  input: HandleRequestInput;
};


export type MutationRemoveCommentArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCompanyArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUnconfirmedUserArgs = {
  email: Scalars['String'];
};


export type MutationSendInvoiceArgs = {
  input: SendInvoiceInput;
};


export type MutationUpdateInvoiceArgs = {
  input: UpdateInvoiceInput;
};

export type NewCommentInput = {
  content: Scalars['String'];
  invoiceId: Scalars['String'];
  requestId: Scalars['Int'];
  userId: Scalars['ID'];
};

export type NewCompanyInput = {
  city: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  postalCode: Scalars['String'];
  prefecture?: InputMaybe<Prefecture>;
  restAddress: Scalars['String'];
};

export type NewInvoiceFormatInput = {
  companyId: Scalars['Int'];
  name: Scalars['String'];
};

export type NewInvoiceInput = {
  body: Array<InvoiceLogElementInput>;
  detail: Array<Array<InvoiceLogElementInput>>;
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

export type NewUnconfirmedUserInput = {
  companyId: Scalars['Int'];
  email: Scalars['String'];
  employeeCode: Scalars['String'];
  familyName: Scalars['String'];
  familyNameFurigana: Scalars['String'];
  givenName: Scalars['String'];
  givenNameFurigana: Scalars['String'];
  isAdmin: Scalars['Boolean'];
};

export type NewUserInput = {
  companyId: Scalars['Int'];
  email: Scalars['String'];
  employeeCode: Scalars['String'];
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
  allUsers: Array<User>;
  comments: Array<Comment>;
  companies: Array<Company>;
  getAnyCompany: Company;
  getCompany: Company;
  getInvoice: Invoice;
  getInvoiceFormatDetailElement: InvoiceFormatDetailElement;
  getInvoiceFormatElement: InvoiceFormatElement;
  getInvoiceStatusFromUserView: InvoiceStatusFromUserView;
  getRequest: Request;
  getRequestPair: RequestPair;
  getUnconfirmedUser: UnconfirmedUser;
  inputtingWithSystemInvoices: Array<Invoice>;
  invoiceFormatDetailElements: Array<InvoiceFormatDetailElement>;
  invoiceFormatElements: Array<InvoiceFormatElement>;
  invoiceFormatLogs: Array<InvoiceFormatLog>;
  invoiceFormats: Array<InvoiceFormat>;
  invoices: Array<Invoice>;
  requestNotifications: Array<RequestNotification>;
  requests: Array<Request>;
  unconfirmedUsers: Array<UnconfirmedUser>;
  users: Array<User>;
};


export type QueryGetAnyCompanyArgs = {
  id: Scalars['Int'];
};


export type QueryGetInvoiceArgs = {
  id: Scalars['String'];
};


export type QueryGetInvoiceFormatDetailElementArgs = {
  id: Scalars['String'];
};


export type QueryGetInvoiceFormatElementArgs = {
  id: Scalars['String'];
};


export type QueryGetInvoiceStatusFromUserViewArgs = {
  invoiceId: Scalars['String'];
};


export type QueryGetRequestArgs = {
  id: Scalars['Int'];
};


export type QueryGetRequestPairArgs = {
  invoiceId: Scalars['String'];
};


export type QueryGetUnconfirmedUserArgs = {
  email: Scalars['String'];
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

export type RequestPair = {
  __typename?: 'RequestPair';
  receiverRequest?: Maybe<Request>;
  requesterRequest?: Maybe<Request>;
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
  | 'awaiting'
  | 'declined';

export type SendInvoiceInput = {
  comment: Scalars['String'];
  invoiceId: Scalars['String'];
};

export type UnconfirmedUser = {
  __typename?: 'UnconfirmedUser';
  company: Company;
  companyId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  email: Scalars['ID'];
  employeeCode: Scalars['String'];
  familyName: Scalars['String'];
  familyNameFurigana: Scalars['String'];
  givenName: Scalars['String'];
  givenNameFurigana: Scalars['String'];
  isAdmin: Scalars['Boolean'];
};

export type UpdateInvoiceInput = {
  body: Array<InvoiceLogElementInput>;
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  company: Company;
  companyId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  employeeCode: Scalars['String'];
  familyName: Scalars['String'];
  familyNameFurigana: Scalars['String'];
  givenName: Scalars['String'];
  givenNameFurigana: Scalars['String'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
};

export type ApprovalsQueryVariables = Exact<{ [key: string]: never; }>;


export type ApprovalsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode: string }>, invoices: Array<{ __typename?: 'Invoice', id: string, createdAt: any, createdById: string, companyId: number, status: InvoiceStatus }> };

export type FormatsQueryVariables = Exact<{ [key: string]: never; }>;


export type FormatsQuery = { __typename?: 'Query', invoiceFormatLogs: Array<{ __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', id: string, name: string, company: { __typename?: 'Company', id: number, name: string } } }> };

export type FormatsCreateInvoiceMutationVariables = Exact<{
  input: NewInvoiceInput;
}>;


export type FormatsCreateInvoiceMutation = { __typename?: 'Mutation', addInvoice: { __typename?: 'Invoice', id: string } };

export type InvoiceIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type InvoiceIdQuery = { __typename?: 'Query', getInvoice: { __typename?: 'Invoice', id: string, status: InvoiceStatus, createdBy: { __typename?: 'User', id: string, familyName: string, givenName: string }, construction?: { __typename?: 'Construction', id: number, name: string } | null | undefined, company: { __typename?: 'Company', id: number, name: string }, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, detail: Array<Array<{ __typename?: 'InvoiceLogDetailElement', elementId: string, value: string }>>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', name: string, company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, label: string, order: number, own: boolean, valueType: ElementValueType }>, detailElements: Array<{ __typename?: 'InvoiceFormatDetailElement', id: string, order: number, label: string, valueType: DetailElementValueType, own: boolean }> } }, getRequestPair: { __typename?: 'RequestPair', receiverRequest?: { __typename?: 'Request', id: number } | null | undefined, requesterRequest?: { __typename?: 'Request', id: number } | null | undefined }, users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode: string }> };

export type InvoiceIdApproveMutationVariables = Exact<{
  input: ApproveInvoiceInput;
}>;


export type InvoiceIdApproveMutation = { __typename?: 'Mutation', approveInvoice: { __typename?: 'Request', id: number } };

export type InvoiceIdDeclineMutationVariables = Exact<{
  input: DeclineRequestInput;
}>;


export type InvoiceIdDeclineMutation = { __typename?: 'Mutation', declineInvoice: boolean };

export type InvoicesIdRequestQueryVariables = Exact<{ [key: string]: never; }>;


export type InvoicesIdRequestQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode: string }> };

export type InvoicesIdRequestCreateRequestMutationVariables = Exact<{
  newRequest: NewRequestInput;
}>;


export type InvoicesIdRequestCreateRequestMutation = { __typename?: 'Mutation', addRequest: { __typename?: 'Request', id: number, requester: { __typename?: 'User', id: string, givenName: string, familyName: string, email: string, employeeCode: string, company: { __typename?: 'Company', id: number, name: string } } } };

export type InvoicesIdRequestsIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type InvoicesIdRequestsIdQuery = { __typename?: 'Query', getRequest: { __typename?: 'Request', id: number, requester: { __typename?: 'User', id: string, givenName: string, familyName: string }, comments: Array<{ __typename?: 'Comment', id: number, content: string, user: { __typename?: 'User', id: string, givenName: string, familyName: string } }> } };

export type CreateJudgementMutationVariables = Exact<{
  newJudgement: NewJudgementInput;
}>;


export type CreateJudgementMutation = { __typename?: 'Mutation', addJudgement: { __typename?: 'Judgement', id: number, type: JudgementType, user: { __typename?: 'User', id: string }, request: { __typename?: 'Request', id: number } } };

export type IssueIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IssueIdQuery = { __typename?: 'Query', getInvoice: { __typename?: 'Invoice', id: string, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, detail: Array<Array<{ __typename?: 'InvoiceLogDetailElement', elementId: string, value: string }>>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', name: string, company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, label: string, order: number, own: boolean, valueType: ElementValueType }>, detailElements: Array<{ __typename?: 'InvoiceFormatDetailElement', id: string, order: number, label: string, valueType: DetailElementValueType, own: boolean }> } } };

export type IssueIdUpdateInvoiceMutationVariables = Exact<{
  input: UpdateInvoiceInput;
}>;


export type IssueIdUpdateInvoiceMutation = { __typename?: 'Mutation', updateInvoice: { __typename?: 'Invoice', id: string, createdAt: any, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, order: number, label: string, valueType: ElementValueType, own: boolean }> } } };

export type IssueIdViewQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IssueIdViewQuery = { __typename?: 'Query', getInvoice: { __typename?: 'Invoice', id: string, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, detail: Array<Array<{ __typename?: 'InvoiceLogDetailElement', elementId: string, value: string }>>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', name: string, company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, label: string, order: number, own: boolean, valueType: ElementValueType }>, detailElements: Array<{ __typename?: 'InvoiceFormatDetailElement', id: string, order: number, label: string, valueType: DetailElementValueType, own: boolean }> } } };

export type IssueIdViewSendInvoiceMutationVariables = Exact<{
  input: SendInvoiceInput;
}>;


export type IssueIdViewSendInvoiceMutation = { __typename?: 'Mutation', sendInvoice: { __typename?: 'Invoice', id: string, createdById: string, createdAt: any, updatedAt: any, updatedDataAt: any } };

export type IssuesQueryVariables = Exact<{ [key: string]: never; }>;


export type IssuesQuery = { __typename?: 'Query', invoices: Array<{ __typename?: 'Invoice', id: string, createdAt: any, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, constructionNameId?: string | null | undefined, billingDateId?: string | null | undefined, paymentDeadlineId?: string | null | undefined, paymentAmountId?: string | null | undefined, invoiceFormat: { __typename?: 'InvoiceFormat', company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, order: number, label: string, valueType: ElementValueType, own: boolean }> } }> };

export type ReceiptsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReceiptsQuery = { __typename?: 'Query', inputtingWithSystemInvoices: Array<{ __typename?: 'Invoice', id: string, billingDate?: any | null | undefined, dueDateForPayment?: any | null | undefined, paymentAmount?: number | null | undefined, status: InvoiceStatus, construction?: { __typename?: 'Construction', id: number, name: string } | null | undefined, company: { __typename?: 'Company', id: number, name: string } }> };

export type RegistrationsQueryVariables = Exact<{ [key: string]: never; }>;


export type RegistrationsQuery = { __typename?: 'Query', invoiceFormats: Array<{ __typename?: 'InvoiceFormat', id: string, name: string }>, users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode: string }> };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode: string }> };

export type SignUpCheckEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type SignUpCheckEmailQuery = { __typename?: 'Query', getUnconfirmedUser: { __typename?: 'UnconfirmedUser', email: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, isAdmin: boolean, employeeCode: string, createdAt: any, company: { __typename?: 'Company', id: number, name: string } } };

export type SignUpMutationVariables = Exact<{
  newUser: NewUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', id: string, email: string } };


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
export const FormatsCreateInvoiceDocument = gql`
    mutation FormatsCreateInvoice($input: NewInvoiceInput!) {
  addInvoice(newInvoice: $input) {
    id
  }
}
    `;
export type FormatsCreateInvoiceMutationFn = Apollo.MutationFunction<FormatsCreateInvoiceMutation, FormatsCreateInvoiceMutationVariables>;

/**
 * __useFormatsCreateInvoiceMutation__
 *
 * To run a mutation, you first call `useFormatsCreateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFormatsCreateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [formatsCreateInvoiceMutation, { data, loading, error }] = useFormatsCreateInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFormatsCreateInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<FormatsCreateInvoiceMutation, FormatsCreateInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FormatsCreateInvoiceMutation, FormatsCreateInvoiceMutationVariables>(FormatsCreateInvoiceDocument, options);
      }
export type FormatsCreateInvoiceMutationHookResult = ReturnType<typeof useFormatsCreateInvoiceMutation>;
export type FormatsCreateInvoiceMutationResult = Apollo.MutationResult<FormatsCreateInvoiceMutation>;
export type FormatsCreateInvoiceMutationOptions = Apollo.BaseMutationOptions<FormatsCreateInvoiceMutation, FormatsCreateInvoiceMutationVariables>;
export const InvoiceIdDocument = gql`
    query InvoiceId($id: String!) {
  getInvoice(id: $id) {
    id
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
  getRequestPair(invoiceId: $id) {
    receiverRequest {
      id
    }
    requesterRequest {
      id
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
export const InvoiceIdApproveDocument = gql`
    mutation InvoiceIdApprove($input: ApproveInvoiceInput!) {
  approveInvoice(input: $input) {
    id
  }
}
    `;
export type InvoiceIdApproveMutationFn = Apollo.MutationFunction<InvoiceIdApproveMutation, InvoiceIdApproveMutationVariables>;

/**
 * __useInvoiceIdApproveMutation__
 *
 * To run a mutation, you first call `useInvoiceIdApproveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvoiceIdApproveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invoiceIdApproveMutation, { data, loading, error }] = useInvoiceIdApproveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInvoiceIdApproveMutation(baseOptions?: Apollo.MutationHookOptions<InvoiceIdApproveMutation, InvoiceIdApproveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InvoiceIdApproveMutation, InvoiceIdApproveMutationVariables>(InvoiceIdApproveDocument, options);
      }
export type InvoiceIdApproveMutationHookResult = ReturnType<typeof useInvoiceIdApproveMutation>;
export type InvoiceIdApproveMutationResult = Apollo.MutationResult<InvoiceIdApproveMutation>;
export type InvoiceIdApproveMutationOptions = Apollo.BaseMutationOptions<InvoiceIdApproveMutation, InvoiceIdApproveMutationVariables>;
export const InvoiceIdDeclineDocument = gql`
    mutation InvoiceIdDecline($input: DeclineRequestInput!) {
  declineInvoice(input: $input)
}
    `;
export type InvoiceIdDeclineMutationFn = Apollo.MutationFunction<InvoiceIdDeclineMutation, InvoiceIdDeclineMutationVariables>;

/**
 * __useInvoiceIdDeclineMutation__
 *
 * To run a mutation, you first call `useInvoiceIdDeclineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvoiceIdDeclineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invoiceIdDeclineMutation, { data, loading, error }] = useInvoiceIdDeclineMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInvoiceIdDeclineMutation(baseOptions?: Apollo.MutationHookOptions<InvoiceIdDeclineMutation, InvoiceIdDeclineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InvoiceIdDeclineMutation, InvoiceIdDeclineMutationVariables>(InvoiceIdDeclineDocument, options);
      }
export type InvoiceIdDeclineMutationHookResult = ReturnType<typeof useInvoiceIdDeclineMutation>;
export type InvoiceIdDeclineMutationResult = Apollo.MutationResult<InvoiceIdDeclineMutation>;
export type InvoiceIdDeclineMutationOptions = Apollo.BaseMutationOptions<InvoiceIdDeclineMutation, InvoiceIdDeclineMutationVariables>;
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
  getInvoice(id: $id) {
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
export const IssueIdUpdateInvoiceDocument = gql`
    mutation IssueIdUpdateInvoice($input: UpdateInvoiceInput!) {
  updateInvoice(input: $input) {
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
export type IssueIdUpdateInvoiceMutationFn = Apollo.MutationFunction<IssueIdUpdateInvoiceMutation, IssueIdUpdateInvoiceMutationVariables>;

/**
 * __useIssueIdUpdateInvoiceMutation__
 *
 * To run a mutation, you first call `useIssueIdUpdateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIssueIdUpdateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [issueIdUpdateInvoiceMutation, { data, loading, error }] = useIssueIdUpdateInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIssueIdUpdateInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<IssueIdUpdateInvoiceMutation, IssueIdUpdateInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IssueIdUpdateInvoiceMutation, IssueIdUpdateInvoiceMutationVariables>(IssueIdUpdateInvoiceDocument, options);
      }
export type IssueIdUpdateInvoiceMutationHookResult = ReturnType<typeof useIssueIdUpdateInvoiceMutation>;
export type IssueIdUpdateInvoiceMutationResult = Apollo.MutationResult<IssueIdUpdateInvoiceMutation>;
export type IssueIdUpdateInvoiceMutationOptions = Apollo.BaseMutationOptions<IssueIdUpdateInvoiceMutation, IssueIdUpdateInvoiceMutationVariables>;
export const IssueIdViewDocument = gql`
    query IssueIdView($id: String!) {
  getInvoice(id: $id) {
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
export const IssueIdViewSendInvoiceDocument = gql`
    mutation IssueIdViewSendInvoice($input: SendInvoiceInput!) {
  sendInvoice(input: $input) {
    id
    createdById
    createdAt
    updatedAt
    updatedDataAt
  }
}
    `;
export type IssueIdViewSendInvoiceMutationFn = Apollo.MutationFunction<IssueIdViewSendInvoiceMutation, IssueIdViewSendInvoiceMutationVariables>;

/**
 * __useIssueIdViewSendInvoiceMutation__
 *
 * To run a mutation, you first call `useIssueIdViewSendInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIssueIdViewSendInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [issueIdViewSendInvoiceMutation, { data, loading, error }] = useIssueIdViewSendInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIssueIdViewSendInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<IssueIdViewSendInvoiceMutation, IssueIdViewSendInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IssueIdViewSendInvoiceMutation, IssueIdViewSendInvoiceMutationVariables>(IssueIdViewSendInvoiceDocument, options);
      }
export type IssueIdViewSendInvoiceMutationHookResult = ReturnType<typeof useIssueIdViewSendInvoiceMutation>;
export type IssueIdViewSendInvoiceMutationResult = Apollo.MutationResult<IssueIdViewSendInvoiceMutation>;
export type IssueIdViewSendInvoiceMutationOptions = Apollo.BaseMutationOptions<IssueIdViewSendInvoiceMutation, IssueIdViewSendInvoiceMutationVariables>;
export const IssuesDocument = gql`
    query Issues {
  invoices {
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
  inputtingWithSystemInvoices {
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
export const SignUpCheckEmailDocument = gql`
    query SignUpCheckEmail($email: String!) {
  getUnconfirmedUser(email: $email) {
    email
    familyName
    givenName
    familyNameFurigana
    givenNameFurigana
    isAdmin
    employeeCode
    createdAt
    company {
      id
      name
    }
  }
}
    `;

/**
 * __useSignUpCheckEmailQuery__
 *
 * To run a query within a React component, call `useSignUpCheckEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignUpCheckEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignUpCheckEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignUpCheckEmailQuery(baseOptions: Apollo.QueryHookOptions<SignUpCheckEmailQuery, SignUpCheckEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignUpCheckEmailQuery, SignUpCheckEmailQueryVariables>(SignUpCheckEmailDocument, options);
      }
export function useSignUpCheckEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignUpCheckEmailQuery, SignUpCheckEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignUpCheckEmailQuery, SignUpCheckEmailQueryVariables>(SignUpCheckEmailDocument, options);
        }
export type SignUpCheckEmailQueryHookResult = ReturnType<typeof useSignUpCheckEmailQuery>;
export type SignUpCheckEmailLazyQueryHookResult = ReturnType<typeof useSignUpCheckEmailLazyQuery>;
export type SignUpCheckEmailQueryResult = Apollo.QueryResult<SignUpCheckEmailQuery, SignUpCheckEmailQueryVariables>;
export const SignUpDocument = gql`
    mutation SignUp($newUser: NewUserInput!) {
  addUser(newUser: $newUser) {
    id
    email
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      newUser: // value for 'newUser'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;