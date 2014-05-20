/etc/init.d/postgresql start

# create out databse
sudo su - postgres -c "createdb transit"

# enable postgis extensions
sudo su - postgres -c "psql -d transit -c \"CREATE EXTENSION postgis;\""

nodejs import.js

nodejs index.js