FROM node:14.17.1

RUN mkdir /app
RUN mkdir /app/tweet-app
WORKDIR /app
COPY ./react/tweet-app/ ./tweet-app
RUN chmod +x -R ./tweet-app
WORKDIR /app/tweet-app
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true