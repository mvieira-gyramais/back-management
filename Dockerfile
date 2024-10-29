FROM node:20

WORKDIR /home/app/management
COPY package.json ./
RUN npm install
COPY . .
CMD npx prisma generate && npx prisma db push && npm run start:dev 