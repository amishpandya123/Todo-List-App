let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


//It will show each list item one by one
function addTaskToDOM(task){
  const li= document.createElement('li');

// When you have to use $ sign use this ` `. Dont use " " or ' '
  li.innerHTML=
          `<input type="checkbox" id="${task.id}" data-id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
           <label for="${task.id}">${task.text}</label>
           <img src="delete-icon.png" class="delete" data-id="${task.id}" heigth="200px" width="25px"/>`;

  tasksList.append(li);         
}

//---------------- Rendering Function--------------------------
function renderList () {
	tasksList.innerHTML='';             //Pela akhu khali kari dese pachi ek pachi ek nakshe

	for(let i=0; i<tasks.length; i++){
		addTaskToDOM(tasks[i]);

	}

	tasksCounter.innerHTML= tasks.length;
}


//---------------- Toggling Function--------------------------
function toggleTask (taskId) {        //If it is not completed the it will mark as complete and if marked as completed then it will set it to default
	const task=tasks.filter(function(task){
		return task.id===taskId;            //filter out function will return only those elements i which the given taskId is equal to task.id;
	});

	if(task.length>0){
		const currentTask=task[0];

		currentTask.done = !currentTask.done;
		renderList();
		showNotification('Task Toggled successfully');
		return;
	}

	else{
		showNotification('Could not toggle the task');
	}
}


//---------------- Delete Todo Function--------------------------
function deleteTask (taskId) {
	const newTasks=tasks.filter(function(task){    //filter out function will not take the value of that element id that we want to delete (bcoz of condition given) so we will get a new array in which the item that we want to delete is not there
		return task.id!==taskId;
	});

	tasks=newTasks;
	renderList();
	showNotification('Task deleted successfully');
}

//---------------- Add Todo Function--------------------------
function addTask (task) {
	if(task){
		tasks.push(task);
		renderList();
		showNotification('Task added Successfully');
		return;
	}

	else {                                             //Incase of empty string entered
		showNotification('Task cannot be added');
	}
	
}

//---------------- Notification Function--------------------------
function showNotification(text) {
	alert(text);
}


function handleInputKeypress(e){
	if(e.key=='Enter'){            //If the user press enter, it means he has entered the item so now time to store the item
		
		const text=e.target.value;

		if(!text){
			showNotification('Task text cannot be empty');
			return;
		}

		const task={
			text: text,
			id: Date.now().toString(),
			done: false
		}

		e.target.value='';      //Again set the input box value to empty
		addTask(task);
	}
}

function handleClickListener(e){
	const target=e.target;

	if(target.className==='delete'){        //Incase if clicked on the delete button
		const taskId=target.dataset.id;
		deleteTask(taskId);
		return;
	}

	else if(target.className==='custom-checkbox'){   //Incase if clicked on the checkbox
		const taskId=target.id;
		toggleTask(taskId);
		return;
	}
}



//keyup event is fired when a key is released. It means it will take input at every key pressed and then released
//Here i have taken help of Event delegation. If i want to delete a particular list item or want to mark check then i am not going to write hundreds of document.getElementById for every input, so basically i have collected all click events on document(window) and then i will classify the click event by className or TagName etc.. And will do the following work
function intializeApp(){
  addTaskInput.addEventListener('keyup', handleInputKeypress);
  document.addEventListener('click', handleClickListener);	
}

intializeApp();