FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN if !yarn -- version > /dev/null; then npm i --global yarn; fi
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]
