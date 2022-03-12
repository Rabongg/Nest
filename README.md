# Nest


------------
### 필요조건
+ Node.js 16.X
+ yarn
+ .env.development or .env.test or .env.production
------------
## 실행방법

### Local에서 서버 실행
```
$ yarn
```

- development 모드로 실행 
```
$ yarn start:dev
```

- swagger document
[swagger 문서](http://localhost:7000/api)


### docker로 실행
- docker-compose 이용
```
docker-compose up -d
```

- Dockerfile 변경했을 시
```
docker-compose up -d --build
```

------------
## 연동
### 로그인
- 카카오
- 네이버
- 구글

### 데이터베이스
- Redis 5.0.7
- Mysql 8.0.28
- MongoDB 4.4.12
