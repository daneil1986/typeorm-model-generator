FROM image-docker.zuoyebang.cc/base/node-builder:12.14-alpine as builder

WORKDIR /app
COPY ./ /app/
RUN yarn install && npm run build

FROM image-docker.zuoyebang.cc/base/node-runner:12.14-alpine

ARG APP_NAME
ENV APP_NAME $APP_NAME

COPY --from=builder /app/output /home/homework/output
COPY --from=builder /app/*.json /home/homework/
COPY --from=builder /app/*.lock /home/homework/
COPY --from=builder /app/node_modules /home/homework/node_modules

WORKDIR /home/homework
