# build env
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . ./
RUN npm run build-dev

# production env
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemo"]