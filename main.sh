/etc/init.d/postgresql start

echo 'creating transit db'
# create the database
sudo su - postgres -c "createdb transit"

# set the default pass
sudo su - postgres -c "psql -c \"ALTER USER postgres WITH PASSWORD 'password'\""

echo 'setting schema'
# setup db
sudo su - postgres -c "psql -d transit -c \"
  CREATE EXTENSION postgis;
  CREATE TABLE stops
    ( stop_id    character(60),
      stop_code  character(60),
      stop_name  character(90)
    );
  SELECT AddGeometryColumn('stops','stop','4326','POINT',2);
\""

echo 'importing transit info'
nodejs import.js

echo 'starting app'
nodejs index.js
