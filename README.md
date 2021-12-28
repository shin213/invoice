# invoice

## Set up

```bash
docker-compose build
```

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
