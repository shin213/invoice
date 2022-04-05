import { InvoiceStatus } from '../generated/graphql'

export const COGNITO_ERROR = {
  'User does not exist.': 'ユーザーが存在しません',
  'Incorrect username or password.': 'メールアドレスまたはパスワードが正しくありません。',
  'User is not confirmed.': 'ユーザーは検証されていません',
  'User already exists': 'ユーザーは既に存在します',
  'Invalid verification code provided, please try again.':
    '指定された確認コードが無効です。もう一度お試しください',
  'Invalid password format': 'パスワードのフォーマットが不正です',
  'Account recovery requires verified contact information':
    'アカウントの復元には確認済みの連絡先情報が必要です',
  'Invalid phone number format':
    '不正な電話番号フォーマットです。 電話番号は次のフォーマットで入力してください: +12345678900',
  'An account with the given email already exists.': 'そのメールアドレスは既に存在します',
  'Username cannot be empty': 'ユーザー名は必須です',
  'Password attempts exceeded': 'パスワード試行回数が超過しました',
  'Attempt limit exceeded, please try after some time.':
    '試行制限を超過しました。しばらくしてからもう一度お試しください',
  'Username/client id combination not found.': 'ユーザーが存在しません',
  'CUSTOM_AUTH is not enabled for the client.': 'パスワードは必須です', // 本来の意味とは異なるが、パスワード未入力時に発生するのでこの訳としている
  'Password does not conform to policy: Password not long enough':
    'パスワードは8文字以上を入力してください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
  'Password does not conform to policy: Password must have uppercase characters':
    'パスワードには大文字を含めてください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
  'Password does not conform to policy: Password must have lowercase characters':
    'パスワードには小文字を含めてください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
  'Password does not conform to policy: Password must have numeric characters':
    'パスワードには数字を含めてください (8文字以上の大文字小文字を含む英数字)', // 適宜修正
  "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
    'パスワードは8文字以上、小文字を含む英数字を指定してください', // 適宜修正。本来の意味とは異なるがこれで明示している。
  "2 validation errors detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[S]+.*[S]+$":
    'パスワードは8文字以上、小文字を含む英数字を指定してください', // 適宜修正。本来の意味とは異なるがこれで明示している。
}

export const INVOICE_STATUS: Record<Required<InvoiceStatus>, string> = {
  inputtingWithSystem: 'システム入力中',
  inputtingFile: 'システム外作成中',
  awaitingReceipt: '受領待ち',
  underApproval: '承認待ち',
  declinedToFile: 'システム外作成差戻し',
  declinedToSystem: 'システム入力差戻し',
  completelyApproved: '全承認済み',
}
