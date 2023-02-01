# fsopen-phonebook
This project is a work in progress,
live version is available here ->
https://fsopen-phbook.onrender.com

Endpoints
## GET /info
Returns webpage showing the current time and number of people entered into the database

## GET /
Returns interface for adding, deleting, updating and filtering phonebook entries

## GET /api/persons/id
Returns a single person as JSON

## GET /api/persons
Returns all persons in the database as JSON

## POST /api/persons
Create new person - json body - {name: name, number: number}

## DELETE /api/persons/:id
Delete person by ID

## PUT /api/persons/:id
Update person by ID - json body - {name: name, number: number}
