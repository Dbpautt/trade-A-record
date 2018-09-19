# Project Name
trade-A-record
## Description

Tihs is an app that allows users to exchange vinyl records between them.
 
## User Stories

- **404** - As a user I want to receive feedback on the page if I'm getting into a non-existing page.
- **500** - As a user I want to see an error page when the page is not working because there's a server error and somebody is working.
- **homepage** - As a user I want to  understand the concept of the website and a short list of records that are currently traded and have the option to signup and login.
- **sign up** - As a user I want to sign up on the webpage to then trade records with other users.
- **login** - As a user I want to log in to browse records and to acces my account.
- **logout** - As a user when I'm done with my session I'd like to logout.
- **records list** - As a user I want to see all the records currently traded and filter the ones I'm interested in.
- **record detail** - As a user I want to see the record details and have the option to trade them with a record I own.
- **record request page** - As a user I want to offer a trade to get a record.
- **user profile** - As a user I want to see in my profile: a mini brief Bio, the list of records I currently offer and the incoming and outgoing requests. 
- **records create** - As a user I want to create a record I will trade.
- **solve request** - As a user I want review the trade offer.

## Backlog

List of other features outside of the MVPs scope

Login:
- login with username or email

User profile:
- reviews
- see other users profile

Records:
- Upload image
- spotify snippet
- owner history
- where initialy purchased

Trade:
- time limit
- solve request page - see more details on the offer
- give reviews


Geo Location:
- pick users to trade records with that are in your city
- set handover location after accepting the request
- show handover location in a map in request detail page
- show all places in a map where you have trated records



## ROUTES:

- GET / 
  - renders the homepage
  
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /records
  - redirects to /signup if anonymous user
  - renders the records list if logged in

- GET /records/details/:recordId
  - redirects to /signup if anonymous user
  - renders the record details if logged in

- GET /records/request/:recordId
  - redirects to /signup if anonymous user
  - renders the record request if logged in
- POST /records/request/:recordId
  - redirects to /signup if anonymous user
  - body:
      - userId
      - requested recordId
      - offered recordId
      - status: pending

- GET /profile/:userid
  - redirects to /signup if anonymous user
  - renders the user profile + record create form + pending requests inbound / outbound
  
- POST /record/create 
  - redirects to /signup if anonymous user
  - body: 
    - record name
    - cover image URL 
    - owner: userId
    - description
    - genre
    - release year
    - status
    
- POST /records/request/solve/:recordId
  - redirects to / if user is anonymous
  - body: 
    - update owner recordRequested
    - update owner recordOffered
    - update status request    


## Models

User model
 
```
username: {
type: String, 
required: true
},
email: {
type: String, 
required: true
},
password: {
type: String, 
required: true
},
location: {
type: String, 
required: false
},
genre-preference: {
type: String, 
required: false
}

```

Records model

```
owner:{
  type: ObjectId<User>,
  required: true
},
record-name:{
 type: String,
 required: true
},
artist:{
 type: String,
 required: true
},
cover-image-URL:{
 type: String,
 required: true
},
description:{
 type: String,
 required: true
},
genre:{
 type: String [enum: '','',''],
 required: true,
},
release-year:{
 type: number,
 required: true
},
status:{
  type: Boolean
  required: true
},
condition:{
  type:string [enum: 'grat','as new','good', 'used', 'scratch'],
  required: true
}


``` 

Trade model
 
```
status: {
type: String [enum: 'pending' , 'appoved' , 'rejected'], 
required: true
},
recordRequested: {
type: ObjectId<record>, 
required: false
},
recordOffered: {
type: ObjectId<record>, 
required: false
},


```

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

