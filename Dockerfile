FROM ubuntu:18.04
ENV NODE_VERSION=14.20.0
RUN apt update
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version



COPY . /


WORKDIR /server 
RUN npm install 
RUN node index.js & 

WORKDIR /mock-api-frontend
RUN npm install 
RUN npm install -g @angular/cli


CMD  [ "npm","run","start-docker" ]
