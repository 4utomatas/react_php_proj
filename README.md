Matas Pugzlys w19006600

Documentation:

-   API home

    -   link: http://unn-w19006600.newnumyspace.co.uk/kf6012/coursework/part1/api/
    -   methods: GET
    -   expected status codes:
        -   405 Method not allowed: when the Request Method is not GET
        -   200 OK
    -   parameters: none
    -   JSON response:
        {
        "message": "Ok",
        "count": 3,
        "results": {
        "author": {
        "name": "Matas Pugzlys",
        "id": "w19006600"
        },
        "message": "This is a basic Web API for Northumbria University coursework of KF6012 module. It allows the user to be authenticated and retrieve their reading list. It is also possible to retrieve information on Scientific papers and their authors.",
        "documentation": "http://unn-w19006600.newnumyspace.co.uk/kf6012/coursework/part1/documentation"
        }
        }

-   Papers API

    -   link: http://unn-w19006600.newnumyspace.co.uk/kf6012/coursework/part1/api/papers
    -   methods: GET, POST
    -   expected status codes:
        -   401 Unauthorized
        -   405 Method not allowed
        -   200 OK
    -   parameters: id, authorid, award, token
        -   id: supported in GET method requests
        -   authorid: supported in GET and POST method requests
        -   award: supported in GET method requests
        -   token: supported in POST method requests
    -   JSON reponse for GET request with no parameters:
        {
        "message": "Ok",
        "count": 2,
        "results": [
        {
        "paper_id": "12123",
        "title": "Aa title",
        "abstract": "Some example abstract",
        "doi": "https://www.exampleurl.com",
        "video": "https://www.exampleurl.com",
        "preview": "NONE",
        "awards": "1,2,3,4,5",
        "authors": "Name Surname, Name Middlename Surname"
        },
        {
        "paper_id": "123",
        "title": "A title",
        "abstract": "Some example abstract",
        "doi": "https://www.exampleurl.com",
        "video": "https://www.exampleurl.com",
        "preview": "NONE",
        "awards": null,
        "authors": "Name Surname, Name Middlename Surname"
        }
        ]
        }
    -   JSON response for POST request with a valid token parameter:
        {
        "message": "Ok",
        "count": 2,
        "results": [
        {
        "paper_id": "12123",
        "title": "Aa title",
        "abstract": "Some example abstract",
        "doi": "https://www.exampleurl.com",
        "video": "https://www.exampleurl.com",
        "preview": "NONE",
        "is_in_readinglist": "0",
        "awards": "1,2,3,4,5",
        "authors": "Name Surname, Name Middlename Surname"
        },
        {
        "paper_id": "123",
        "title": "A title",
        "abstract": "Some example abstract",
        "doi": "https://www.exampleurl.com",
        "video": "https://www.exampleurl.com",
        "preview": "NONE",
        "is_in_readinglist": "1",
        "awards": null,
        "authors": "Name Surname, Name Middlename Surname"
        }
        }

-   Authors API

    -   link: http://unn-w19006600.newnumyspace.co.uk/kf6012/coursework/part1/api/authors
    -   methods: GET
    -   expected status codes:
        -   405 Method not allowed
        -   200 OK
    -   parameters: id
    -   JSON reponse when parameter id=123:
        {
        "message": "Ok",
        "count": 1,
        "results": [
        {
        "author_id": "123",
        "first_name": "Firstname",
        "middle_name": "Middlename",
        "last_name": "Lastname"
        }
        ]
        }

-   Authentication API

    -   link: http://unn-w19006600.newnumyspace.co.uk/kf6012/coursework/part1/api/authenticate/
    -   methods: POST
    -   expected status codes:
        -   401 Unauthorized
        -   405 Method not allowed
        -   200 OK
    -   parameters: username, password
    -   JSON reponse when a user with the username and password is in the database and they are signed in:
        {
        "message": "Ok",
        "count": 1,
        "results": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsImV4cCI6MTY0MjM0NzA2NH0.wMSG9wA14aROD6WeBptpqaVb4C2lMKs37bfHq3CFFKM"
        }
        }

-   Reading List API

    -   link: http://unn-w19006600.newnumyspace.co.uk/kf6012/coursework/part1/api/readinglist/
    -   methods: POST
    -   expected status codes:
        -   401 Unauthorized
        -   405 Method not allowed
        -   200 OK
    -   parameters:
        -   token user JWT token
        -   add paper_id to add
        -   remove paper_id to remove
    -   JSON reponse:
        {
        "message": "Ok",
        "count": 2,
        "results": [
        {
        "paper_id": "123",
        "title": "Aa An example title",
        "abstract": "An example abstract",
        "doi": "https://www.exampleurl.com",
        "video": "https://www.exampleurl.com",
        "preview": "https://www.exampleurl.com",
        "is_in_readinglist": "1",
        "awards": null,
        "authors": "Author Name, Authorr Othername"
        },
        {
        "paper_id": "1234",
        "title": "Bb Another title",
        "abstract": "Another title",
        "doi": "https://www.exampleurl.com",
        "video": "https://www.exampleurl.com",
        "preview": "https://www.exampleurl.com",
        "is_in_readinglist": "1",
        "awards": "1,2,3,4",
        "authors": "Author Anothername"
        }
        ]
        }

    Additional:

-   DaisyUI and Tailwindcss packages were added for styling.
