const chalk = require('chalk');
const fs = require('fs');
const readline = require('readline');


function addNote(title, body) {
    const notesValidation = getFileContents();
    const duplicateNote = notesValidation.find((note) => note.title === title);
    if (duplicateNote !== undefined) {
        console.log(chalk.yellow.inverse('WARNING: Existing Note found with the same Title. It will be overriden.'));
        removeNote(duplicateNote.title);
    }
    const notes = getFileContents();
    notes.push({ title: title, body: body });
    saveJSON(notes);
    console.log(chalk.green.inverse('Note added successfully.'));
}

function removeNote(title) {
    const notes = getFileContents();
    const notesUpdated = notes.filter(x => x.title !== title);
    if (notes.length > notesUpdated.length) {
        saveJSON(notesUpdated);
        console.log(chalk.gray.inverse('Note removed successfully.'));
    } else {
        console.log(chalk.red.inverse('Note not found.'));
    }
}

function readNote(title) {
    const notes = getFileContents();
    const note = notes.find(x => x.title === title)
    console.log(note);

    if (note !== undefined) {
        console.log(chalk.cyan.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found.'));
    }
}

function readAll(complete) {
    const notes = getFileContents();
    console.log(chalk.inverse('These are ALL the notes found: '));
    notes.forEach(note => {
        console.log(chalk.cyan.inverse(note.title));
        if (complete) { console.log(note.body); }
    });
}

function saveJSON(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

function getFileContents() {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    if (dataJSON === "") {
        return [];
    } else {
        return JSON.parse(dataJSON);
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    readAll: readAll
}