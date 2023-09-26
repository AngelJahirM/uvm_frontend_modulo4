const chalk = require('chalk');
const yargs = require('yargs');
const actions = require('./actions.js');

yargs.version('1.1.0')

// ADD
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        actions.addNote(argv.title, argv.body);
    }
});

// REMOVE
yargs.command({
    command: 'remove',
    describe: 'Remove an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        actions.removeNote(argv.title);
    }
});

// READ
yargs.command({
    command: 'read',
    describe: 'Read an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        actions.readNote(argv.title);
    }
});

// READ ALL
yargs.command({
    command: 'readall',
    describe: 'Read all existing notes',
    builder: {
        complete: {
            describe: 'if true, it shows both title and body, if false, only titles are displayed',
            demandOption: true,
            type: 'boolean'
        }
    },
    handler: function (argv) {
        actions.readAll(argv.complete);
    }
});

yargs.parse();