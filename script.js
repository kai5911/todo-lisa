const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
  if(inputBox.value === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span")
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    inputBox.value = "";
    saveData();
  } 
}

listContainer.addEventListener("click", function(e) {
  if(e.target.tagName === "LI" && e.target.contentEditable !== "true") {
    e.target.classList.toggle("checked");
    saveData();
  } else if(e.target.tagName === "SPAN" && e.target.parentElement.contentEditable !== "true") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);


listContainer.addEventListener("dblclick", function(e) {
  if (e.target.tagName === "LI") {
    // WIP 
     let backup = e.target.firstChild.nodeValue;
    // -
    e.target.contentEditable = "true";
    e.target.lastChild.contentEditable = "false";

    e.target.addEventListener("keydown", function(e){
      if (e.key === "Enter") {
        // WIP
        if (e.target.lastChild && e.target.lastChild.tagName === "SPAN") {
          e.target.contentEditable = "false";
          saveData();
        } else {
          e.target.innerHTML = backup;
          e.target.contentEditable = "false";
        }
        e.target.contentEditable = "false";
        saveData()
      } else if (e.key === "Escape") {
          e.target.firstChild.nodeValue = backup;
          e.target.contentEditable = "false";
          saveData()
      }
    })

    e.target.addEventListener("blur", function(e){
      e.target.contentEditable = "false";
      saveData()
    })
  }
})




// save

function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem('data');
}

showTask();

