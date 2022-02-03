## Running app

Main dependency here is Node, the current LTS version should work well.

To run this open one terminal window and:
```
npm install
node server.js
```
and then in another terminal window:
```
npm start
```
After this you should be able to access the book list at 'localhost:3000/books'

## Usage
At /books you'll see a list of books. These are sortable on all columns, and clicking on an individual book will open a detail view of that book with a list of characters. The character list is also sortable on all columns.

## Caveats
There are a number of issues here, the most prominent being that you can generally only open one book before hitting a bug that requires restarting the server. 

## Next steps
With more time here my first priority would be to fix the issue that requires restarting the server. Next would be implementing the character detail view, as well as the breadcrumb navigation. After that would be a great deal of error handling. Further out would be improving caching and connecting a database, as well as adding tests.