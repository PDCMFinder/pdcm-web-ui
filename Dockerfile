FROM node:lts-buster AS compile-image

WORKDIR /opt/react
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN yarn run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/nginx.conf
COPY nginx/site.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/react/build/ /usr/share/nginx/html
