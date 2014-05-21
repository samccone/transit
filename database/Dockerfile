FROM ubuntu

EXPOSE 5432

RUN apt-get update
RUN apt-get install -y nodejs nodejs-legacy npm wget unzip

# install postgres and postgis
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" >> /etc/apt/sources.list'
RUN wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | sudo apt-key add -
RUN apt-get update
RUN apt-get install -y postgresql-9.3-postgis-2.1 libpq-dev

ADD . /var/apps/transit
WORKDIR /var/apps/transit
RUN chmod +x main.sh

# grab seed info from mbta
ADD http://www.mbta.com/uploadedfiles/MBTA_GTFS.zip /var/apps/transit/mbta.zip
RUN unzip -d seed/ mbta.zip

# install node deps
RUN npm install

ENTRYPOINT sh main.sh
