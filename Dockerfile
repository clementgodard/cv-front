### Stage 1 : Build ###
FROM node:14-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN ng build --prod

### Stage 2 : Deploy ###
FROM httpd:2.4-alpine
COPY --from=build /usr/src/app/dist/CVfront/ /usr/local/apache2/htdocs/
