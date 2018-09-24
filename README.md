# Project Name

trade-A-record

## Description

This is an app that allows users to exchange vinyl records between them.


*This project uses SCSS. Use the following line to compile to CSS while you are coding:*


```node-sass --output-style compressed --source-map true --watch styles/style.scss public/stylesheets/style.css```
 
## User Stories

- **404** - As a user I want to receive feedback on the page if I get into a non-existing page.
- **500** - As a user I want to see an error page when the page is not working because there's a server error.
- **accept requests** - As a user I want to accept a trade offer.
- **homepage** - As a user I want to understand the content of the website, and see a short list of records that are currently traded, and have the option to signup and login.
- **sign up** - As a user I want to sign up to the webpage so that I can then trade records with other users.
- **login** - As a user I want to log in to browse records, and to acces my account.
- **logout** - As a user I want to log out of my current session when I'm done.
- **records list** - As a user I want to see all the records that I am currently trading .
- **records detail** - As a user I want to see a detailed list of all records currently traded, so that I can then trade them with a record I own.
- **records request page** - As a user I want to offer a record for trade so that I can get a record I am interested in.
- **records create** - As a user I want to create a profile of a record I want to trade.
- **user profiles** - As a user I want to see my profile with a short bio. 
- **incoming requests** - As a user I want to see the list of the incoming requests
- **outgoing requests** - As a user I want to see the outgoing trade requests.
- **my records** -As a user I want to see the list of records I currently offer. 
- **reject request** - As a user I want to be able to reject a record that is offered to me for trade.

## Backlog

List of other features outside of the MVPs scope:

Records List:
- Most wanted
- Recently listed
- Previously owned
- Filter the ones I'm interested in

User profile:
- Reviews
- See other users' profile
- Edit profile
- See my request history

Records:
- Upload image
- Delete record
- Edit record
- Spotify snippet
- Owner history
- Where initially purchased

Trade:
- Time limit
- Solve request page - see more details about the offer
- Give reviews

Geo Location:
- Pick users to trade records with that are in your city
- Set handover location after accepting the request
- Show handover location in a map in request detail page
- Show all places in a map where you traded records


## ROUTES:

@Todo actions eg. check if I already own the record

- GET / 
  - renders the homepage
  
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
  
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
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
  - next 404 if records invalid or records don't exist
  - renders records' details if logged in

- GET /records/:recordId/request
  - redirects to /signup if anonymous user
  - next 404 if records invalid or records don't exist
  - load the requested record
  - load the logged in user`s records
  - renders records request if logged in
  
- POST /records/:requestedRecordId/:offeredRecordId/request
  - redirects to /signup if anonymous user
  - redirect to /records/:recordId/request if records invalid or records don't exist or offrerd record not owned by current user
  - body: (empty)
      
- GET /profile
  - redirects to /signup if anonymous user
  - renders the user profile + records create form + pending requests inbound / outbound
  
- POST /records
  - redirects to /signup if anonymous user
  - body: 
    - record name
    - cover image URL 
    - description
    - genre
    - release year
    - status
  - saves records
  - redirect to /profile
  
- GET /records/:recordId
  - redirects to /signup if anonymous user
  - renders records detail page

- POST /trades/:tradeId/approve
  - redirects to / if user is anonymous
  - redirect to /profile if the tradeId is invalid 
  - update status request    
  - redirect to /profile if the tradeId doesn't exist or the trade status is not pending, or if I'm not the owner of the requestApprove
  - update owner recordRequested
  - update owner recordOffered
  - redirect to /profile
  - delete the other requests (or change the status to archived to the incoming and outgoing requests)
    - trades where the recordRequested is one of the two above or record offered it one of the two above 
  
- POST /trades/:tradeId/reject
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
owner: ObjectId<User> - required,
recordName: String - required,
isActive: Boolean - required,
artist: String - required,
coverImageURL: String - required,
description: String - required,
genre: String enum: ['country', 'pop', 'rock', 'metal', 'hip-hop', 'punk', 'alternative'] - required,
releaseYear: Number - required,
condition: string enum: ['great','as new','good', 'used', 'scratched'] - required

``` 

Trade model
 
```
status: String enum: ['pending' , 'approved' , 'rejected'] - required,
recordRequested: ObjectId<record.record-name> - required,
recordOffered: ObjectId<record.record-name> - required,
requestMaker: ObjectId<user> - required,
requestApprover: ObjectId<user>, - required

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

