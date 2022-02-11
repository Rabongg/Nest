FROM node:16-alpine
RUN apk update
COPY ./ /home/nest/
WORKDIR /home/nest
RUN yarn
EXPOSE 7000
CMD ["yarn", "start:dev"]