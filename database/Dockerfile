FROM ubuntu

RUN apt-get update
RUN apt-get install -y wget


RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
RUN apt-get update
RUN apt-get -y install postgresql-9.3 postgresql-9.3-postgis-2.1

ADD . /var/apps/transit
WORKDIR /var/apps/transit

EXPOSE 5432

ENTRYPOINT sh main.sh
