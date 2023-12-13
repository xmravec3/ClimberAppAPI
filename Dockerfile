FROM node:20-slim

# install system-wide deps for python and node
RUN apt-get -yqq update
RUN apt-get -yqq install python3 python3-venv python3-pip
RUN python3 -m venv /opt/venv

# create address file, where app will be
WORKDIR /usr/src/app

# copy content
COPY package*.json jest.config.ts tsconfig.json requirements.txt getKNNForDB.py ./
COPY python ./python
COPY src ./src

# install dependencies
RUN npm install
RUN npm run build

RUN /opt/venv/bin/pip3 install -r requirements.txt

EXPOSE 3000

# run project
CMD ["npm", "run", "start"]