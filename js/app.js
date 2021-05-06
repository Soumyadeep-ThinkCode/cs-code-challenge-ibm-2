(function(){
	const taskInput = document.getElementById("new-task");
	const addButton = document.getElementsByTagName("button")[0];
	const incompleteTasksHolder = document.getElementById("incomplete-tasks");
	const completedTasksHolder = document.getElementById("completed-tasks");
	var namesArr = [];

	var createNewTaskElement = function(taskString) {
	  var listItem = document.createElement("li");
	  var checkBox = document.createElement("input");
	  var label = document.createElement("label");
	  var editInput = document.createElement("input");
	  var editButton = document.createElement("button");
	  var deleteButton = document.createElement("button");

	  checkBox.type = "checkbox";
	  editInput.type = "text";
	  editButton.innerText = "Edit";
	  editButton.className = "edit";
	  deleteButton.innerText = "Delete";
	  deleteButton.className = "delete";
	  label.innerText = taskString;

	  listItem.appendChild(checkBox);
	  listItem.appendChild(label);
	  listItem.appendChild(editInput);
	  listItem.appendChild(editButton);
	  listItem.appendChild(deleteButton);

	  return listItem;
	};

	var addTask = function () {
	  if(taskInput.value == '' || taskInput.value == null || taskInput.value == undefined){
		  alert("The Task Name cannot be blank. Try again!");
	  }else{
		  var listItemName = taskInput.value || "New Item";
		  var listItem = createNewTaskElement(listItemName);
		  incompleteTasksHolder.appendChild(listItem);
		  bindTaskEvents(listItem, taskCompleted);
		  namesArr.push(listItemName);
		  localStorage.setItem('names', JSON.stringify(namesArr)); 
		  taskInput.value = "";
	  }
	};

	var editTask = function () {
	  var listItem = this.parentNode;
	  var editInput = listItem.querySelectorAll("input[type=text")[0];
	  var label = listItem.querySelector("label");
	  var button = listItem.getElementsByTagName("button")[0];
	  var containsClass = listItem.classList.contains("editMode");
	  
	  if (containsClass) {
	      label.innerText = editInput.value;
	      button.innerText = "Edit";
	  } else {
	     editInput.value = label.innerText;
	     button.innerText = "Save";
	  }
	  
	  listItem.classList.toggle("editMode");
	};

	var deleteTask = function () {
	  var listItem = this.parentNode;
	  var ul = listItem.parentNode;
	  ul.removeChild(listItem);
	};

	var taskCompleted = function () {
	  var listItem = this.parentNode;
	  completedTasksHolder.appendChild(listItem);
	  bindTaskEvents(listItem, taskIncomplete);
	  console.log(listItem);
	};

	var taskIncomplete = function() {
	  var listItem = this.parentNode;
	  incompleteTasksHolder.appendChild(listItem);
	  bindTaskEvents(listItem, taskCompleted);
	  console.log(listItem);
	};

	var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	  var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
	  var editButton = taskListItem.querySelectorAll("button.edit")[0];
	  var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
	  editButton.onclick = editTask;
	  deleteButton.onclick = deleteTask;
	  checkBox.onchange = checkBoxEventHandler;
	};

	addButton.addEventListener("click", addTask);

	var storedNames = [];
	storedNames = JSON.parse(localStorage.getItem("names")); 
	var dummyObj = {};

	for (var i = 0, j = 0; i < (incompleteTasksHolder.children.length + storedNames.length); i++) {
		if(i < incompleteTasksHolder.children.length){
			bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
		}else if(i >= incompleteTasksHolder.children.length && j < storedNames.length){
			//dummyObj.outerHTML = "<li class=\"editMode\">\n                  <input type=\"checkbox\">\n                  <label>" + storedNames[j] + "</label>\n                  <input type=\"text\" value=\'" + storedNames[j] + "\'>\n                  <button class=\"edit\">Save</button>\n                  <button class=\"delete\">Delete</button>\n              </li>";
			//dummyObj.outerText = "Save\nDelete";
			//incompleteTasksHolder.innerHTML += dummyObj.outerHTML;
			
			dummyObj.outerHTML = "<li>\n                  <input type=\"checkbox\">\n                  <label>" + storedNames[j] + "</label>\n                  <input type=\"text\">\n                  <button class=\"edit\"><img src=\"https://img.icons8.com/cotton/2x/edit.png\" style=\"width : 1.5rem;\"/></button>\n                  <button class=\"delete\"><img src=\"https://cdn4.iconfinder.com/data/icons/small-color-v3/512/bin_delete_garbage_remove_trash-512.png\" style=\"width : 1.5rem;\"/></button>\n              </li>";
			dummyObj.outerText = "Pay Bills\nEdit\nDelete";
			incompleteTasksHolder.innerHTML += dummyObj.outerHTML;
			j++;
		}else{
			
		}
	}

	for (var i = 0; i < completedTasksHolder.children.length; i++) {
	  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
	}
	
})();
