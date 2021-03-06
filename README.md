# helpo [![CircleCI](https://circleci.com/gh/Jumpi96/helpo.png?circle-token=:circle-token)](https://circleci.com/gh/Jumpi96/helpo.png?circle-token=:circle-token) [![Coverage](https://codecov.io/gh/jumpi96/helpo/branch/master/graph/badge.svg)](https://codecov.io/gh/jumpi96/helpo/branch/master/graph/badge.svg)

> Proyecto Final - UTN FRC - 2018

Created with [Django React Boilerplate](https://github.com/vintasoftware/django-react-boilerplate).

## Conventions
### Coding
- **Python:** PEP 8 (https://www.python.org/dev/peps/pep-0008/)
- **JavaScript:** Create React App (https://www.npmjs.com/package/eslint-config-react-app)
- **HTML:** CodeGuide by Mark Otto (http://codeguide.co/)
- **CSS:** Idiomatic CSS (https://github.com/necolas/idiomatic-css)
### Documenting
- English or spanish accepted
### Tools
- IDE: [Visual Studio Code](https://code.visualstudio.com/)
- Console: [cmder](http://cmder.net/)
  - Go to settings (`Win+Alt+p`), startup, tasks, {{cmd:cmder}}, startup dir.. and select your GitHub directory
- Prototyping: [JustInMind](https://www.justinmind.com/)
- UML Modelling: [Enterprise Architect](http://www.sparxsystems.com/products/ea/) 
  - It's recommended to follow this [instructions](https://docs.google.com/document/d/1aiTtPPE9bWLdNnu2MVhimmbW6wWmoZtIJilpCCdZZQQ/edit?usp=sharing)
- Screenshots: [ScreenPresso](https://www.screenpresso.com/)

### Git
- Every time you start coding you should follow this workflow:
```
# Pull everything from all branches
git pull -a
# Check your selected branch
git branch
# Switch to your branch
git checkout your_branch
# Do your work and
git status
git add some_files
git commit -m "What you change"
git push
```
- Before making a Pull Request:
```
# Switch to master branch and pull
git checkout master
git pull
# Switch to your branch and update it
git checkout your_branch
git rebase master
```
- How to create, update and delete branches:
```
# If you want to create and switch to a new branch 
git checkout -b new_branch
# If you want to update your SELECTED branch from master after PULLING 
git rebase master
# If you want to delete your branch
git branch -d your_branch
```
- Useful tips:
```
# Rollback a commit you made on YOUR SELECTED branch
git revert commit_id
# Compare modified file
git diff your_file
# For more info visit:
https://gist.github.com/Chaser324/ce0505fbed06b947d962
```

## Running without Docker
### Prerequisites
- Python 3.6.5: Full install, select "Add to PATH", for all users, including debugging binaries (select all options).
- NodeJS and NPM LTS 8.11.1
- PostgreSQL 10.3.2: Full install, select all options, password=postgres, port=5432, next.
- Run CMD as Administrator and:
```
python -m pip install --upgrade pip
pip install pipenv
```
### Setup
- On pgAdmin, open Servers, PostgreSQL 10, right click on Databases and create db with name: `db-helpo`
- On project folder `helpo-api/`:
  - Create file with name `.env` and text: 
```
DJANGO_SETTINGS="helpo.settings.local"
URL_CLIENT="http://localhost:3000/"
```
- Run on `helpo-api/`: 
```
pipenv install --dev
pipenv shell
python manage.py migrate
python manage.py runserver
```
- On projec folder `helpo-web/`:
  - Create file with name `.env` and text `REACT_APP_API_URL="http://localhost:8000"`
- Run on `helpo-web/`: 
```
npm update
npm update --save
npm install
npm run start
```
## Running with Docker
### Prerequisites
- Install Docker.
- From root: `docker-compose build`
- On project folder `helpo-api/`:
  - Create file with name `.env` and text `DJANGO_SETTINGS="helpo.settings.docker"`
### Run
- From root: `docker-compose up`
  - For using pgAdmin4 (http://localhost:5050), *Create Server*.
    - Name: postgres
    - Host name: db
    - Password: postgres
### Migrations and Docker
- We have a problem with our optional use of Docker and migrations. **If you want to create or modify models in Django**, you have to:
  - Do not use Docker to *makemigrations* and *migrate*.
    - Change your .env file and run your DB with `docker-compose up db`.
    - Use *pipenv* to run your environment and run your Django *locally*.
    - Run `python manage.py makemigrations` and `python manage.py migrate` on your shell. 
  - To use Docker again, change your .env file, build your Docker image and run with *docker-compose*.
## Testing your deployment
- Open a browser and go to `localhost:8000`

## Running helpo-mobile
### Prerequisites
- Android: have a **Android emulator** working.
  - Note: be creative, it is may not be fast and easy. I had many errors that were solved just searching in Google.
- iOS: be Luciano.
### Setup
- Execute: `react-native run-android`
### Run
#### Android
- Run `react-native run-android` o `npm start`.
  - Double R should reload the emulator with changes.
#### iOS
- Run `react-native run-ios`

### Using local API
- Add your *server* (the IP where the JS bundler is working) IP to `base.py` configuration file. For example, 10.0.2.2.
  - Add to *ALLOWED_HOSTS* (without the port) and *CORS_ORIGIN_WHITELIST* (with its port --> 10.0.2.2:8000).
- Change IP of `api.js` configuration file in helpo-mobile.

