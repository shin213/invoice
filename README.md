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
