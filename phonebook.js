/* phonebook.js */

var readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var entries = [];

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
    rl.question('Name:', function (name) {
        rl.question('Phone Number:', function(number) {
            var contact = {};
            contact.name = name;
            contact.number = number;
            entries.push(contact);
            console.log('Entry stored for ' + name);
            mainMenu();
        });
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

var mainMenu = function () {
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
                //process.exit(0);
                break;
            default:
                console.log('Try again');
        }
    });
}

mainMenu();
