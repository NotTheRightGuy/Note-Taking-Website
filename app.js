const dateDOM = document.getElementById("date");
const timeDOM = document.getElementById("time");
const addbtn = document.getElementById("add-btn");
const noteShelf = document.getElementsByClassName("notes-collection")[0];
const newNoteCreator = document.getElementsByClassName("new-note-creator")[0];
const wrapper = document.getElementsByClassName("wrapper")[0];

const dateFormat = function () {
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

  wrapper.style.filter = "blur(2px)";
  newNoteReference.appendChild(noteTitle);
  newNoteReference.appendChild(noteBody);
  newNoteReference.appendChild(saveBtn);
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
    noteShelf.appendChild(noteInstanceCopy);
    newNoteReference.remove();
  });
});

document.body.addEventListener("click", (event) => {
  if (event.target.className == "note") {
    const note = event.target;
    note.style.cssText += `height: 450px;
    width: 85%; `;
  }
});
