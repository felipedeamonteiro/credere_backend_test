# Hiring Test - Credere
This is a backend aplication to the backend developer job in the company Credere.

## - Specifications and technologies used here

This project was built using `Nodejs` with `Typescript`.

Here, `node` version is `12.16.3` and the package manager used is `yarn` in version `1.22.5`.

The database used is `Postgres` with `Typeorm` as ORM (object-relational mapping). Besides that, the database is running in a `docker` image of postgres.

In tests, it's used `Jest` and `Coverage` reports to help.

To test the APIs it was used [`Insomnia`](https://insomnia.rest/) and [`DBeaver - v:7.2.1`](https://dbeaver.io/) as a database administration tool.

The archtecture of the project is based in DDD (Domain Driven Design).

## - How to run the project

### Docker


First of all, it's needed to install docker and download the postgres image. To install docker I suggest following instructions in this [link](https://www.notion.so/Instalando-Docker-6290d9994b0b4555a153576a1d97bee2#c7e37c6a26584d33b20cf332f2bdb31d).

After the instalation of docker, we need to create the database container with the correct image. [Here](https://hub.docker.com/_/postgres) you can see the docs of how to download the latest image from Postgres, but here's my suggestion to create the container and downloading image. It's important to follow the `password` and `ports` configuration as they are here. It's better to follow the command in terminal:
```
docker run --name conta_simples -e POSTGRES_PASSWORD=docker -p 5438:5432 -d postgres
```
After creating the container and downloading image, run to check if everything is ok:
```
docker ps
```
### DBeaver

To visualize the database with Dbeaver, open it and click:
- New database connection
- Postgres

A window will open with tab `Main`. There you should set:
- Host: localhost
- Port: 5438
- Database: credere-test
- Username: postgres
- Password: docker

In tab `PostgresQL`:
- Show all database: `check the box`

### Project

After downloading the code from the repository (and letting the docker running), run `yarn` to install all the dependencies.

After that, we need to create the tables in database, so run:
```
yarn typeorm migration:run
```
After that, to finish, run:
```
yarn dev:server
```
A message like this should appear in terminal:
```
🚗️ Server started on port 3333!
```
If so, enjoy the application!

### Code tests

To run tests and see coverage report:
```
yarn test
```

### Testing the API

Here I will not teach how to use Insomia, because there are a lot of tutorials out there, but I liked [this one](https://www.youtube.com/watch?v=3tB0uDliS6Y). It's in portuguese.

#### Create Movements and Car Coordinates

- Method: `POST`

- Endpoint:
```
http://localhost:3333/movements
```
- Body: `JSON`:
```
{
  TYPES:
  name: string,
  movement: string[]

  EXAMPLE
	"name": "John Doe",
	"movement": ["M", "GE", "M", "M"]
}
```
And then `status 200` should come with the new coordinates, pilot_name and car direction:

```
RESPONSE:
{
  "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "pilot_name": "John Doe",
  "xCoordinate": 1,
  "yCoordinate": 2,
  "carDirection": "up"
}
```

#### List Movements by pilot name

- Method: `GET`

- Endpoint:
```
http://localhost:3333/movements/:pilot_name
```
- Body: none:

And then `status 200` should come with all the movements made by the specified pilot:

```
RESPONSE:
[
   {
    "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "pilot_name": "John Doe",
    "movement": "GE,M,M,M,GD,M,M"
  },
  {
    "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "pilot_name": "John Doe",
    "movement": "GE,GE,M"
  },
]
```

#### List Car Coordinate by pilot name

- Method: `GET`

- Endpoint:
```
http://localhost:3333/coordinates/:pilot_name
```
- Body: none:

And then `status 200` should come with all the information about coordinates by the specified pilot:

```
RESPONSE:
{
  "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "pilot_name": "John Doe",
  "xCoordinate": 1,
  "yCoordinate": 2,
  "carDirection": "down"
}
```

#### Reset Car Coordinate by pilot name

- Method: `GET`

- Endpoint:
```
http://localhost:3333/coordinates/reset/:pilot_name
```
- Body: none:

And then `status 200` should come with an empty object:

```
RESPONSE:
{}
```
To confirm if the coordinate is (x, y) = (0, 0), use the list coordinates endpoint to be sure.

## Enjoy!
