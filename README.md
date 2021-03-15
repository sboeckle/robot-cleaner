# Robot-Cleaner

simple service that simulates a robot cleaning an area (grid)

Offers REST API for

- GET /tibber-developer-test/enter-path
  - returns all executions saved in DB
- POST /tibber-developer-test/enter-path
  - creates new execution and saves it to DB
  - example POST Data
  - ```
    POST req data:
    {
      "start": {
        "x": 10,
        "y": 22
      },
      "commands": [
        {
          "direction": "east",
          "steps": 2
        },
        {
          "direction": "north",
          "steps": 1
        }
      ]
    }
    Response:

    {
      "id": 1,
      "timestamp": "2021-03-15T14:48:13.106Z",
      "commands": 0,
      "result": 0,
      "duration": "0.000047"
    }
    ```


## Notes

- mind that there was a typo in the requirement doc `commmands` was corrected to `commands`
- robot is not cleaning starting point without moving, will only clean when its moving (steps > 0)
- its expected that only valid calls are beeing made

# How to use

## docker-compose

have docker and docker-compose installed

### normal mode:
- run from project root `docker-compose -f docker/docker-compose.yml up`
  - this will spin up a postgresql and creates the schema (see ./bootstrap/create-db.sh for details)

### dev mode
- run from project root `docker-compose -f docker/docker-compose-dev.yml up`
  - will start the service with nodemon and uses volumes, so filechanges will imediately take changes upon save
- to rebuild (after DB changes) run from project root `docker-compose -f docker/docker-compose-dev.yml down && docker-compose -f docker/docker-compose-dev.yml build`

## run independently

Two options:

1. build and run docker file
   1.  have database running (postgresql)
   2.  build
       1.   run from project root `docker build -f ./docker/Dockerfile .`
       2.   and run build images afterwards with portmappings etc.
2. just run `npm start` having node >= 14.16 and npm installed

for both options make sure environments for DB are set correctly
  - can be set via process.env vars, check ./config.js for details