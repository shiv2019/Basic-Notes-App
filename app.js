
const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes');

// customize yargs version 
yargs.version('1.1.0'); 

// Create add command 
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type:'string'

        },
        body:{
            describe:'Note body',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command 
yargs.command({
    command: 'remove',
    describe: 'Remove Note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type:'string'

        }
    },
    handler (argv){
        //console.log('Removing a note', argv);
        notes.removeNote(argv.title)
    }
})

// create list command
yargs.command({
    command:'list',
    describe:'List your note',
    handler(){
        notes.listNotes()
    }
})

// create read command
yargs.command({
    command:'read',
    describe:'Read a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})



// add, remove,  read, list 
yargs.parse();
// console.log(yargs.argv);