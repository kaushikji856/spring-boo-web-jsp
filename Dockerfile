#Pull base image
from tomcat:8-jre8

#Maintainer
MAINTAINER "kaushikji85@gmail.com"

#copy war file to container
COPY ./Spring-Boot-AWS.war /usr/local/tomcat/webapps
