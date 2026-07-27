# Lush Assessment

## Objective

Build a GraphQL API server using NodeJS, TypeScript, Yoga GQL, Prisma, and Pothos GraphQL to manage task lists and their tasks. This assignment evaluates your understanding of GraphQL principles, schema design with Pothos, relational data modelling, TypeScript usage, and general backend development practices.

## Setting up

In order to run the project you will first need node (tested with v24.18.0) and npm (tested with v12.0.1).

If you are using a Windows device and need to install node, I recommend using [nvm](https://github.com/coreybutler/nvm-windows). For Mac, you can follow this [guide](https://www.geeksforgeeks.org/installation-guide/how-to-install-nodejs-on-macos/).

Once you have node and npm installed, run `npm i` in the project root in order to install the required dependencies.

## Running the Task List API

The API runs on port `3000`. Run `npm run start` and go to `http://0.0.0.0:3000/graphql` to access the Yoga GraphiQL playground.

> ⚠️ **IMPORTANT**
>
> After finishing do not forget to close down docker by running `docker compose down`

### Example queries

Get all the task lists

```
query {
  allTaskList {id, name, createdAt, numberOfTasks}
}
```

Get a task by the ID

```
query {
  taskById(id: 5) {id, title, completed, createdAt, updatedAt, taskListId}
}
```

Get all tasks from a list

```
query {
  taskByTaskListId(taskListId: 1) {id, title, completed, createdAt, updatedAt}
}
```

Add a task list

```
mutation {
  addTaskList(data: {name: "testing-10"}) {id, name}
}
```

Add a task

```
mutation {
  addTask(data: {title: "testing", taskListId: 1}) {id, title, taskListId}
}
```

Update a task's completed status

```
mutation {
  updateTask(id: 1, completed: true) {id, title, completed}
}
```

Update a task's title

```
mutation {
  updateTask(id: 1, title: "NewTitle") {id, title}
}
```

Delete a task

```
mutation {
  deleteTask(id: 1) {id}
}
```

## Potential Improuvements

### Testing

Adding tests for:

- All mutations (creating, updating, deleting): Testing basic behaviour using both unit and integration tests
- Schema validation: Ensuring the GraphQL API maintains consistant type definitions
- Error handling: GraphQL has unique Error handling so best to test it
- Performance testing (optional): Making sure we prevent expensive queries

### Usability improvements

- Adding pagination: Using cursor since that is more efficient when the database gets bigger. Limiting it to 10 per page for readibility.
- Better error handling:
  - Extracting the zod message into Error variables to avoid repitition and help with consistancy.
  - Add additional zod messages.
  - Making sure the requests for records that do not exist (e.g. task, updateTask, deleteTask with an unknown id) fail in a consistent, deliberate way — not with an unhandled Prisma error.
  - Handle the Prisma errors by extracting the `error.meta.cause` and using that to make the error troubleshooting easier.
- Setting up a more user-friendly way of adding tasks to a taskList
