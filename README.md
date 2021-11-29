# React Test Shop Using Remix

![Home Page](assets/screenshot-home.png)

## Development

React Test Shop makes API calls to and external server. First set up this server by cloning the
[React Test Shop Server](https://github.com/nareshbhatia/react-test-shop-server)
repository and following the instructions there to start the API server on
port 8080.


Now run this project from another shell:

```sh
yarn dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
yarn build
```

Then run the app in production mode:

```sh
yarn start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app
server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You
can run that again to create a new project, then copy over your `app/` folder to
the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
