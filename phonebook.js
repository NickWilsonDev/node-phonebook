/* phonebook.js */

var readline = require('readline');
var fs = require('fs');
var promisify = require('util').promisify;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);


// convert readline to promise form
var rlQuestionAsPromise = function(question) {
    return new Promise(function(resolve) {
        rl.question(question, resolve);
    });
}

var lookupEntry = function () {
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

var setEntry = function () {
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

var deleteEntry = function () {
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

var displayEntries = function () {
    for (var i = 0; i < entries.length; i++) {
        console.log('Found entry for ' + entries[i].name + ': ' 
                    + entries[i].number);
    }
    mainMenu();
}

var saveToFile = function () {
    writeFile('./data.json', JSON.stringify(entries))
        .then(function () {
            console.log('Entries were saved to data.json');
        })
        .then(function () {
            mainMenu();
        });
}

var readFromFile = function () {
    readFile('./data.json')
        .then(function (data) {
            entries = JSON.parse(data);
            console.log('Data loaded');
        })
        .then(function () {
            mainMenu();
        });
}

var mainMenu = function () {
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
