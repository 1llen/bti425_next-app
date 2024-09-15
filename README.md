This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Overview

This is a website that allows the user to browse artworks from the Metropolitan Museum of Art, and create an account to save artworks that they like.
It uses a combination of React and Bootstrap to facilitate the visual front-end components, such as cards and fields. 

## Data Sources
It pulls data from the Metropolitan Museum of Art Collection API; more information can be found at [https://metmuseum.github.io/](https://metmuseum.github.io/). 

# Features

## Login and User Information

Allows users to create an account and encrypts and stores their account information. Logins are authenticated using a Javascript Web Token.

## Search

Users are able to search through the database using common search terms in both the title and description of art pieces.

## Saving Art Pieces

Logged-in accounts can store their own curated list of their favourite artpieces, of which they can later browse through.

