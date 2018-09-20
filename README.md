# Project Name
trade-A-record
## Description

Tihs is an app that allows users to exchange vinyl records between them.
 
## User Stories

- **404** - As a user I want to receive feedback on the page if I'm getting into a non-existing page.
- **500** - As a user I want to see an error page when the page is not working because there's a server error and somebody is working.
- **accept request** - As a user I want to accept a trade offer.
- **homepage** - As a user I want to  understand the concept of the website and a short list of records that are currently traded and have the option to signup and login.
- **sign up** - As a user I want to sign up on the webpage to then trade records with other users.
- **login** - As a user I want to log in to browse records and to acces my account.
- **logout** - As a user when I'm done with my session I'd like to logout.
- **records list** - As a user I want to see all the records currently traded .
- **record detail** - As a user I want to see the record details and have the option to trade them with a record I own.
- **record request page** - As a user I want to offer a trade to get a record.
- **record create** - As a user I want to create a record I will trade.
- **user profile** - As a user I want to see my profile with a Bio, 
- **incoming requests** - As a user I want to see the list of my incoming requests
- **outgoing requests** - As a user I want to see my outgoing requests status.
- **my records** -As a user I want to see the list of records I currently offer. 
- **reject request** - As a user I want to reject a trade offer.

## Backlog

List of other features outside of the MVPs scope

Records List:
- most wanted
- recently listed
- previously owned
- filter the ones I'm interested in.

Login:
- login with username or email

User profile:
- reviews
- see other users profile
- Edit profile
- See requests history

Records:
- Upload image
- Delete record
- Edit record
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

@Todo actions eg. check if if I already own the record

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
  - redirect to /profile

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
  - redirect to /
  
- GET /records
  - redirects to /signup if anonymous user
  - renders the records list if logged in

- GET /records/:recordId
  - redirects to /signup if anonymous user
  - next 404 if the record is invalid or the record doesn't exist
  - renders the record details if logged in

- GET /records/:recordId/request
  - redirects to /signup if anonymous user
  - next 404 if the record is invalid or the record doesn't exist
  - renders the record request if logged in
  
- POST /records/:recordId/request
  - redirects to /signup if anonymous user
  - redirect to /records/:recordId/request if the record is invalid or the record doesn't exist
  - body:
      - offered recordId
  - 
  
- GET /profile
  - redirects to /signup if anonymous user
  - renders the user profile + record create form + pending requests inbound / outbound
  
- POST /record 
  - redirects to /signup if anonymous user
  - body: 
    - record name
    - cover image URL 
    - description
    - genre
    - release year
    - status
  - saves record
  - redirect to /profile
  
- GET /record/:recordId
  - redirects to /signup if anonymous user
  - renders the record detail page

- POST /trade/:tradeId/approve
  - redirects to / if user is anonymous
  - redirect to /profile if the tradeId is invalid 
  - update status request    
  - redirect to /profile if the tradeId doesn't exist or the trade status is not pending, or if I'm not the owner of the requestApprover
  - update owner recordRequested
  - update owner recordOffered
  - redirect to /profile
  - delete the other requests (or change the status to archived to the incoming and outgoing requests)
    - trades where the recordRequested is one of the two above or record offered it one of the two above 
  
- POST /trade/:tradeId/reject
@todo 

## Models

User model
 
```
username: String // required
password: String // required
location: String //  Not required
genrePreference: String, 
required: false
}
 // email:String // backlog required
```

Records model

```
owner:{
  type: ObjectId<User>,
  required: true
},
recordName:{
 type: String,
 required: true
},
isActive:{
  type: Boolean
  required: true
},

artist:{
 type: String,
 required: true
},
coverImageURL:{
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
releaseYear:{
 type: number,
 required: true
},
,
condition:{
  type:string [enum: 'great','as new','good', 'used', 'scratched'],
  required: true
}


``` 

Trade model
 
```
status: {
type: String [enum: 'pending' , 'approved' , 'rejected'], 
required: true
},
recordRequested: {
type: ObjectId<record.record-name>, 
required: false
},
recordOffered: {
type: ObjectId<record.record-name>, 
required: false
},
requestMaker: {
type: ObjectId<record.owner>, 
required: false
},
requestApprover: {
type: ObjectId<record.owner>, 
required: false
}



```

## Links

### Trello

[Link to your trello board](https://trello.com/b/5ADQ0fpq/irnhck-trade-a-record) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/Dbpautt/trade-A-record)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

