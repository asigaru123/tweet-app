#!/bin/bash
cd /home/ec2-user
cp /home/ec2-user/springboot/target/Tweet-App-0.0.1-SNAPSHOT.jar docker/app/
docker-compose build