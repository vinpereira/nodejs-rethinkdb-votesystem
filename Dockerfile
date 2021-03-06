FROM node:8.9.4

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY npm-shrinkwrap.json /usr/src/app/
COPY wait-for-it.sh /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
# CMD [ "npm", "run", "docker" ]
RUN ["chmod", "+x", "/usr/src/app/wait-for-it.sh"]