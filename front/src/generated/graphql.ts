/* eslint-disable */
import dayjs from 'dayjs'

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
  DateTime: dayjs.Dayjs;
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
  /** カスタム表示名 */
  customShownName: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  /** 備考 */
  remarks: Scalars['String'];
  /** 協力企業に工事名を表示するか工事コード、カスタム表示名を表示するか */
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
  /** `true`: ゼネコンが入力。, `false`: 下請けが入力。 */
  own: Scalars['Boolean'];
  valueType: DetailElementValueType;
};

export type InvoiceFormatElement = {
  __typename?: 'InvoiceFormatElement';
  id: Scalars['ID'];
  label: Scalars['String'];
  order: Scalars['Int'];
  /** `true`: ゼネコンが入力。, `false`: 下請けが入力。 */
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

/** 請求書の状態 */
export type InvoiceStatus =
  /** 受領待ち */
  | 'awaitingReceipt'
  /** 承認完了 */
  | 'completelyApproved'
  /** アップロード結果が差し戻された */
  | 'declinedToFile'
  /** システムの入力結果が差し戻された */
  | 'declinedToSystem'
  /** ファイルアップロード中 */
  | 'inputtingFile'
  /** システムで入力中 */
  | 'inputtingWithSystem'
  /** 承認作業中 */
  | 'underApproval';

/** ユーザー視点での承認の状態 */
export type InvoiceStatusFromUserView =
  /** 受領or承認済み・次の承認待ち */
  | 'approvedAwaitingNextApproval'
  /** 受領or承認済み・次の承認も済み */
  | 'approvedNextApproved'
  /** 承認担当中・未承認 */
  | 'approving'
  /** 全員に承認された */
  | 'completelyApproved'
  /** 自分が申請者で差し戻され要対応な状態 */
  | 'declined'
  /** 自分が差し戻した後の対応待ち */
  | 'handling'
  /** 主たる関係がない */
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
  /** 承認リクエストを承認する */
  approveRequest: Request;
  /** 最終承認する */
  completeInvoice: Invoice;
  /** 受領を差し戻す */
  declineInvoiceToInput: Invoice;
  /** 承認リクエストを差し戻す */
  declineRequest: Scalars['Boolean'];
  /** 承認を再申請する */
  reapplyRequest: Scalars['Boolean'];
  /** 受領する */
  receiveInvoice: Invoice;
  /** 請求書を送信する */
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
  userIds: Array<Scalars['String']>;
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

export type LoginTemplateQueryVariables = Exact<{ [key: string]: never; }>;


export type LoginTemplateQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, email: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, employeeCode: string, createdAt: dayjs.Dayjs, isAdmin: boolean } };

export type ApprovalsQueryVariables = Exact<{ [key: string]: never; }>;


export type ApprovalsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode: string }>, invoicesByStatus: Array<{ __typename?: 'Invoice', id: string, billingDate?: dayjs.Dayjs | null | undefined, dueDateForPayment?: dayjs.Dayjs | null | undefined, paymentAmount?: number | null | undefined, status: InvoiceStatus, companyId: number, construction?: { __typename?: 'Construction', id: number, name: string } | null | undefined }> };

export type ConstructionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ConstructionsQuery = { __typename?: 'Query', constructions: Array<{ __typename?: 'Construction', id: number, name: string, code: string, shownName: ShownName, customShownName: string, users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, email: string }> }>, users: Array<{ __typename?: 'User', id: string, email: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string }> };

export type CreateConstructionMutationVariables = Exact<{
  newConstruction: NewConstructionInput;
}>;


export type CreateConstructionMutation = { __typename?: 'Mutation', addConstruction: { __typename?: 'Construction', id: number, name: string, code: string, shownName: ShownName, customShownName: string, users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, email: string }> } };

export type FormatsQueryVariables = Exact<{ [key: string]: never; }>;


