FROM openjdk:11.0.13-oraclelinux7

RUN mkdir /app
WORKDIR /app
COPY ./Tweet-App-0.0.1-SNAPSHOT.jar .
ENV SPRING_DATASOURCE_URL="jdbc:mysql://172.16.2.30:3306/tweet_app_db" \
    SPRING_DATASOURCE_USERNAME="root" \
    SPRING_DATASOURCEPASSWORD="root" \
    SPRING_WEB_ORIGIN_IP="http://192.168.10.103" \
    SPRING_SECURITY_SECRET_KEY="sK;w?g%s@S6R3#a"