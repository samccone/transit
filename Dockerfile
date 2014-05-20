FROM ubuntu

EXPOSE 8888

RUN apt-get update
RUN apt-get install -y nodejs npm wget

# install postgres and postgis
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" >> /etc/apt/sources.list'
RUN wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | sudo apt-key add -
RUN apt-get update
RUN apt-get install -y postgresql postgresql-9.3-postgis-2.1


ADD . /var/apps/transit

WORKDIR /var/apps/transit

RUN npm install

ENTRYPOINT sh main.sh