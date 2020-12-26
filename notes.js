const fs = require('fs');
const chalk = require('chalk');
const log = console.log;


// adding a note
const addNote =  (title, body) =>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=> note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.white.bgGreen.bold('New note added!'));
    } else {
        console.log(chalk.white.bgRed.bold('Note title taken!'));
    }
}

// removing note
const removeNote =  (title)=>{
    const notes =  loadNotes()
    const notesTokeep = notes.filter((note)=> note.title !== title )

    if(notes.length > notesTokeep.length) {
        log(chalk.white.bgGreen.bold('Note Removed!'));
        saveNotes(notesTokeep)
    } else {
        log(chalk.white.bgRed.bold('No note found!'));
    }
}

// List Notes
const listNotes = () =>{
    const notes = loadNotes()  
    console.log(chalk.inverse('Your notes'))

    notes.forEach((note)=>{
        console.log(note.title)
    })  
}

//Read Note
const readNote =(title) => {
    const notes = loadNotes()
    const note = notes.find((note)=> note.title === title)
    if(note){
        console.log(chalk.inverse(note.title));
        console.log(chalk.white.bgGreen(note.body));

    } else{
        console.log(chalk.white.bgRed('No note was found! :( '));
    }
}



// Reusable Functions
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}



module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNote:readNote
}