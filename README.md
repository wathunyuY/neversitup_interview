# Neversitup Backend Test (Nodejs)

## Installation

Step 1. run following docker command

```bash
docker-compose -f "docker-compose.yml" up -d --build
```
Step 2. connect to database
- Host:`localhost`
- Username: `root`
- Password: `rootroot`
- Database: `nerversitup`

Step 3. Import data from `neversitup.sql` to database for test

Step 4. Import file `nerversitup.postman_collection` and `neversitup.postman_environment` to `Postman`

## Tips
- Please restart docker-compose when testing does not work. Restart by following command:
```bash
docker-compose restart
```
