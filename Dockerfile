FROM node:lts-buster AS compile-image

WORKDIR /opt/react
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN yarn run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/react/build/ /usr/share/nginx/html
