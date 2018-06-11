docker run \
    --name rest-api-sim-mongo \
    --publish 27017:27017 \
    --volume `pwd`/startup-scripts:/docker-entrypoint-initdb.d \
    --detach mongo:3.4