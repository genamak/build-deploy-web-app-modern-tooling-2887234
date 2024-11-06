let notes = [
	{
		id: new Date(),
		title: 'Sample Note',
		body: 'This is a description for our sample note',
		bgColor: 'pink'
	}
]

/* function to create element and to reuse every time we need to create new element */
const createElement = (tag, classes = []) => {
	const element = document.createElement(tag);
	classes.forEach(cl => {
		element.classList.add(cl);
	})
	return element;
}

/* 
function to dynamically create elements accepts single note as an arg
div element notes

*/
const createNoteView = (note) => {
	const noteDiv = createElement('div', ['note']);
	noteDiv.id = note.id;
	const textDiv = createElement('div', ['text']);
	textDiv.style.background = note.bgColor;
	const titleP = createElement('b', ['title']);
	titleP.innerHTML = note.title;
	const bodyP = createElement('p', ['body']);
	bodyP.innerHTML = note.body;
	const editButton = createElement('button', ['edit']);
	editButton.innerHTML = 'Edit Note';
	const deleteButton = createElement('button', ['delete']);
	deleteButton.innerHTML = 'Delete Note';

	textDiv.append(titleP)
	textDiv.append(bodyP)
	noteDiv.append(textDiv)
	noteDiv.append(editButton)
	noteDiv.append(deleteButton)

    /**add edit button to the view to create event and set it to the function */
    editButton.onclick = () => editNote(noteDiv);
    /**add delete button to the view to create event and set it to the function */
    deleteButton.onclick = () => deleteNote(noteDiv);
	return noteDiv;
}

const editNote = (noteDiv, editSave=false) => {
    const titleP = noteDiv.querySelector('b.title');    /**select a note title paragpaph */
    titleP.contentEditable = true;                      /**make content editable */
    titleP.focus();                                     /**activate the note */
    const bodyP = noteDiv.querySelector('p.body');
    bodyP.contentEditable = true;
    bodyP.focus();

    /**able to bind elements to the edit button */
    const editButton = noteDiv.querySelector('button.edit');
    editButton.innerHTML = 'Save Note';
    const deleteButton = noteDiv.querySelector('button.delete');
    deleteButton.innerHTML = 'Cancel Edit';
    deleteButton.onclick = () => cancelEdit(noteDiv);
    editButton.onclick = () => editNote(noteDiv,true);

    /**if we are trying to edit this note */
    if(editSave){
        const note = notes.find(note => note.id == noteDiv.id); /**dind id of the note we are editing */
        note.title = titleP.innerText.trim();
        note.bodyP = bodyP.innerText.trim();
        /**reset button labels */
        deleteButton.innerHTML = 'Delete Note';
        editButton.innerHTML = 'Edit Note';
        titleP.contentEditable = false;
        bodyP.contentEditable = false;
        editButton.onclick = () => editSave(noteDiv);
        deleteButton.onclick = () => deleteNote(noteDiv);
    }
}

/**method to cancel edits */
const cancelEdit = (noteDiv) => {
    const titleP = noteDiv.querySelector('b.title');
    titleP.contentEditable = false;
    const bodyP = noteDiv.querySelector('p.body');
    bodyP.contentEditable = false;
    const editButton = noteDiv.querySelector('button.edit');
    editButton.innerHTML = 'Edit Note';
    const deleteButton  = noteDiv.querySelector('button.delete');
    deleteButton.innerHTML = 'Delete Note';
    const note = notes.find(note => note.id == noteDiv.id);
    /**change the value of the item to what it was before edits */
    titleP.innerHTML = note.title; 
    bodyP.innerHTML = note.body;
    /**assign methods to buttons */
    editButton.onclick = () => editNote(noteDiv);
    deleteButton.onclick = () => deleteNote(noteDiv);
}

/**save note from input */
const saveNote = () => {
    const titleInput = document.querySelector('input#title');   /**get input element with id of title */
    const bodyInput = document.querySelector('input#body');     /**get input element with id of body */
    const bgColorInput = document.querySelector('select');
    const id = new Date().getTime();                            /**every time creating new note we generate time stamp */
    /**new node element */
    const note = {
        id, title: titleInput.value, body: bodyInput.value, bgColor: bgColorInput.value
    }
    /**create new note view and append to the view container */
    const noteDiv = createNoteView(note);
    notesDiv.append(noteDiv);
    /**reset variables */
    titleInput = '';
    bodyInput = '';
    bgColorInput = '';
}

/**delete a note, remove from array of notes */
const deleteNote = (noteDiv) => {
    noteDiv.remove();
    notes = notes.filter(note => note.id != noteDiv.id)
}

/**invoke add button */
document.querySelector('button.add').onclick = () => saveNote();

/** use document to query selector */
const notesDiv = document.querySelector('.notesDiv');

/** each time we load the page we create notes */
notes.forEach(note => {
	const noteDiv = createNoteView(note);
	notesDiv.append(noteDiv);
})