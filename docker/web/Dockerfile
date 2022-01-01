FROM node:14.17.1

RUN mkdir /app
RUN mkdir /app/tweet-app
WORKDIR /app
COPY ./react/tweet-app/ ./tweet-app
WORKDIR /app/tweet-app
RUN npm install
RUN chmod +x ./node_modules/.bin/react-scripts
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true