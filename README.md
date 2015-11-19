# meetarang
Meetarang is a simple web application for Meetup organizers.

## Useful commands

See the scripts in package.json for details

`npm test` will execute all Jasmine specs

`npm start` will build the project and run on a local server at [http://localhost:8080](http://localhost:8080)

`npm run release` will build an uglified app into the dist/ directory

-npm run api' will start API

## Vagrant VM

The project uses [Couchbase](http://couchbase.com) for persistence. To avoid the sideshow of helping contributors set it up on their special snowflakey systems we are providing a Vagrant VM that installs all the backend things.

1. Install [Vagrant](https://vagrantup.com).
1. Install [VirutalBox](https://virtualbox.org).
1. Run `vagrant up`.
1. After the Ubuntu VM is created and Couchbase is installed, open your browser and go to [http://localhost:8091](http://localhost:8091).
1. Accept the defaults for every wizard step. In Step 5 use "password" for the password field.

## Style Guide
- 4 spaces instead of tabs ;)
- Prefer ES6 over ES5

### Frontend
- Follow John Papa's [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)

### Backend
- Develop each API feature as a Hapi plugin [[link](https://twitter.com/hapijs/status/568547679174660096)]

## Major dependencies
- [NodeJS >= 4.0](https://nodejs.org)
- [Webpack](https://webpack.github.io)
- [AngularJS](https://angularjs.org/)
- [Angular Material](https://material.angularjs.org/)
- [UI-Router](https://github.com/angular-ui/ui-router)
- [Sass](http://sass-lang.com/)
- [HapiJS](http://hapijs.com/)