export type FormatsQuery = { __typename?: 'Query', invoiceFormatLogs: Array<{ __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', id: string, name: string, company: { __typename?: 'Company', id: number, name: string } } }> };

export type FormatsCreateInvoiceMutationVariables = Exact<{
  input: NewInvoiceInput;
}>;


export type FormatsCreateInvoiceMutation = { __typename?: 'Mutation', addInvoice: { __typename?: 'Invoice', id: string } };

export type InvoiceIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type InvoiceIdQuery = { __typename?: 'Query', invoice: { __typename?: 'Invoice', id: string, status: InvoiceStatus, createdAt: dayjs.Dayjs, createdBy: { __typename?: 'User', id: string, familyName: string, givenName: string }, construction?: { __typename?: 'Construction', id: number, name: string } | null | undefined, company: { __typename?: 'Company', id: number, name: string }, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, detail: Array<Array<{ __typename?: 'InvoiceLogDetailElement', elementId: string, value: string }>>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', name: string, company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, label: string, order: number, own: boolean, valueType: ElementValueType }>, detailElements: Array<{ __typename?: 'InvoiceFormatDetailElement', id: string, order: number, label: string, valueType: DetailElementValueType, own: boolean }> }, requests: Array<{ __typename?: 'Request', id: number, status: RequestStatus, createdAt: dayjs.Dayjs, requester: { __typename?: 'User', id: string, email: string, familyName: string, givenName: string }, judgements: Array<{ __typename?: 'Judgement', id: number, createdAt: dayjs.Dayjs, type: JudgementType, user: { __typename?: 'User', id: string, familyName: string, givenName: string, email: string } }> }>, requestPairStatus: { __typename?: 'RequestPairStatus', invoiceStatusFromUserView: InvoiceStatusFromUserView, receiverRequest?: { __typename?: 'Request', id: number, status: RequestStatus } | null | undefined, requesterRequest?: { __typename?: 'Request', id: number, status: RequestStatus } | null | undefined } }, users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode: string }> };

export type InvoiceIdReceiveMutationVariables = Exact<{
  input: ReceiveInvoiceInput;
}>;


export type InvoiceIdReceiveMutation = { __typename?: 'Mutation', receiveInvoice: { __typename?: 'Invoice', id: string } };

export type InvoiceIdDeclineToInputMutationVariables = Exact<{
  input: DeclineInvoiceInput;
}>;


export type InvoiceIdDeclineToInputMutation = { __typename?: 'Mutation', declineInvoiceToInput: { __typename?: 'Invoice', id: string } };

export type InvoiceIdApproveMutationVariables = Exact<{
  input: ApproveRequestInput;
}>;


export type InvoiceIdApproveMutation = { __typename?: 'Mutation', approveRequest: { __typename?: 'Request', id: number } };

export type InvoiceIdDeclineMutationVariables = Exact<{
  input: DeclineRequestInput;
}>;


export type InvoiceIdDeclineMutation = { __typename?: 'Mutation', declineRequest: boolean };

export type InvoiceIdReapplyMutationVariables = Exact<{
  input: ReapplyRequestInput;
}>;


export type InvoiceIdReapplyMutation = { __typename?: 'Mutation', reapplyRequest: boolean };

export type InvoicesIdRequestQueryVariables = Exact<{ [key: string]: never; }>;


export type InvoicesIdRequestQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode: string }> };

export type InvoicesIdRequestCreateRequestMutationVariables = Exact<{
  newRequest: NewRequestInput;
}>;


export type InvoicesIdRequestCreateRequestMutation = { __typename?: 'Mutation', addRequest: { __typename?: 'Request', id: number, requester: { __typename?: 'User', id: string, givenName: string, familyName: string, email: string, employeeCode: string, company: { __typename?: 'Company', id: number, name: string } } } };

export type IssuesQueryVariables = Exact<{ [key: string]: never; }>;


export type IssuesQuery = { __typename?: 'Query', invoices: Array<{ __typename?: 'Invoice', id: string, createdAt: dayjs.Dayjs, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, constructionNameId?: string | null | undefined, billingDateId?: string | null | undefined, paymentDeadlineId?: string | null | undefined, paymentAmountId?: string | null | undefined, invoiceFormat: { __typename?: 'InvoiceFormat', company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, order: number, label: string, valueType: ElementValueType, own: boolean }> } }> };

export type IssueIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IssueIdQuery = { __typename?: 'Query', invoice: { __typename?: 'Invoice', id: string, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, detail: Array<Array<{ __typename?: 'InvoiceLogDetailElement', elementId: string, value: string }>>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', name: string, company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, label: string, order: number, own: boolean, valueType: ElementValueType }>, detailElements: Array<{ __typename?: 'InvoiceFormatDetailElement', id: string, order: number, label: string, valueType: DetailElementValueType, own: boolean }> } } };

export type IssueIdUpdateInvoiceMutationVariables = Exact<{
  input: UpdateInvoiceInput;
}>;


export type IssueIdUpdateInvoiceMutation = { __typename?: 'Mutation', updateInvoice: { __typename?: 'Invoice', id: string, createdAt: dayjs.Dayjs, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, order: number, label: string, valueType: ElementValueType, own: boolean }> } } };

export type IssueIdUploadInvoiceFileMutationVariables = Exact<{
  invoiceId: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type IssueIdUploadInvoiceFileMutation = { __typename?: 'Mutation', uploadInvoiceFile: { __typename?: 'InvoiceFile', pathName: string, invoiceId: string } };

export type IssueIdViewQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type IssueIdViewQuery = { __typename?: 'Query', invoice: { __typename?: 'Invoice', id: string, body: Array<{ __typename?: 'InvoiceLogElement', elementId: string, value: string }>, detail: Array<Array<{ __typename?: 'InvoiceLogDetailElement', elementId: string, value: string }>>, invoiceFormatLog: { __typename?: 'InvoiceFormatLog', id: string, invoiceFormat: { __typename?: 'InvoiceFormat', name: string, company: { __typename?: 'Company', name: string } }, elements: Array<{ __typename?: 'InvoiceFormatElement', id: string, label: string, order: number, own: boolean, valueType: ElementValueType }>, detailElements: Array<{ __typename?: 'InvoiceFormatDetailElement', id: string, order: number, label: string, valueType: DetailElementValueType, own: boolean }> } } };

export type IssueIdViewSendInvoiceMutationVariables = Exact<{
  input: SendInvoiceInput;
}>;


export type IssueIdViewSendInvoiceMutation = { __typename?: 'Mutation', sendInvoice: { __typename?: 'Invoice', id: string, createdById: string, createdAt: dayjs.Dayjs, updatedAt: dayjs.Dayjs, updatedDataAt: dayjs.Dayjs } };

export type ReceiptsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReceiptsQuery = { __typename?: 'Query', invoicesByStatus: Array<{ __typename?: 'Invoice', id: string, billingDate?: dayjs.Dayjs | null | undefined, dueDateForPayment?: dayjs.Dayjs | null | undefined, paymentAmount?: number | null | undefined, status: InvoiceStatus, companyId: number, construction?: { __typename?: 'Construction', id: number, name: string } | null | undefined }> };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, email: string, isAdmin: boolean, employeeCode: string }> };

