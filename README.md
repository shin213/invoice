# invoice

## Git pre-commit hook set up

```bash
git config --local core.hooksPath .githooks
```

そして、ルートディレクトリに `.env` ファイルを設置(必要な人のみにGoogle docsで配布)

## Set up

```bash
docker-compose build
```

backend の開発のためにローカルで

```bash
cd back
npm i -g @nestjs/cli
npm i
```

をおすすめします．VSCode では，`back/`で作業することにより，うまく補完が読み込まれるようになります．

## Start

```bash
docker-compose up
```

このあと http://localhost に接続すると、front に接続できます。

## Test of backend

```bash
docker-compose exec back npm run test
```

## Show logs

```bash
docker-compose logs -f [コンテナ名(back, front, db)]
```

## 認証

Cognito を用いて認証を行う。

### 認証の準備(DBに入ってない場合。ここは seed.yml への記入にしたい)

- Cognito の認証を一度削除する

- admin (http://localhost:3080/) に akariinc.co.jp の google アカウントでログインし、UnconfirmedUserを登録する。

- front のユーザー登録からメールアドレス(**氏名とふりがなを必ずつけること**)

### 開発時の認証について(backend)

```
docker-compose exec back npm run login
```

で取得できる JSON を下の画面 (http://localhost:3000/graphql) の左下の HTTP HEADERS に貼り付ける。

![picture 1](docs/images/backend_dev_gql.png)  


