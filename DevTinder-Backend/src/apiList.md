## Auth Router
- POST /signup
- POST /login
- POST /logout

## Profile Router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connection Request Router
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requsetId
- POST /request/review/rejected/:requsetId

## User Router
- GET /user/connections
- GET /user/requests/recived
- GET /user/feed - gets you the profiles of other users  