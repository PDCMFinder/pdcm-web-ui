FROM node:16-alpine3.11 AS compile-image

WORKDIR /opt/react
COPY package.json yarn.lock ./
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN yarn run build

FROM nginx:latest
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/react/build/ /usr/share/nginx/html
