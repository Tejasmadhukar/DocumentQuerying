FROM node:18 AS base

RUN npm install -g pnpm

WORKDIR /home/node/app

COPY . /home/node/app/

ENV NODE_ENV=development

EXPOSE 3000

ENV PORT 3000

RUN pnpm i 

RUN npx prisma generate
RUN npx prisma db push

CMD [ "pnpm", "run", "dev" ]