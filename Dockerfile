FROM node:16-alpine
ENV NODE_ENV test
COPY ./ /home/nest/
WORKDIR /home/nest
RUN yarn
EXPOSE 7000
CMD ["yarn", "start:dev"]