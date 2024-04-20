FROM node
WORKDIR /app
COPY . .
RUN npm install
RUN sed -i 's/localhost:27017/db:27017/g' server.js
CMD node server.js