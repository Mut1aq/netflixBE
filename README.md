# Lightweight Netflix

## added features

- Translation
- Helmet protection
- Server logger

Lightweight Netflix is a movies library that gives the users ability to add movies to
the library and save their watched movies. It’s required to build an API for this
library based on the following specifications:
Requirements:
● Register:
○ Full Name
○ Age
○ Email (no need to confirm email)
○ Password

● Login:
○ Email
○ Password

● Add movie:
○ Name
○ Description
○ Date
○ Cover
● Edit/Delete movie (user can edit/delete movies he’ve created only)

● Get Movie info (rate is calculated by the sum of rates divided by the number of raters).
● List Movies:
○ Filters:
■ Sort by date
■ Sort by rate
● Add movie to user watched list
● Rate & Review movie:
○ Only the movies on watched list can be rated by the user
■ rate is an integer between 1 and 5
○ Add a review (Optional field)

Notes:
● You have to use (Golang with Gin) and any database you want.
● Structure and clean code are taken into consideration.
● Write a documentation for API routes (Using Postman or Swagger, etc…)
● Using UnitTest is a bonus for you.
● Upload work to GitHub and share it with us.
