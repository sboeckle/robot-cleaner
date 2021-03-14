#!/bin/bash
set -e

POSTGRES="psql --username ${POSTGRES_USER}"

echo "Creating database: ${POSTGRES_DATABASE}"

$POSTGRES <<EOSQL
CREATE DATABASE ${POSTGRES_DATABASE} OWNER ${POSTGRES_USER};
EOSQL

echo "Creating schema..."
psql -d ${POSTGRES_DATABASE} -a -U${POSTGRES_USER} -f /schema.sql