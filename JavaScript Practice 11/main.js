//TIMESTAMP
let timeStamp = new Date();
document.body.before(timeStamp);

let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");
let clearBtn = document.getElementById("clear");
let allData =[];

async function getTodos() {
  let res = await fetch("https://jsonplaceholder.typicode.com/todos");
  allData = await res.json();
}


getTodos();

 function getLocalTasks() {
  let data = localStorage.getItem("myTasks");
  return data ? JSON.parse(data) : [];
 
}
showTask();

// show 20 title 
function loadData(page) {
  let start = (page - 1) * 20; 
  let end = start + 20;        

  let sliced = allData.slice(start, end);

  listContainer.innerHTML = "";

  sliced.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item.title;

    //checked
    if (item.completed) {
      li.style.background = "#d4cb67ff";
      li.style.textDecoration = "line-through";
    }

    listContainer.appendChild(li);
  });
}
// fetch("https://jsonplaceholder.typicode.com/todos")
//    .then(response => response.json())
//   .then(data => {

//     firstTwenty = data.slice(0, 20); 
//     firstTwenty.forEach(task => {
//       showTask(task)
          
//     });
//  })
 


//ADD TASK
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

//ACTIVATE ENTER KEY
inputBox.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

//CLEAR ALL
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
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// function showTask(task) {
//   let li = document.createElement("li");
//   li.textContent = task.title;

//    if (task.completed) {
//     li.classList.add("checked");
//   }

//   listContainer.appendChild(li);
// }



//SHOW DATA
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
