FROM ubuntu:20.04

RUN apt-get update \
    && apt-get install -y curl \
    && cd ~ \
    && curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npm run build

CMD [ "npm", "start" ]