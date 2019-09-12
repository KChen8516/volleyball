# Volleyball

## Options
- [X] Bulma CSS
- [X] Extend Wes Bos project (NEXTjs, GraphQL, Postgres)?
- [X] Styled Components
- [ ] useForm custom hook

## Features
- [X] User should be able to create/edit/delete a player
- [X] User should be able to create/edit/delete a team of players
- [X] User should be able to record serves, blocks, passes, and kills/attempts for each player
- [X] User should be able to view individual highlights of a player during a game
- [X] User should be able to see a history of actions for a player during a game
- [ ] User should be able to keep track of the score of a match/game

## Running Frontend
```
npm run dev
```

## Running Backend
Update the Prisma DB 
```
npm run deploy
```
Start the Backend locally 
```
npm run dev
```

### Creating a new type
Make sure to update ```datamodel.graphql``` first. Once the model is available on the BE, update ```schema.graphql``` with the Query or Mutations you want. Then update the correct resolver (Mutation, Query) where you can reference generated/prisma.graphql for options.

```schema.graphql``` represents the public facing API for clients to consume.

## Deployment
- [X] Now
- [X] Heroku
- [ ] Digital Ocean

### Backend
*Database:* The Postgres DB and server are both hosted by Heroku and managed through Prisma. 

*Yoga GraphQL Server:* Download the Heroku CLI or install it through `brew`. Once installed login through the CLI with `heroku login`. We've separated deployments between a heroku backend and heroku front end workflow. We push subfolders up to the new heroku remotes by using `git subtree push --prefix {folder-name} {remote-name} {remote-branch-name}`.
[Production GraphQL Playground](https://stat-track-yoga-prod.herokuapp.com)
