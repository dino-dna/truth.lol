FROM node:alpine
ENV NODE_ENV=production
RUN mkdir -p /api/public
COPY ./packages/api /api
COPY ./packages/ui/build/* /api/public/
WORKDIR  /api
RUN npm install
CMD ["npm", "start"]
