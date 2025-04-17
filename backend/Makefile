start_docker:
				docker-compose up -d
stop_docker:
				docker-compose stop
down_docker:
				docker-compose down
remove_postgres:
				docker stop pgsql-chain || true && docker rm pgsql-chain || true
createdb:
				docker exec -it pgsql-chain createdb --username=postgres --owner=postgres pumpfun
dropdb:
				docker exec -it pgsql-chain dropdb --username=postgres pumpfun
migrate_create:
				migrate create -ext sql --dir database/migration --seq $(file)
migrateforce:
				migrate -database "postgres://postgres:secret@10.1.28.121:5432/pumpfun?sslmode=disable" -path database/migration force 1
migrateup:
				migrate -database "postgres://postgres:secret@10.1.28.121:5432/pumpfun?sslmode=disable" -path database/migration up
migratedown:
				migrate -database "postgres://postgres:secret@10.1.28.121:5432/pumpfun?sslmode=disable" -path database/migration down
server:
				go run cmd/web/main.go
test:
				go test -v ./test/
