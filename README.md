# Front end application of Nest-restaurant-menu

To install this project, first you need to set up this [Nest.js backend API](https://github.com/auth0-blog/nest-restaurant-api) (including registering your Auth0 account and creating roles for users) and then you must go to the file `src/app/auth/auth.service.ts` and add there your Auth0 client ID and domain. When it is done, you must run the following commands to run this app:

```bash
npm install # it will install modules
ng serve --proxy-config proxy.config.js --open # it will start the server with the config proxy and open it on browser.
```