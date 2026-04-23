# Next.js CRUD Assignment

Simple User CRUD app built with Next.js App Router and JSONPlaceholder API.

## Tech Stack

- Next.js (App Router)
- React
- JavaScript
- Fetch API

## API Used

Base URL: `https://jsonplaceholder.typicode.com`

Endpoints used:

- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

## Pages

- `/users` - list all users
- `/users/[id]` - view, update, and delete one user

## Features

- Fetch all users and show name + email
- View user details page
- Update user with prefilled form (optimistic update)
- Delete user and redirect to users page (optimistic delete)
- Basic loading and error handling

## Optimistic Behavior

- Update: UI updates first, then API call runs
- Delete: UI removes user first, then API call runs

Since JSONPlaceholder is a fake API, changes are not permanent on server side.

## Run Locally

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Build

```bash
npm run build
npm run start
```
