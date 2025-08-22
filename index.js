const notesListEl = document.querySelector(".notes-list");
const saveButtonEl = document.querySelector("save-note");
const newNoteButtonEl = document.querySelector(".create-new");
const deleteButtonEl = document.querySelector(".delete-note");
// const heading = document.getElementById("title-input");
// const textArea = document.getElementById("content-input");
const note = document.getElementById("notes-list");

let date = "";

// saveButtonEl.addEventListener("click", pushSaveNotiz);
newNoteButtonEl.addEventListener("click", createNewNote);
deleteButtonEl.addEventListener("click", clickDeleteNote);

renderNotes();

onclickNotes();
// notiz anzeigen

function onclickNotes() {
  const notesEntrysEls = document.querySelectorAll(".notes-entry");

  notesEntrysEls.forEach((noteEntry) => {
    noteEntry.addEventListener("click", () =>
      selectedNote(noteEntry.getAttribute("data-id"))
    );
  });
}

function pushSaveNotiz() {
  const heading = document.getElementById("title-input").value;
  const textArea = document.getElementById("content-input").value;
  const newDate = new Date().toLocaleString("de-DE");

  date = newDate;

  if (!heading || !textArea) {
    alert("Bitte Title und Inhalt eingeben.");
    return;
  }
  //  herausfinden der data id fürs speichern
  // <------
  // id auslesen und validieren  / ist keine id da dann soll note.push statfinden ansonsten ->if abfrage ,ist eine id vorhanden diese updaten (time stempel anpassen)

  saveNotes(heading, textArea, Number(getCurrentlySelectedId()));

  document.getElementById("title-input").value = "";
  document.getElementById("content-input").value = "";

  renderNotes();
  onclickNotes();
}

// <----

//  notiz erstellen

function renderNote(note) {
  const noteEntry = document.createElement("div");
  noteEntry.classList.add("notes-entry");
  noteEntry.setAttribute("data-id", `${note.id}`);
  noteEntry.id = note.id;

  const noteTitle = document.createElement("div");
  noteTitle.classList.add("notes-title");
  noteTitle.appendChild(document.createTextNode(escapeHtml(note.heading)));

  const noteContentTeaser = document.createElement("div");
  noteContentTeaser.classList.add("note-content-teaser");
  noteContentTeaser.appendChild(
    document.createTextNode(escapeHtml(note.textArea))
  );

  const noteDate = document.createElement("div");
  noteDate.classList.add("notes-date");
  noteDate.appendChild(
    document.createTextNode(new Date(note.lastUpdate).toLocaleString("de-DE"))
  );

  noteEntry.appendChild(noteTitle);
  noteEntry.appendChild(noteContentTeaser);
  noteEntry.appendChild(noteDate);

  document.getElementById("notes-list").appendChild(noteEntry);
}
// <---

// notiz auslesen und sortieren
function renderNotes() {
  const notes = backNotes();

  const sortedNotes = notes.sort(
    (noteA, noteB) => noteB.lastUpdate - noteA.lastUpdate
  );

  document.getElementById("notes-list").innerHTML = "";

  sortedNotes.forEach((note) => {
    renderNote(note);
  });
}
// <-----

// id aufsteigend verteilen

function selectedNote(id) {
  const selectedNoteEl = document.querySelector(
    `.notes-entry[data-id="${id}"]`
  );

  if (selectedNoteEl.classList.contains("selected-note")) return;

  removeSelectedNote();

  selectedNoteEl.classList.add("selected-note");

  const notes = backNotes();

  const selectedNote = notes.find((note) => note.id === Number(id));

  if (!selectedNote) return;

  document.getElementById("title-input").value = selectedNote.heading;
  document.getElementById("content-input").value = selectedNote.textArea;
}

function getCurrentlySelectedId() {
  let currentId = undefined;

  const currentlySelectedNoteEl = document.querySelector(".selected-note");

  if (currentlySelectedNoteEl) {
    currentId = currentlySelectedNoteEl.getAttribute("data-id");
  }

  return currentId;
}

function createNewNote() {
  document.getElementById("title-input").value = "";
  document.getElementById("content-input").value = "";
  removeSelectedNote();
}

function removeSelectedNote() {
  const noteEntriesEls = document.querySelectorAll(".notes-entry");
  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.classList.remove("selected-note");
  });
}

function clickDeleteNote() {
  const currentSelectedId = getCurrentlySelectedId();

  if (!currentSelectedId) return;

  deleteNote(currentSelectedId);

  document.getElementById("title-input").value = "";
  document.getElementById("content-input").value = "";

  renderNotes();
  onclickNotes();
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
