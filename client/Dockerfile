FROM node:alpine
EXPOSE 3000
COPY . /home/app
WORKDIR /home/app
RUN yarn install
CMD ["yarn","start"]