FROM ubuntu

EXPOSE 8888

RUN apt-get update
RUN apt-get install -y nodejs nodejs-legacy npm

ADD . /var/apps/transit
WORKDIR /var/apps/transit

RUN npm install

ENTRYPOINT sh main.sh
