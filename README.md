# my-movies
My movies is a test web app build with a Koa server/api and VueJS frontend.

## Prerequisites
* node 16
* yarn
* mongodb 6.0

## Install and run server for production
```
yarn install
MONGODB_URI="mongodb://localhost/my-movies" yarn start:prod
```

## Install and run server for development
```
yarn install
yarn start:dev  //starts the koa server for development
yarn serve      //starts vuejs for development
```

## How to run lint
```
yarn lint:server
yarn lint:vue
```
