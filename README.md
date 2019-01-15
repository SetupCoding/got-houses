# A PWA of Ice and Fire

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Code coverage

Install `http-server` using the following command: `npm i -g http-server`. 

Run `http-server -p 8001 coverage` and navigate to `http://127.0.0.1:8001/`.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Build for production

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build for GitHub Pages
Install `angular-cli-ghpages` using the following command: `angular-cli-ghpages`

Run `ng build --prod --base-href "https://setupcoding.github.io/got-houses/"`

After that run `npx ngh --dir=dist/got-houses`.

## Running distributive locally

Install `http-server` using the following command: `npm i -g http-server`. 

In `dist/got-houses/index.html` change the `<link rel="manifest" href="manifest.json">` to `<link rel="manifest" href="manifest-dev.json">`

Run `http-server -p 8080 dist/got-houses` and navigate to `http://localhost:8080/`.

## Running lighthouse

 Install `lighthouse` using the following command: `npm i -g lighthouse`.
 
 Run `lighthouse https://setupcoding.github.io/got-houses/ --view` or if running locally `lighthouse http://localhost:8080/ --view`.
