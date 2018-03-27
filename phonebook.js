/* phonebook.js */

const pg = require('pg-promise')(); // immediately invoke
const readline = require('readline');
const promisify = require('util').promisify;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// database stuff
const dbConfig = 'postgres://nickwilson@localhost:5432/contacts';
const db = pg(dbConfig);


// search db by name
let searchDBByName = name => {
    console.log(name);
    db.query(`select * from contacts where name ILIKE '${name}';`)
            .then((results) => console.log(results));
};

// get all contacts from db
let getAllContactsDB = () => {
    db.query(`select * from contacts;`)
           .then((results) => console.log(results));
};


// insert new contact
let insertNewContact = contact => {
    db.query(`insert into contacts (name, number)
        VALUES('${contact.name}', '${contact.number}')`);
};

// delete contact by id
let deleteContact = id => {
    db.query(`DELETE from contacts where id = ${id};`);
};

// convert readline to promise form
let rlQuestionAsPromise = function(question) {
    return new Promise(function(resolve) {
        rl.question(question, resolve);
    });
}

let lookupEntry = function () {
    rl.question('Name:', function (name) {
        searchDBByName(name);
        mainMenu();
    });
}

let setEntry = function () {
    var contact = {};
    rlQuestionAsPromise('Name:')
        .then(function(data) {
            contact.name = data;
            return rlQuestionAsPromise('Number:')
        })
        .then(function(data) {
            contact.number = data;
        })
        .then(function() {
            mainMenu();
            insertNewContact(contact);
        });
};

let deleteEntry = function () {
    rlQuestionAsPromise('Name: ')
        .then( (name) => {
            searchDBByName(name);
        })
        .then( () => {
            return rlQuestionAsPromise('Id to delete:');
        })
        .then( data => {
            deleteContact(data);
        })
        .then( () => {
            mainMenu();
        });
}

let displayEntries = function () {
    //for (var i = 0; i < entries.length; i++) {
    //    console.log('Found entry for ' + entries[i].name + ': ' 
   //                 + entries[i].number);
    //}
    getAllContactsDB();
    mainMenu();
}


let mainMenu = function () {
    rl.question('Electronic Phone Book\n' +
             '=====================\n' +
             '1. Look up an entry\n' +
             '2. Set an entry\n' +
             '3. Delete an entry\n' +
             '4. List all entries\n' +
             '5. Quit\n' +
             'What do you want to do (1-5)?\n', function (choice) {
        parsedInt = parseInt(choice);
        switch (parsedInt) {
            case 1:
                //console.log('look up entry');
                lookupEntry();
                break;
            case 2:
                setEntry();
                //console.log('set an entry');
                break;
            case 3:
                deleteEntry();
                //console.log('delete entries');
                break;
            case 4:
                displayEntries();
                //console.log('list all entries');
                break;
            case 5:
                rl.close();
                break;
            default:
                console.log('Try again');
                break;
        }
    });
}

mainMenu();
