FROM ubuntu

EXPOSE 8888

RUN apt-get update
RUN apt-get install -y nodejs npm wget unzip

# install postgres and postgis
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" >> /etc/apt/sources.list'
RUN wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | sudo apt-key add -
RUN apt-get update
RUN apt-get install -y postgresql postgresql-9.3-postgis-2.1

# grab seed info from mbta
ADD http://www.mbta.com/uploadedfiles/MBTA_GTFS.zip /var/apps/transit/mbta.zip

ADD . /var/apps/transit
WORKDIR /var/apps/transit

RUN unzip -d seed/ mbta.zip

RUN npm install
ENTRYPOINT sh main.sh