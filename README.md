# Lush Assessment

## Objective

Build a GraphQL API server using NodeJS, TypeScript, Yoga GQL, Prisma, and Pothos GraphQL to manage task lists and their tasks. This assignment evaluates your understanding of GraphQL principles, schema design with Pothos, relational data modelling, TypeScript usage, and general backend development practices.

## Setting up

In order to run the project you will first need node (tested with v24.18.0) and npm (tested with v12.0.1).

If you are using a Windows device and need to install node, I recommend using [nvm](https://github.com/coreybutler/nvm-windows). For Mac, you can follow this [guide](https://www.geeksforgeeks.org/installation-guide/how-to-install-nodejs-on-macos/).

Once you have node and npm installed, run `npm i` in the project root in order to install the required dependencies.

## Running the Task List API

The API runs on port `3000`. Run `npm run start` and go to `http://0.0.0.0:3000/graphql` to access the Yoga GraphiQL playground.

### Example queries
```
mutation {
  addTaskList(data: {name: "testing-10"}) {
    name
  }
}
```

## Decisions

## Potential Improuvements
