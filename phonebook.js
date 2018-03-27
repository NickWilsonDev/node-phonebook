/* phonebook.js */

const pg = require('pg-promise')(); // immediately invoke
const readline = require('readline');
const promisify = require('util').promisify;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// database stuff
const dbConfig = 'postgres://nickwilson@localhost:5432/exercises';
const db = pg(dbConfig);

let readFile = promisify(fs.readFile);
let writeFile = promisify(fs.writeFile);


// convert readline to promise form
let rlQuestionAsPromise = function(question) {
    return new Promise(function(resolve) {
        rl.question(question, resolve);
    });
}

let lookupEntry = function () {
    rl.question('Name:', function (name) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].name == name) {
                console.log('Found entry for ' + name + ' '
                            + entries[i].number);
                mainMenu();
            }
        }
        console.log('No entry found for ' + name);
        mainMenu();
    });
}

let setEntry = function () {
    var contact = {};
    rlQuestionAsPromise('Name:')
        .then(function(data) {
            //var contact = {};
            contact.name = data;
            return rlQuestionAsPromise('Number:')
        })
        .then(function(data) {
            console.log(data);
            
            contact.number = data;
            entries.push(contact);
            console.log(entries);
        })
        .then(function() {
            mainMenu();
            console.log(contact);
        });
}

let deleteEntry = function () {
    rl.question('Name: ', function (name) {
        var temp = [];
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].name != name) {
                temp.push(entries[i]);
            }
        }
        entries = temp;
        mainMenu();
    });
}

let displayEntries = function () {
    for (var i = 0; i < entries.length; i++) {
        console.log('Found entry for ' + entries[i].name + ': ' 
                    + entries[i].number);
    }
    mainMenu();
}


let mainMenu = function () {
    rl.question('Electronic Phone Book\n' +
             '=====================\n' +
             '1. Look up an entry\n' +
             '2. Set an entry\n' +
             '3. Delete an entry\n' +
             '4. List all entries\n' +
             '5. Save to file\n' +
             '6. Load from file\n' +
             '7. Quit\n' +
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
                saveToFile();
                break;
            case 6:
                readFromFile();
                break;
            case 7:
                rl.close();
                break;
            default:
                console.log('Try again');
                break;
        }
    });
}

mainMenu();