export type SignUpCheckEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type SignUpCheckEmailQuery = { __typename?: 'Query', unconfirmedUser: { __typename?: 'UnconfirmedUser', email: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, isAdmin: boolean, employeeCode: string, createdAt: dayjs.Dayjs, company: { __typename?: 'Company', id: number, name: string } } };

export type SignUpMutationVariables = Exact<{
  newUser: NewUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', id: string, email: string } };

export type UnconfirmedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UnconfirmedUsersQuery = { __typename?: 'Query', unconfirmedUsers: Array<{ __typename?: 'UnconfirmedUser', email: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, employeeCode: string, createdAt: dayjs.Dayjs, isAdmin: boolean }> };

export type CreateUnconfirmedUserMutationVariables = Exact<{
  newUnconfirmedUser: NewUnconfirmedUserInput;
}>;


export type CreateUnconfirmedUserMutation = { __typename?: 'Mutation', addUnconfirmedUser: { __typename?: 'UnconfirmedUser', email: string, familyName: string, givenName: string, familyNameFurigana: string, givenNameFurigana: string, createdAt: dayjs.Dayjs } };


export const LoginTemplateDocument = gql`
    query LoginTemplate {
  currentUser {
    id
    email
    familyName
    givenName
    familyNameFurigana
    givenNameFurigana
    employeeCode
    createdAt
    isAdmin
  }
}
    `;

/**
 * __useLoginTemplateQuery__
 *
 * To run a query within a React component, call `useLoginTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginTemplateQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoginTemplateQuery(baseOptions?: Apollo.QueryHookOptions<LoginTemplateQuery, LoginTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginTemplateQuery, LoginTemplateQueryVariables>(LoginTemplateDocument, options);
      }
export function useLoginTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginTemplateQuery, LoginTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginTemplateQuery, LoginTemplateQueryVariables>(LoginTemplateDocument, options);
        }
export type LoginTemplateQueryHookResult = ReturnType<typeof useLoginTemplateQuery>;
export type LoginTemplateLazyQueryHookResult = ReturnType<typeof useLoginTemplateLazyQuery>;
export type LoginTemplateQueryResult = Apollo.QueryResult<LoginTemplateQuery, LoginTemplateQueryVariables>;
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
  invoicesByStatus(status: underApproval) {
    id
    billingDate
    dueDateForPayment
    paymentAmount
    status
    construction {
      id
      name
    }
    companyId
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
export const ConstructionsDocument = gql`
    query Constructions {
  constructions {
    id
    name
    code
    shownName
    customShownName
    users {
      id
      familyName
      givenName
      email
    }
  }
  users {
    id
    email
    familyName
    givenName
    familyNameFurigana
    givenNameFurigana
  }
}
    `;

/**
 * __useConstructionsQuery__
 *
 * To run a query within a React component, call `useConstructionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConstructionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConstructionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useConstructionsQuery(baseOptions?: Apollo.QueryHookOptions<ConstructionsQuery, ConstructionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConstructionsQuery, ConstructionsQueryVariables>(ConstructionsDocument, options);
      }
export function useConstructionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConstructionsQuery, ConstructionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConstructionsQuery, ConstructionsQueryVariables>(ConstructionsDocument, options);
        }
export type ConstructionsQueryHookResult = ReturnType<typeof useConstructionsQuery>;
export type ConstructionsLazyQueryHookResult = ReturnType<typeof useConstructionsLazyQuery>;
export type ConstructionsQueryResult = Apollo.QueryResult<ConstructionsQuery, ConstructionsQueryVariables>;
export const CreateConstructionDocument = gql`
    mutation CreateConstruction($newConstruction: NewConstructionInput!) {
  addConstruction(newConstruction: $newConstruction) {
    id
    name
    code
    shownName
    customShownName
    users {
      id
      familyName
      givenName
      email
    }
  }
}
    `;
export type CreateConstructionMutationFn = Apollo.MutationFunction<CreateConstructionMutation, CreateConstructionMutationVariables>;

/**
 * __useCreateConstructionMutation__
 *
 * To run a mutation, you first call `useCreateConstructionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConstructionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConstructionMutation, { data, loading, error }] = useCreateConstructionMutation({
 *   variables: {
 *      newConstruction: // value for 'newConstruction'
 *   },
 * });
 */
export function useCreateConstructionMutation(baseOptions?: Apollo.MutationHookOptions<CreateConstructionMutation, CreateConstructionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConstructionMutation, CreateConstructionMutationVariables>(CreateConstructionDocument, options);
      }
export type CreateConstructionMutationHookResult = ReturnType<typeof useCreateConstructionMutation>;
export type CreateConstructionMutationResult = Apollo.MutationResult<CreateConstructionMutation>;
export type CreateConstructionMutationOptions = Apollo.BaseMutationOptions<CreateConstructionMutation, CreateConstructionMutationVariables>;
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
  invoice(id: $id) {
    id
    status
    createdBy {
      id
      familyName
      givenName
    }
    createdAt
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
    requests {
      id
      requester {
        id
        email
        familyName
        givenName
      }
      judgements {
        id
        createdAt
        type
        user {
          id
          familyName
          givenName
          email
        }
      }
      status
      createdAt
    }
    requestPairStatus {
      receiverRequest {
        id
        status
      }
      requesterRequest {
        id
        status
      }
      invoiceStatusFromUserView
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
export const InvoiceIdReceiveDocument = gql`
    mutation InvoiceIdReceive($input: ReceiveInvoiceInput!) {
  receiveInvoice(input: $input) {
    id
  }
}
    `;
export type InvoiceIdReceiveMutationFn = Apollo.MutationFunction<InvoiceIdReceiveMutation, InvoiceIdReceiveMutationVariables>;

/**
 * __useInvoiceIdReceiveMutation__
 *
 * To run a mutation, you first call `useInvoiceIdReceiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvoiceIdReceiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invoiceIdReceiveMutation, { data, loading, error }] = useInvoiceIdReceiveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInvoiceIdReceiveMutation(baseOptions?: Apollo.MutationHookOptions<InvoiceIdReceiveMutation, InvoiceIdReceiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InvoiceIdReceiveMutation, InvoiceIdReceiveMutationVariables>(InvoiceIdReceiveDocument, options);
      }
export type InvoiceIdReceiveMutationHookResult = ReturnType<typeof useInvoiceIdReceiveMutation>;
export type InvoiceIdReceiveMutationResult = Apollo.MutationResult<InvoiceIdReceiveMutation>;
export type InvoiceIdReceiveMutationOptions = Apollo.BaseMutationOptions<InvoiceIdReceiveMutation, InvoiceIdReceiveMutationVariables>;
export const InvoiceIdDeclineToInputDocument = gql`
    mutation InvoiceIdDeclineToInput($input: DeclineInvoiceInput!) {
  declineInvoiceToInput(input: $input) {
    id
  }
}
    `;
export type InvoiceIdDeclineToInputMutationFn = Apollo.MutationFunction<InvoiceIdDeclineToInputMutation, InvoiceIdDeclineToInputMutationVariables>;

/**
 * __useInvoiceIdDeclineToInputMutation__
 *
 * To run a mutation, you first call `useInvoiceIdDeclineToInputMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvoiceIdDeclineToInputMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invoiceIdDeclineToInputMutation, { data, loading, error }] = useInvoiceIdDeclineToInputMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInvoiceIdDeclineToInputMutation(baseOptions?: Apollo.MutationHookOptions<InvoiceIdDeclineToInputMutation, InvoiceIdDeclineToInputMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InvoiceIdDeclineToInputMutation, InvoiceIdDeclineToInputMutationVariables>(InvoiceIdDeclineToInputDocument, options);
      }
export type InvoiceIdDeclineToInputMutationHookResult = ReturnType<typeof useInvoiceIdDeclineToInputMutation>;
export type InvoiceIdDeclineToInputMutationResult = Apollo.MutationResult<InvoiceIdDeclineToInputMutation>;
export type InvoiceIdDeclineToInputMutationOptions = Apollo.BaseMutationOptions<InvoiceIdDeclineToInputMutation, InvoiceIdDeclineToInputMutationVariables>;
export const InvoiceIdApproveDocument = gql`
    mutation InvoiceIdApprove($input: ApproveRequestInput!) {
  approveRequest(input: $input) {
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
  declineRequest(input: $input)
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
export const InvoiceIdReapplyDocument = gql`
    mutation InvoiceIdReapply($input: ReapplyRequestInput!) {
  reapplyRequest(input: $input)
}
    `;
export type InvoiceIdReapplyMutationFn = Apollo.MutationFunction<InvoiceIdReapplyMutation, InvoiceIdReapplyMutationVariables>;

/**
 * __useInvoiceIdReapplyMutation__
 *
 * To run a mutation, you first call `useInvoiceIdReapplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvoiceIdReapplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invoiceIdReapplyMutation, { data, loading, error }] = useInvoiceIdReapplyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInvoiceIdReapplyMutation(baseOptions?: Apollo.MutationHookOptions<InvoiceIdReapplyMutation, InvoiceIdReapplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InvoiceIdReapplyMutation, InvoiceIdReapplyMutationVariables>(InvoiceIdReapplyDocument, options);
      }
export type InvoiceIdReapplyMutationHookResult = ReturnType<typeof useInvoiceIdReapplyMutation>;
export type InvoiceIdReapplyMutationResult = Apollo.MutationResult<InvoiceIdReapplyMutation>;
export type InvoiceIdReapplyMutationOptions = Apollo.BaseMutationOptions<InvoiceIdReapplyMutation, InvoiceIdReapplyMutationVariables>;
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
export const IssueIdDocument = gql`
    query IssueId($id: String!) {
  invoice(id: $id) {
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
export const IssueIdUploadInvoiceFileDocument = gql`
    mutation IssueIdUploadInvoiceFile($invoiceId: String!, $file: Upload!) {
  uploadInvoiceFile(invoiceId: $invoiceId, file: $file) {
    pathName
    invoiceId
  }
}
    `;
export type IssueIdUploadInvoiceFileMutationFn = Apollo.MutationFunction<IssueIdUploadInvoiceFileMutation, IssueIdUploadInvoiceFileMutationVariables>;

/**
 * __useIssueIdUploadInvoiceFileMutation__
 *
 * To run a mutation, you first call `useIssueIdUploadInvoiceFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIssueIdUploadInvoiceFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [issueIdUploadInvoiceFileMutation, { data, loading, error }] = useIssueIdUploadInvoiceFileMutation({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useIssueIdUploadInvoiceFileMutation(baseOptions?: Apollo.MutationHookOptions<IssueIdUploadInvoiceFileMutation, IssueIdUploadInvoiceFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IssueIdUploadInvoiceFileMutation, IssueIdUploadInvoiceFileMutationVariables>(IssueIdUploadInvoiceFileDocument, options);
      }
export type IssueIdUploadInvoiceFileMutationHookResult = ReturnType<typeof useIssueIdUploadInvoiceFileMutation>;
export type IssueIdUploadInvoiceFileMutationResult = Apollo.MutationResult<IssueIdUploadInvoiceFileMutation>;
export type IssueIdUploadInvoiceFileMutationOptions = Apollo.BaseMutationOptions<IssueIdUploadInvoiceFileMutation, IssueIdUploadInvoiceFileMutationVariables>;
export const IssueIdViewDocument = gql`
    query IssueIdView($id: String!) {
  invoice(id: $id) {
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
export const ReceiptsDocument = gql`
    query Receipts {
  invoicesByStatus(status: awaitingReceipt) {
    id
    billingDate
    dueDateForPayment
    paymentAmount
    status
    construction {
      id
      name
    }
    companyId
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
  unconfirmedUser(email: $email) {
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