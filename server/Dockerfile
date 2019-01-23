FROM node:alpine
EXPOSE 9000
COPY . /home/app
WORKDIR /home/app
RUN yarn install
RUN yarn build
CMD ["yarn","serve"]