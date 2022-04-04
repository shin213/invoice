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

export type CompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesQuery = { __typename?: 'Query', companies: Array<{ __typename?: 'Company', id: number, name: string, phoneNumber: string, postalCode: string, prefecture?: Prefecture | null | undefined, city: string, restAddress: string, createdAt: any }> };

export type CreateCompanyMutationVariables = Exact<{
  newCompany: NewCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', addCompany: { __typename?: 'Company', id: number, name: string, phoneNumber: string, postalCode: string, prefecture?: Prefecture | null | undefined, city: string, restAddress: string, createdAt: any } };

export type UnconfirmedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UnconfirmedUsersQuery = { __typename?: 'Query', unconfirmedUsers: Array<{ __typename?: 'UnconfirmedUser', email: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, employeeCode: string, createdAt: any, isAdmin: boolean, company: { __typename?: 'Company', id: number, name: string } }>, companies: Array<{ __typename?: 'Company', id: number, name: string }> };

export type CreateUnconfirmedUserMutationVariables = Exact<{
  newUnconfirmedUser: NewUnconfirmedUserInput;
}>;


export type CreateUnconfirmedUserMutation = { __typename?: 'Mutation', addUnconfirmedUser: { __typename?: 'UnconfirmedUser', email: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, createdAt: any, company: { __typename?: 'Company', id: number, name: string } } };


export const CompaniesDocument = gql`
    query Companies {
  companies {
    id
    name
    phoneNumber
    postalCode
    prefecture
    city
    restAddress
    createdAt
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
export const CreateCompanyDocument = gql`
    mutation CreateCompany($newCompany: NewCompanyInput!) {
  addCompany(newCompany: $newCompany) {
    id
    name
    phoneNumber
    postalCode
    prefecture
    city
    restAddress
    createdAt
  }
}
    `;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      newCompany: // value for 'newCompany'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const UnconfirmedUsersDocument = gql`
    query UnconfirmedUsers {
  unconfirmedUsers {
    email
    familyName
    givenName
    familyNameFurigana
    givenNameFurigana
    employeeCode
    createdAt
    isAdmin
    company {
      id
      name
    }
  }
  companies {
    id
    name
  }
}
    `;

/**
 * __useUnconfirmedUsersQuery__
 *
 * To run a query within a React component, call `useUnconfirmedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnconfirmedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnconfirmedUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUnconfirmedUsersQuery(baseOptions?: Apollo.QueryHookOptions<UnconfirmedUsersQuery, UnconfirmedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnconfirmedUsersQuery, UnconfirmedUsersQueryVariables>(UnconfirmedUsersDocument, options);
      }
export function useUnconfirmedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnconfirmedUsersQuery, UnconfirmedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnconfirmedUsersQuery, UnconfirmedUsersQueryVariables>(UnconfirmedUsersDocument, options);
        }
export type UnconfirmedUsersQueryHookResult = ReturnType<typeof useUnconfirmedUsersQuery>;
export type UnconfirmedUsersLazyQueryHookResult = ReturnType<typeof useUnconfirmedUsersLazyQuery>;
export type UnconfirmedUsersQueryResult = Apollo.QueryResult<UnconfirmedUsersQuery, UnconfirmedUsersQueryVariables>;
export const CreateUnconfirmedUserDocument = gql`
    mutation CreateUnconfirmedUser($newUnconfirmedUser: NewUnconfirmedUserInput!) {
  addUnconfirmedUser(newUnconfirmedUser: $newUnconfirmedUser) {
    email
    familyName
    givenName
    familyNameFurigana
    givenNameFurigana
    createdAt
    company {
      id
      name
    }
  }
}
    `;
export type CreateUnconfirmedUserMutationFn = Apollo.MutationFunction<CreateUnconfirmedUserMutation, CreateUnconfirmedUserMutationVariables>;

/**
 * __useCreateUnconfirmedUserMutation__
 *
 * To run a mutation, you first call `useCreateUnconfirmedUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnconfirmedUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnconfirmedUserMutation, { data, loading, error }] = useCreateUnconfirmedUserMutation({
 *   variables: {
 *      newUnconfirmedUser: // value for 'newUnconfirmedUser'
 *   },
 * });
 */
export function useCreateUnconfirmedUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUnconfirmedUserMutation, CreateUnconfirmedUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUnconfirmedUserMutation, CreateUnconfirmedUserMutationVariables>(CreateUnconfirmedUserDocument, options);
      }
export type CreateUnconfirmedUserMutationHookResult = ReturnType<typeof useCreateUnconfirmedUserMutation>;
export type CreateUnconfirmedUserMutationResult = Apollo.MutationResult<CreateUnconfirmedUserMutation>;
export type CreateUnconfirmedUserMutationOptions = Apollo.BaseMutationOptions<CreateUnconfirmedUserMutation, CreateUnconfirmedUserMutationVariables>;