dropdb transit

echo 'creating transit db'
# create the database
createdb transit

# set the default pass

echo 'setting schema'
# setup db
psql -d transit -c "
  CREATE EXTENSION postgis;
  CREATE TABLE stops
    ( stop_id    character(60),
      stop_code  character(60),
      stop_name  character(90),
      stop_lat   decimal,
      stop_lng   decimal
    );
  SELECT AddGeometryColumn('stops','stop','4326','POINT',2);
"

node import.js
