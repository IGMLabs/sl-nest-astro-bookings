# 0 - New workspace

```bash
npx nest new ab-nest-astro-bookings

```

# 1 - Blocks

```
nest g pipe core/pipes/positiveNumber
nest g filter core/filters/BusinessError

nest g middleware core/middlewares/monitor
nest g module core
```

# 2 - Endpoint modules

```
npm i class-validator class-transformer

nest g module agencies
nest g controller agencies
nest g service agencies

nest g service core/services/utils
```

# 3 - Security

```
npm i helmet
npm i @nestjs/throttler

nest g guard agencies/api-key

npm i @nestjs/passport passport
npm i @nestjs/jwt passport-jwt
npm i --save-dev @types/passport-jwt

nest g module auth
nest g controller auth
nest g service auth

nest g service auth/jwt-strategy
```

# 4- Mongo

```
npm i mongoose @nestjs/mongoose
nest g filter core/filters/mongodb-error
```

# 5 - Postgres

```
npm i @nestjs/typeorm typeorm pg
```
