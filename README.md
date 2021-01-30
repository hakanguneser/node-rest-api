# node-rest-api 
This is a REST API application made with Express. This service can handle all CRUD operations for Member collection.

### Installation

First, clone the repository:
```sh
git clone https://github.com/hakanguneser/node-rest-api node-rest-api
```
Next, run the following commands to start the Express server:

```sh
cd node-rest-api
npm install
npm run start
```
### Creating DB on local environment
If local database needed, docker compose file is ready. 
```sh 
docker-compose -f .\config\docker-compose.yml up -d
```

**Navigate** to `localhost:3000` to see the API. You should see links to `/members` and `/members/:memberId`. Navigate to one of these to see user data from application.

this API currently provides a Member resource only. It corresponds to the `/members` endpoints from application. You can use POST, PUT and DELETE with this route.

## Sample Member
```sh
{
    "_id": "6014c3299fc74016407b4d03",
    "firstName": "Harry James",
    "lastName": "Potter",
    "email": "harry@mail.com",
    "age": 25,
    "__v": 0
}
```

### Useful Links
[Application Base URL](http://localhost:3000)
[API Swagger Documentation](http://localhost:3000/api-doc)