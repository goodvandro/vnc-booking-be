cd $(dirname "$0")/..

# Wait for PostgreSQL to be ready
# DATABASE_HOST=${DATABASE_HOST:-postgres.mef.srv}
# DATABASE_PORT=${DATABASE_PORT:-5432}
# DATABASE_USERNAME=${DATABASE_USERNAME:-mef}
# DATABASE_NAME=${DATABASE_NAME:-mef}
# DATABASE_PASSWORD=${DATABASE_PASSWORD}

# until pg_isready -h ${DATABASE_HOST:-postgres.mef.dom} -p ${DATABASE_PORT:-5432} -U "${DATABASE_USERNAME:-mef}" -d "${DATABASE_NAME:-mef}"; do
#   echo "Waiting for PostgreSQL to be ready in ${DATABASE_HOST:-postgres.mef.dom} on port ${DATABASE_PORT:-5432} as user ${DATABASE_USERNAME:-mef} ..."
#   sleep 2
# done


# cp templates/.env ./
APP_LOG=/var/log/app.log

touch "${APP_LOG}"

# Criar o arquivo de log

APP_MODE_LC=$(echo "$APP_MODE" | tr '[:upper:]' '[:lower:]')

# echo "USING MODE $ ${APP_MODE_LC}"
# if [ "$APP_MODE_LC" = "test" ] || [ "$APP_MODE_LC" = "prod" ]; then
#   echo "RUNNING BUILD VERSION"
#   npm run start > "${APP_LOG}" 2>&1 &
# else
#   echo "RUNNING DEVELOP VERSION"
#   npm run develop > "${APP_LOG}" 2>&1 &
# fi

npm run develop > "${APP_LOG}" 2>&1 &

## Manter o container ativo, exibindo o log com o tail
tail -f "${APP_LOG}"
