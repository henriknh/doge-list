# doge-list

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Run with Docker

```
docker build -t henriknh/doge-list .
docker run -it -p 8080:8080 --rm --name henriknh-doge-list-1 henriknh/doge-list
```

App should now we accessable at `localhost:8080`
