# Volleyball

## Options
- [X] Bulma CSS
- [X] Extend Wes Bos project (NEXTjs, GraphQL, Postgres)?
- [X] Styled Components

## Deployment
- [ ] Now
- [ ] Digital Ocean
- [ ] Heroku

## Features
- [ ] User should be able to create a team of players
- [ ] User should be able to edit a team
- [ ] User should be able to keep track of the score of a match/game
- [ ] User should be able to record serves, blocks, passes, and kills/attempts for each player
- [ ] User should be able to see a history of actions during a game

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

