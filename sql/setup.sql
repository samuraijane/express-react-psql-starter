DROP DATABASE IF EXISTS express_react_psql_starter;
CREATE DATABASE express_react_psql_starter;
\c express_react_psql_starter
BEGIN;
\i './sql/tables/users.sql'
COMMIT;
