FROM node:latest AS compile-image


COPY package.json yarn.lock ./
RUN yarn install && mkdir /pdcm && cp -R ./node_modules ./pdcm


WORKDIR /pdcm
COPY . .

RUN yarn run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /pdcm/build/ /usr/share/nginx/html
