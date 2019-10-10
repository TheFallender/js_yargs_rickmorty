import yargs from 'yargs';
import request from 'request';

//List command
yargs.command({
    command: 'list',
    describe: 'list the searched values',
    builder: {
        q: {
            describe: 'query name',
            demandOption: false,
            type: 'string',
        },
        v: {
            describe: 'value of the query',
            demandOption: false,
            type: 'string',
        },
        p: {
            describe: 'page number',
            demandOption: false,
            type: 'int',
        },
    },
    handler: function(argv) {
        //Default URL
        let url = 'https://rickandmortyapi.com/api/character/';

        //Add Query and Value
        if (argv.q && argv.v) {
            //Add parameter
            url += '?';
            //For each of the queries and values
            for (let i = 0; i < argv.q.length; i++){
                //Append to the URL
                url += argv.q[i] + '=' + argv.v[i];
                //If it's not finished add an &
                if (i < argv.q.length - 1)
                    url += '&';
            }
            //If there is a page argument add the &
            if (argv.p)
                url += '&';
        }

        //Pages 
        if (argv.p)
            url += 'page=' + argv.p;

        //Request
        request({ url: url, json: true }, (error, response) => {
            let page_error = false;

            //If there argument is valid
            if (argv.p)
                //Pages not in range
                if (argv.p > response.body.info.pages) {
                    page_error = true;
                    console.log("This page number doesn't exist.")
                }
            
            //If there is no error
            if (!page_error) {
                //Loop and print all the names of the results
                response.body.results.forEach((element, index) => {
                    console.log(`${index + 1}. Name: ${element.name}`);
                });
                //List the number of pages if it's greater than one
                if (response.body.info.pages > 1) {
                    console.log(`There are a total of ${response.body.info.pages} pages.`);
                }
            }
        });
    },
});

//View command
yargs.command({
    command: 'view',
    describe: 'view the character',
    builder: {
        q: {
            describe: 'query name',
            demandOption: false,
            type: 'string',
        },
        v: {
            describe: 'value of the query',
            demandOption: false,
            type: 'string',
        },
        i: {
            describe: 'character index',
            demandOption: false,
            type: 'int',
        },
    },
    handler: function(argv) {
        //Default URL
        let url = 'https://rickandmortyapi.com/api/character/';

        //Add Query and Value
        if (argv.q && argv.v) {
            //Add parameter
            url += '?';
            //For each of the queries and values
            for (let j = 0; j < argv.q.length; j++){
                //Append to the URL
                url += argv.q[j] + '=' + argv.v[j];
                //If it's not finished add an &
                if (j < argv.q.length - 1)
                    url += '&';
            }
        }

        //Index fix
        if (Math.floor((argv.i)/20) > 0) {
            url += '&page=' + (Math.floor((argv.i + 1)/20)+1);
        }

        //Request
        request({ url: url, json: true }, (error, response) => {
            let index_error = false;
            let index = 0;

            //If index exists set it
            if (argv.i)
                index = ((argv.i - 1)%20);

            //If there argument is valid
            if (index)
                //Index not in range
                if (index > response.body.info.count) {
                    index_error = true;
                    console.log("There is no character on this index.")
                }
            
            //If there is no error
            if (!index_error) {
                //Loop and print all the names of the results
                console.log(response.body.results[index].name);
                Object.entries(response.body.results[index]).forEach(([key, value]) => {
                    console.log(`${key}: ${value}`);
                });
                //List the number of index if it's greater than one
                if (response.body.info.count > 1) {
                    console.log(`There are a total of ${response.body.info.count} characters with your description.`);
                }
            }
        });
    },
});

//Yargs Parse
yargs.parse();
