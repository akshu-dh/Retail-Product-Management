FROM openjdk:11
EXPOSE 5555
COPY target/points-microservice.jar app.jar
ENTRYPOINT [ "java", "-jar", "/app.jar" ]