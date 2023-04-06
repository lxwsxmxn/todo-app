// localStorage.clear();
function reloadTodoItems(text, id, textClass, doneBtnText) {
	const todoItem = document.createElement("div");
	todoItem.classList.add("todo-item");
	todoItem.id = id;
	if (textClass == "done") {
		todoItem.appendChild(addTodoText(text, textClass));
	}
	else {
		todoItem.appendChild(addTodoText(text));
	}
	todoItem.appendChild(createDoneBtn());
	todoItem.appendChild(createDelBtn(doneBtnText));
		return todoItem;
}
				
const initTodoList = () => {
	localStorage.setItem("itemIdNum", 1);
	localStorage.setItem("itemIdObj", JSON.stringify({})); // This object contains {todoItemId:todoItemText} key:value pairs
	localStorage.setItem("itemIdArr", JSON.stringify([])); // This array contains the id numbers for the todo items
}
			
if (localStorage.length == 0) { initTodoList(); }

function clearTodoList() {
	localStorage.clear();
	initTodoList();
	document.getElementById("todo-item-container").innerHTML = "";
}
			
function reload() {
	const idObj = JSON.parse(localStorage.getItem("itemIdObj"));
	const idArr = JSON.parse(localStorage.getItem("itemIdArr"));
	const ic = document.getElementById("todo-item-container");
	ic.innerHTML = "";
	
	for (let id = 0; id < idArr.length; id++) {
		const textSelect = idObj[idArr[id]][0];
		const classSelect = idObj[idArr[id]][1];
		const doneBtnTextSelect = idObj[idArr[id]][2];
		ic.appendChild(reloadTodoItems(textSelect, id, classSelect, doneBtnTextSelect));
	}
}

function createDelBtn() {
	// Create delete button node
	const delBtn = document.createElement("button");
	delBtn.setAttribute('onClick', 'deleteItem(this)');
	delBtn.classList.add("btn");
	delBtn.innerHTML = "DELETE";
	return delBtn;
}

function createDoneBtn(text="DONE") {
	// Create done button node
	const doneBtn = document.createElement("button");
	doneBtn.setAttribute('onClick', 'done(this)');
	doneBtn.classList.add("btn");
	doneBtn.innerHTML = text;
	return doneBtn;
}
			
function addTodoText(text, textClass="") {
	const todoText = document.createElement("span");
	if (textClass == "done") {
		todoText.classList.add(textClass);
	}
 	todoText.innerHTML = text;
	return todoText;
}
			

// This function is responsible for adding todo items to the items' container
function addItem(fNode) {
	const ic = document.getElementById("todo-item-container");
				
	let itemIdNum = localStorage.getItem("itemIdNum");
	const itemIdObj = JSON.parse(localStorage.getItem("itemIdObj"));
	const itemIdArr = JSON.parse(localStorage.getItem("itemIdArr"));

	const itemInput = fNode.todo_input.value;
	if (itemInput == "") {
		return null;
	}
	const todoItem = document.createElement("div");
				
	const todoText = addTodoText(itemInput);
	const doneBtn = createDoneBtn();
	const delBtn = createDelBtn();

	todoItem.id = "todo_item"+itemIdNum;
	itemIdNum++;

	// Adds todoItem to todo-item-container
	ic.appendChild(todoItem);

	// Adds the todoText, doneBtn and delBtn to todoItem;
	todoItem.appendChild(todoText);
	todoItem.appendChild(doneBtn);
	todoItem.appendChild(delBtn);
				
	todoItem.classList.add("todo-item");
	// The empty string is a place holder for the CSS .done styling class
	itemIdObj[todoItem.id] = [todoText.innerHTML, "", doneBtn.innerHTML];
	itemIdArr.push(todoItem.id);
	// console.log(itemIdObj);
				
	localStorage.setItem("itemIdObj", JSON.stringify(itemIdObj));
	localStorage.setItem("itemIdArr", JSON.stringify(itemIdArr));
	localStorage.setItem("itemIdNum", itemIdNum);
}


// This function is responsible for marking a todo item as done, aswell as to undo it
// The function also makes sure the text contained in the button alternates between 'done' and 'undo'
function done(iNode) {
	const itemIdObj = JSON.parse(localStorage.getItem("itemIdObj"));
	iNode.parentNode.firstElementChild.classList.toggle("done");
	if (iNode.innerHTML == "DONE") {
		itemIdObj[iNode.parentNode.id][2] = "UNDO";
		itemIdObj[iNode.parentNode.id][1] = "done";
		iNode.innerHTML = itemIdObj[iNode.parentNode.id][2];
		localStorage.setItem("itemIdObj", JSON.stringify(itemIdObj));
	}
	else {
		itemIdObj[iNode.parentNode.id][2] = "DONE";
		itemIdObj[iNode.parentNode.id][1] = "";
		iNode.innerHTML = itemIdObj[iNode.parentNode.id][2];
		localStorage.setItem("itemIdObj", JSON.stringify(itemIdObj))
	}
}	


// This function is responsible for deleting a todo item
function deleteItem(iNode) {
	const itemIdObj = JSON.parse(localStorage.getItem("itemIdObj"));
	const itemIdArr = JSON.parse(localStorage.getItem("itemIdArr"));
	itemIdArr.splice(itemIdArr.indexOf(iNode.parentNode.id), 1); // deleting id from itemIdArr array
	delete itemIdObj[iNode.parentNode.id]; // deleting array from itemIdObj.
	let item = document.getElementById(iNode.parentNode.id);
	let parentEl = document.getElementById("todo-item-container");
	parentEl.removeChild(item);
	localStorage.setItem("itemIdObj", JSON.stringify(itemIdObj));
	localStorage.setItem("itemIdArr", JSON.stringify(itemIdArr));
	console.log(itemIdObj);
}

