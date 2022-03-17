# Readme file for the Assessment of Web Application Integration module KF6012 2021
Student Matas Pugzlys w19006600

Website link for React app:

Website link for PHP app:

USERS:

1. email: john@example.com
password: johnpassword
2. email: kay@example.com
password: kaypassword 

# PHP WEB API Requirements:
- The web API must be deployed and working on a web server (such as Newnumyspace or an alternative).
- The web API must be written in object-oriented PHP.
- The web API must use the provided SQLite databases.
- Your work must not use a PHP framework, template engine, or package manager.
- The code must set appropriate headers and HTTP status codes.
- Errors must be handled appropriately with a correctly formatted, non-empty response.
- The code must use an autoloader, exception handler and error handler.
- The code must be appropriately commented, and every class must include a comment with an author tag with your name and student id.
- The code should follow appropriate quality standards and guidelines, and must be written in a consistent style.
- The code should be appropriately modular and concise. There should be no redundant (unused) code or commented-out code.
- Clean URLs (that do not end with a .php file extension) and a single point of entry must be used.

## Task 1.1: Human-readable webpages

Produce these pages:

- /home
    - name and id
    - A message saying your work is university coursework and not associated with or endorsed by the DIS conference
    - A link to the documentation page.
    - more info if you wish
- /documentation
    - name and id
    - link to homepage
    - Accurate information about what HTTP methods are supported by the
    endpoint.
    - Full information about what parameters are supported.
    - An overview of the likely content and structure of JSON responses.
    - Likely HTTP status codes set for responses (including for errors).
    - One specific example, including:
        - A specific example request (URL and parameters).
        - The expected JSON response for that specific request.
- error page
    - This should be returned in the event of the user requesting a page that does not exist. It must not be displayed if the error is associated with an attempt to access the Web API (see part 2).
    - This page would not normally be linked from a menu, but may contain links back to the home or documentation page.

## Task 1.2: API endpoints and parameters

- /api
    - basepoint
    - This endpoint should return JSON containing your name and student id, a short explanation of what the API is, and information on how to access the API documentation. This data must be structured, clear and concise. It must use appropriate keys and values. It can include further relevant data and metadata if you wish.
- /api/authors
    - array of authors. first and last name, id, other data if you wish.
- /api/authors?id=42069
    - This should return the author with the specified id or an appropriate error message if there is no author with that id. 
- /api/papers
    - array: paper id, title, abstract, awards
- /api/papers?id=42069
    - This should return the author with the specified id or an appropriate error message if there is no author with that id. 
- /api/papers?authorid=42069
    - array: This should return all papers authored by the person with the specified id, or an appropriate message.
- /api/papers?award=all
    - This should return only the papers that have won an award (all awards).

set appropriate HTTP status codes for each response.  

any requests to an API endpoint that does not exist
must be considered an error.  The API must respond with an appropriate error message encoded in JSON in the event of a request to an API endpoint that does not exist (not an empty response or an HTML response).

## Task 1.3: Authentication and reading list

- /api/authenticate
    - @method = POST 
    - @vars username, password
    - @returns json web token jwt
    - jwt has to have an expiry date
    - must be signed a secure server key that is unique to your coursework submission

- /api/readinglist
    - POST with JWT
    - allows user to add/remove paper from personal 'reading list'
    - get list of ids, details of papers in reading list

