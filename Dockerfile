FROM chuting/node:19.6.0-v1
COPY . ./console-lib
WORKDIR /project/console-lib
RUN echo 'nodejs@19.6.0'
