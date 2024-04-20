FROM node
WORKDIR /app
RUN apt-get install git
RUN git clone https://github.com/UAF-Software-Construction-CS-372/Software-Construction-Project.git
COPY . .
RUN npm install
RUN sed -i 's/localhost:27017/db:27017/g' server.js
CMD node server.js