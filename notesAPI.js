let LOCAL_STORAGE_KEY = "notizapp-notizen";

function backNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNotes(heading, textArea, id = undefined) {
  const notes = backNotes();

  if (!id) {
    notes.push({
      heading,
      textArea,
      id: getNextId(),
      lastUpdate: new Date().getTime(),
    });
  } else {
    const indexOfNoteWitheId = notes.findIndex((note) => note.id === id);

    if (indexOfNoteWitheId > -1) {
      notes[indexOfNoteWitheId] = {
        heading,
        textArea,
        id,
        lastUpdate: new Date().getTime(),
      };
    }
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function deleteNote(id) {
  if (!id) return;

  const notes = backNotes();

  const filteredNotes = notes.filter((note) => note.id !== Number(id));

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredNotes));
}

function getNextId() {
  const notes = backNotes();

  const sortedNotes = notes.sort((noteA, NoteB) => noteA.id - NoteB.id);

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.id) break;

    nextId = note.id + 1;
  }

  return nextId;
}
