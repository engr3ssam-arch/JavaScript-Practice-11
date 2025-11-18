//TIMESTAMP
let timeStamp = new Date();
document.body.before(timeStamp);

let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");
let clearBtn = document.getElementById("clear");
let buttonsDiv = document.getElementById("generate-btn");


//Load Tasks
async function getAllTasks() {
  let allTasks = [];

  // Get data from Local Storage
  let localData = JSON.parse(localStorage.getItem("tasks")) || [];
  allTasks = [...localData];

  // Get data from API 
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos");
    let apiData = await response.json();

    allTasks = [...allTasks, ...apiData];

  } catch (err) {
    console.log("API Error:", err);
  }
    return allTasks;
  
  
}





//  Create Dynamic Buttons 
function createButtons(totalTasks) {
  buttonsDiv.innerHTML = "";
 let pages = Math.ceil(totalTasks / 20); 

  for (let i = 1; i <= pages; i++) {
    let btn = document.createElement("button");
    btn.textContent = `Page ${i}`;
    btn.dataset.page = i;
    btn.style.color = "red";
    btn.style.margin = "2px";

    btn.addEventListener("click", () => {
      loadTasks(i);
      highlightActiveButton(i); 
 });

    buttonsDiv.appendChild(btn);
  }
}

function highlightActiveButton(activePage) {
  const allBtns = buttonsDiv.querySelectorAll("button");
  allBtns.forEach(btn => {
    btn.style.background = btn.dataset.page == activePage ? "red" : "white";
    btn.style.color = btn.dataset.page == activePage ? "white" : "red";
  });
}



async function loadTasks(pageNumber) {
  let allTasks = await getAllTasks();

  let start = (pageNumber - 1) * 20;
  let end = start + 20;

  let pageTasks = allTasks.slice(start, end);

  displayTasks(pageTasks);
  highlightActiveButton(pageNumber);
}

function displayTasks(tasks) {
  listContainer.innerHTML = "";

  tasks.forEach(task => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${task.title}
      <span>${task.completed ? "✔️" : "❌"}</span>
    `;

    listContainer.appendChild(li);
  });
}

async function init() {
  let all = await getAllTasks();
  createButtons(all.length);
  loadTasks(1);             
}

init();




// //ADD TASK
function addTask() {
  if (inputBox.value.trim() === "") {
    alert("You Must Write Something ,Please!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let deleIcon = document.createElement("i");
    deleIcon.classList.add("fa-solid", "fa-trash");
    li.appendChild(deleIcon);
  }
  saveData();
  inputBox.value = "";
}

// //ACTIVATE ENTER KEY
inputBox.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// //CLEAR ALL
function clearAll() {
  let confirmation = confirm("Are you sure you want to clear all tasks?");

  if (confirmation) {
    listContainer.innerHTML = "";
    alert("All tasks have been cleared!");
  } else {
    alert("Clearing cancelled.");
  }
}

//CHECKED & REMOVE
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "I") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

//SAVE DATA
// function saveData() {
//   localStorage.setItem("data", listContainer.innerHTML);
// }

// function showTask(task) {
//   let li = document.createElement("li");
//   li.textContent = task.title;

//    if (task.completed) {
//     li.classList.add("checked");
//   }

//   listContainer.appendChild(li);
// }



//SHOW DATA
// function showTask() {
//   listContainer.innerHTML = localStorage.getItem("data");
// }

// showTask();
