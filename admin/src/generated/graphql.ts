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
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

export type AdminNewUnconfirmedUserInput = {
  companyId: Scalars['Int'];
  email: Scalars['String'];
  employeeCode: Scalars['String'];
  familyName: Scalars['String'];
  familyNameFurigana: Scalars['String'];
  givenName: Scalars['String'];
  givenNameFurigana: Scalars['String'];
  isAdmin: Scalars['Boolean'];
};

export type ApproveRequestInput = {
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

export type CompleteInvoiceInput = {
  requestId: Scalars['Float'];
};

export type Construction = {
  __typename?: 'Construction';
  code: Scalars['String'];
  company: Company;
  companyId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  /** ????????????????????? */
  customShownName: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  /** ?????? */
  remarks: Scalars['String'];
  /** ??????????????????????????????????????????????????????????????????????????????????????????????????? */
  shownName: ShownName;
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
};

export type DeclineInvoiceInput = {
  comment: Scalars['String'];
  invoiceId: Scalars['String'];
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
  requestPairStatus: RequestPairStatus;
  requests: Array<Request>;
  status: InvoiceStatus;
  updatedAt: Scalars['DateTime'];
  updatedDataAt: Scalars['DateTime'];
};

export type InvoiceFile = {
  __typename?: 'InvoiceFile';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']>;
  invoiceId: Scalars['String'];
  pathName: Scalars['String'];
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
  /** `true`: ????????????????????????, `false`: ????????????????????? */
  own: Scalars['Boolean'];
  valueType: DetailElementValueType;
};

export type InvoiceFormatElement = {
  __typename?: 'InvoiceFormatElement';
  id: Scalars['ID'];
  label: Scalars['String'];
  order: Scalars['Int'];
  /** `true`: ????????????????????????, `false`: ????????????????????? */
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

/** ?????????????????? */
export type InvoiceStatus =
  /** ???????????? */
  | 'awaitingReceipt'
  /** ???????????? */
  | 'completelyApproved'
  /** ????????????????????????????????????????????? */
  | 'declinedToFile'
  /** ???????????????????????????????????????????????? */
  | 'declinedToSystem'
  /** ????????????????????????????????? */
  | 'inputtingFile'
  /** ???????????????????????? */
  | 'inputtingWithSystem'
  /** ??????????????? */
  | 'underApproval';

/** ??????????????????????????????????????? */
export type InvoiceStatusFromUserView =
  /** ??????or????????????????????????????????? */
  | 'approvedAwaitingNextApproval'
  /** ??????or???????????????????????????????????? */
  | 'approvedNextApproved'
  /** ??????????????????????????? */
  | 'approving'
  /** ???????????????????????? */
  | 'completelyApproved'
  /** ?????????????????????????????????????????????????????? */
  | 'declined'
  /** ?????????????????????????????????????????? */
  | 'handling'
  /** ???????????????????????? */
  | 'unrelated';

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
  | 'decline'
  | 'reapply';

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  addConstruction: Construction;
  addInvoice: Invoice;
  addInvoiceFormat: InvoiceFormat;
  addRequest: Request;
  addRequestNotification: RequestNotification;
  addRequestReceiver: RequestReceiver;
  addUnconfirmedUser: UnconfirmedUser;
  addUser: User;
  adminAddCompany: Company;
  adminAddUnconfirmedUser: UnconfirmedUser;
  adminRemoveCompany: Scalars['Boolean'];
  adminRemoveUnconfirmedUser: Scalars['Boolean'];
  adminUpdateUnconfirmedUser: UnconfirmedUser;
  /** ???????????????????????????????????? */
  approveRequest: Request;
  /** ?????????????????? */
  completeInvoice: Invoice;
  /** ????????????????????? */
  declineInvoiceToInput: Invoice;
  /** ???????????????????????????????????? */
  declineRequest: Scalars['Boolean'];
  /** ???????????????????????? */
  reapplyRequest: Scalars['Boolean'];
  /** ???????????? */
  receiveInvoice: Invoice;
  /** ???????????????????????? */
  sendInvoice: Invoice;
  updateInvoice: Invoice;
  updateUnconfirmedUser: UnconfirmedUser;
  uploadInvoiceFile: InvoiceFile;
};


export type MutationAddCommentArgs = {
  newComment: NewCommentInput;
};


export type MutationAddConstructionArgs = {
  newConstruction: NewConstructionInput;
};


export type MutationAddInvoiceArgs = {
  newInvoice: NewInvoiceInput;
};


export type MutationAddInvoiceFormatArgs = {
  newInvoiceFormat: NewInvoiceFormatInput;
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


export type MutationAdminAddCompanyArgs = {
  newCompany: NewCompanyInput;
};


export type MutationAdminAddUnconfirmedUserArgs = {
  newUnconfirmedUser: AdminNewUnconfirmedUserInput;
};


export type MutationAdminRemoveCompanyArgs = {
  id: Scalars['Int'];
};


export type MutationAdminRemoveUnconfirmedUserArgs = {
  email: Scalars['String'];
};


export type MutationAdminUpdateUnconfirmedUserArgs = {
  updateUnconfirmedUser: UpdateUnconfirmedUserInput;
};


export type MutationApproveRequestArgs = {
  input: ApproveRequestInput;
};


export type MutationCompleteInvoiceArgs = {
  input: CompleteInvoiceInput;
};


export type MutationDeclineInvoiceToInputArgs = {
  input: DeclineInvoiceInput;
};


export type MutationDeclineRequestArgs = {
  input: DeclineRequestInput;
};


export type MutationReapplyRequestArgs = {
  input: ReapplyRequestInput;
};


export type MutationReceiveInvoiceArgs = {
  input: ReceiveInvoiceInput;
};


export type MutationSendInvoiceArgs = {
  input: SendInvoiceInput;
};


export type MutationUpdateInvoiceArgs = {
  input: UpdateInvoiceInput;
};


export type MutationUpdateUnconfirmedUserArgs = {
  updateUnconfirmedUser: UpdateUnconfirmedUserInput;
};


export type MutationUploadInvoiceFileArgs = {
  file: Scalars['Upload'];
  invoiceId: Scalars['String'];
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

export type NewConstructionInput = {
  code: Scalars['String'];
  customShownName: Scalars['String'];
  name: Scalars['String'];
  remarks: Scalars['String'];
  shownName: ShownName;
  userId: Scalars['String'];
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
  adminCompanies: Array<Company>;
  adminCompany: Company;
  adminUnconfirmedUsers: Array<UnconfirmedUser>;
  adminUsers: Array<User>;
  company: Company;
  constructions: Array<Construction>;
  currentUser: User;
  invoice: Invoice;
  invoiceFormatElement: InvoiceFormatElement;
  invoiceFormatElements: Array<InvoiceFormatElement>;
  invoiceFormatLogs: Array<InvoiceFormatLog>;
  invoiceFormats: Array<InvoiceFormat>;
  invoices: Array<Invoice>;
  invoicesByStatus: Array<Invoice>;
  request: Request;
  requestNotifications: Array<RequestNotification>;
  requests: Array<Request>;
  unconfirmedUser: UnconfirmedUser;
  unconfirmedUsers: Array<UnconfirmedUser>;
  users: Array<User>;
};


export type QueryAdminCompanyArgs = {
  id: Scalars['Int'];
};


export type QueryInvoiceArgs = {
  id: Scalars['String'];
};


export type QueryInvoiceFormatElementArgs = {
  id: Scalars['String'];
};


export type QueryInvoiceFormatElementsArgs = {
  logId: Scalars['String'];
};


export type QueryInvoicesByStatusArgs = {
  status: InvoiceStatus;
};


export type QueryRequestArgs = {
  id: Scalars['Int'];
};


export type QueryUnconfirmedUserArgs = {
  email: Scalars['String'];
};

export type ReapplyRequestInput = {
  comment: Scalars['String'];
  requestId: Scalars['Float'];
};

export type ReceiveInvoiceInput = {
  comment: Scalars['String'];
  invoiceId: Scalars['String'];
  nextReceiverIds: Array<Scalars['String']>;
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

export type RequestPairStatus = {
  __typename?: 'RequestPairStatus';
  invoiceStatusFromUserView: InvoiceStatusFromUserView;
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

export type ShownName =
  | 'code'
  | 'custom'
  | 'name';

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

export type UpdateUnconfirmedUserInput = {
  email: Scalars['String'];
  employeeCode: Scalars['String'];
  familyName: Scalars['String'];
  familyNameFurigana: Scalars['String'];
  givenName: Scalars['String'];
  givenNameFurigana: Scalars['String'];
  isAdmin: Scalars['Boolean'];
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


export type CompaniesQuery = { __typename?: 'Query', adminCompanies: Array<{ __typename?: 'Company', id: number, name: string, phoneNumber: string, postalCode: string, prefecture?: Prefecture | null | undefined, city: string, restAddress: string, createdAt: any }> };

export type CreateCompanyMutationVariables = Exact<{
  newCompany: NewCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', adminAddCompany: { __typename?: 'Company', id: number, name: string, phoneNumber: string, postalCode: string, prefecture?: Prefecture | null | undefined, city: string, restAddress: string, createdAt: any } };

export type UnconfirmedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UnconfirmedUsersQuery = { __typename?: 'Query', adminUnconfirmedUsers: Array<{ __typename?: 'UnconfirmedUser', email: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, employeeCode: string, createdAt: any, isAdmin: boolean, company: { __typename?: 'Company', id: number, name: string } }>, adminCompanies: Array<{ __typename?: 'Company', id: number, name: string }> };

export type CreateUnconfirmedUserMutationVariables = Exact<{
  newUnconfirmedUser: AdminNewUnconfirmedUserInput;
}>;


export type CreateUnconfirmedUserMutation = { __typename?: 'Mutation', adminAddUnconfirmedUser: { __typename?: 'UnconfirmedUser', email: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, createdAt: any, company: { __typename?: 'Company', id: number, name: string } } };


export const CompaniesDocument = gql`
    query Companies {
  adminCompanies {
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
  adminAddCompany(newCompany: $newCompany) {
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
  adminUnconfirmedUsers {
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
  adminCompanies {
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
    mutation CreateUnconfirmedUser($newUnconfirmedUser: AdminNewUnconfirmedUserInput!) {
  adminAddUnconfirmedUser(newUnconfirmedUser: $newUnconfirmedUser) {
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