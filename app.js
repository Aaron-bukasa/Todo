let appForm = document.querySelector(".app__form");
let btnClear = document.querySelector('.delete-all');

let listTask = [];

// EVENTS
appForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});
document.body.onload = function() {
  if(JSON.parse(localStorage.getItem('tasks') !== null)) {
    listTask = JSON.parse(localStorage.getItem('tasks'))
  }
  addTask()
}
btnClear.addEventListener('click', () => {
  listTask = [];
  console.log(listTask);
  localStorage.setItem('tasks', JSON.stringify(listTask));
  viewsTask();
})

// FUNCTIONS

//  FUNCTION ADD TASK
function addTask() {

  let formInput = document.querySelector(".app__form input");
  let newtask = {
    task: "edit",
    completed: false,
  };

  if (formInput.value) {
    newtask.task = formInput.value;
    listTask.push(newtask);
  }

  localStorage.setItem("tasks", JSON.stringify(listTask));
  formInput.value = "";
  viewsTask();
}

//  FUNCTION REMOVE TASK
function removeTask(targetElement) {

  let appListContent = document.querySelector(".app__list-content").children;
  let index;
  if(targetElement.tagName === 'svg') {
    targetElement.parentNode.parentNode.remove();
    for(let [key, value] of Object.entries(appListContent)) {
      if(value === targetElement.parentNode.parentNode) {
        index = key;
      }
    }
    listTask.splice(index, 1); 
    localStorage.setItem('tasks', JSON.stringify(listTask));

  } else if(targetElement.tagName === 'button') {
    targetElement.parentNode.remove();
    for(let [key, value] of Object.entries(appListContent)) {
      if(value === targetElement.parentNode) {
        index = key;
      }
    }
  
  }

}

//  FUNCTION COMPLETED TASK
function completedTask(targetElement) {

  let appListContent = document.querySelector(".app__list-content").children;  

  if(targetElement.className === 'btn__completed') {

    let index;

    for(let [key, value] of Object.entries(appListContent)) {
      if(value === targetElement.parentNode) {
        index = key;
        listTask[index].completed = true;
      }
    }
    targetElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="blue"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
  }
  localStorage.setItem('tasks', JSON.stringify(listTask));
}

//  FUNCTION VIEWS TASK
function viewsTask() {

    let appListContent = document.querySelector(".app__list-content");
    appListContent.innerHTML = '';
 
  for (let i = 0; i < listTask.length; i++) {

    let li, p, btnDelete, btnCompleted;

    li = document.createElement("li");
    p = document.createElement("p");
    btnDelete = document.createElement("button");
    btnCompleted = document.createElement("button");

    li.onclick = function (e) {
      removeTask(e.target);
      completedTask(e.target);
    }

    btnDelete.classList.add('btn__delete');
    btnCompleted.classList.add('btn__completed');
    btnDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="red"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;

    li.appendChild(p);
    li.appendChild(btnCompleted);
    li.appendChild(btnDelete);
    
    if(listTask[i].completed === false) {
      btnCompleted.textContent = "completed";
    } else {
      btnCompleted.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="blue"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
    }
    
    p.textContent = listTask[i].task;
    appListContent.appendChild(li);
  }
}