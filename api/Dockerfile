FROM ubuntu

RUN apt-get update
RUN apt-get install -y nodejs nodejs-legacy npm libpq-dev

ADD . /var/apps/transit
WORKDIR /var/apps/transit

RUN npm install

EXPOSE 8888

ENTRYPOINT sh main.sh
