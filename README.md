# JS_RickyMorty
This project will get the characters from the RcikyMorty API

## **Commands**
To use this you have to use the following yargs commands:
```
    -list: to get a list from the site
    -view: to get the data from a character
```
    
Both of the commands allow for a filter through a query search you want to perform.

There are a total of 4 parameters you can add:
```
    -list:
        -q: query name
        -v: value of the query
        -p: page number
    -view:
        -q: query name
        -v: value of the query
        -i: the index of the character
```
        

## **Queries and values**
You have a query and its value:
```
    query="value"
    name="Rick"
```
The end result on this search for a list would be:
```
    `npm start -- list --q="name" --v="Rick"`
```    
This repo also supports multiple queries in a single search:
```
    npm start -- view --q="name" --v="rick" --q="status" --v="alive"
```
## **Pages and index**

Now if you would want to get the list of the second page of the site you would have to add a parameter for the page number:
```
    npm start -- list --q="name" --v="rick" --q="status" --v="alive" --p=2
```    
Same thing would happen for the index of another character:
```
    npm start -- view --q="name" --v="rick" --q="status" --v="alive" --i=21
```
You should not worry about the page in the view command as it will search for the following page in case you enter a number greater than the page limit.
