const dateDOM = document.getElementById("date");
const timeDOM = document.getElementById("time");
const addbtn = document.getElementById("add-btn");
const noteShelf = document.getElementsByClassName("notes-collection")[0];
const newNoteCreator = document.getElementsByClassName("new-note-creator")[0];
const wrapper = document.getElementsByClassName("wrapper")[0];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dateFormat = function () {
  const dateObj = new Date();
  const date = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  dateDOM.innerHTML = `📆 ${date} ${months[month]} ${year}`;
};

const timeFormat = function () {
  const dateObj = new Date();
  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let prefix = "AM";
  if (hour > 11) {
    hour = hour - 12;
    prefix = "PM";
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  timeDOM.innerHTML = `⏰${hour}:${minutes} ${prefix}`;
};

dateFormat();
timeFormat();
setInterval(timeFormat, 60000);

addbtn.addEventListener("click", () => {
  addbtn.style.cssText += `opacity: 0;transition: opacity 1s;cursor:auto`;
  const newNoteReference = document.createElement("div");
  newNoteReference.className = "new-note-reference";
  const hideNoteButton = document.createElement("button");
  hideNoteButton.className = "hide-note";
  const noteTitle = document.createElement("div");
  noteTitle.className = "new-note-title";
  noteTitle.innerText = "Title";
  noteTitle.contentEditable = "true";

  noteTitle.addEventListener("click", () => {
    if (noteTitle.innerText == "Title") {
      noteTitle.innerText = "";
    }
    noteTitle.style.opacity = 1;
  });

  noteTitle.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      if (noteBody.innerText == "Add a note") {
        noteBody.innerText = "";
      }
      noteBody.style.opacity = 1;
      noteBody.focus();
    }
  });

  hideNoteButton.addEventListener("click", () => {
    wrapper.style.filter = "blur(0)";
    addbtn.style.opacity = 1;
    newNoteCreator.removeChild(newNoteCreator.lastChild);
  });

  const noteBody = document.createElement("div");
  noteBody.className = "new-note-body";
  noteBody.contentEditable = "true";
  noteBody.innerText = "Add a note";
  noteBody.addEventListener("click", () => {
    if (noteBody.innerText == "Add a note") {
      noteBody.innerText = "";
    }
    noteBody.style.opacity = 1;
  });

  const saveBtn = document.createElement("button");
  saveBtn.className = "new-note-save";
  saveBtn.innerHTML = "save";

  const date = document.createElement("div");
  date.className = "date";
  today = new Date();
  date.innerHTML = `${today.getDate()} ${
    months[today.getMonth()]
  } ${today.getFullYear()}`;

  const time = document.createElement("div");
  time.innerHTML = `${today.getHours()}:${today.getMinutes()}`;
  time.className = "time";

  wrapper.style.filter = "blur(2px)";
  newNoteReference.appendChild(noteTitle);
  newNoteReference.appendChild(noteBody);
  newNoteReference.appendChild(hideNoteButton);
  newNoteReference.appendChild(date);
  newNoteReference.appendChild(time);
  newNoteReference.appendChild(saveBtn);
  newNoteReference.appendChild(hideNoteButton);
  newNoteCreator.append(newNoteReference);

  saveBtn.addEventListener("click", () => {
    wrapper.style.filter = "blur(0px)";
    noteBody.contentEditable = false;
    noteTitle.contentEditable = false;
    noteBody.className = "note-body";
    noteTitle.className = "note-title";
    const noteInstanceCopy = newNoteReference.cloneNode(true);
    noteInstanceCopy.className = "note";
    addbtn.style.cssText += `opacity:1;transition: opacity 1s`;
    noteInstanceCopy.removeChild(noteInstanceCopy.lastChild);
    noteInstanceCopy.removeChild(noteInstanceCopy.lastChild);
    noteInstanceCopy.lastChild.style.display = "none";
    noteShelf.appendChild(noteInstanceCopy);
    newNoteReference.remove();
  });
});

document.body.addEventListener("click", (event) => {
  if (event.target.className == "note") {
    const note = event.target;
    note.lastChild.style.display = "block";
    const wrapper = document.getElementsByClassName("wrapper")[0];
    wrapper.style.filter = "blur(3px)";
    const noteWatcher = document.getElementsByClassName("note-watcher")[0];
    noteWatcher.style.cssText = "display:block";
    const hideNoteButton = document.createElement("button");
    hideNoteButton.className = "hide-note";
    const deleteNoteButton = document.createElement("button");
    deleteNoteButton.className = "delete-note";
    const editNoteButton = document.createElement("button");
    editNoteButton.className = "edit-note";
    note.appendChild(hideNoteButton);
    note.appendChild(deleteNoteButton);
    note.appendChild(editNoteButton);
    noteWatcher.appendChild(note);

    hideNoteButton.addEventListener("click", () => {
      const noteCollection =
        document.getElementsByClassName("notes-collection")[0];
      note.removeChild(note.lastChild);
      note.removeChild(note.lastChild);
      note.removeChild(note.lastChild);
      wrapper.style.filter = "blur(0px)";
      noteWatcher.style.cssText = "display:none";
      note.children[0].contentEditable = "false";
      note.children[1].contentEditable = "false";
      note.lastChild.style.display = "none";
      noteCollection.append(note);
    });

    deleteNoteButton.addEventListener("click", () => {
      wrapper.style.filter = "blur(0px)";
      noteWatcher.style.cssText = "display:none";
      noteWatcher.removeChild(noteWatcher.firstChild);
    });

    editNoteButton.addEventListener("click", () => {
      note.children[0].contentEditable = "true";
      note.children[1].contentEditable = "true";
    });
  }
});
