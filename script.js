class ToDoList {
    constructor() {
        this.addButton = document.getElementById("js-add");
        this.input = document.getElementById("js-input");
        this.listTodo = document.getElementById("js-list-todo");
        this.listDone = document.getElementById("js-list-done");
        this.storedTodoItems = JSON.parse(window.localStorage.getItem("todo")) || [];
        this.storedCheckedItems = JSON.parse(window.localStorage.getItem("done")) || [];

        this.addButton.addEventListener("click", (e) => this.addToDo(e));

        this.init();
    }

    init() {
        this.storedTodoItems.forEach((item) => {
            this.addListElement(item.name, item.id, this.listTodo, true);
        });

        this.storedCheckedItems.forEach((item) => {
            this.addListElement(item.name, item.id, this.listDone, false);
        });
    }

    addListElement(name, id, list, withButtons) {
        let listElement = this.createListElement(name, id, withButtons);
        listElement.setAttribute("data-index", id);
        list.appendChild(listElement);

        if (withButtons) {
            this.addEditDoneButtons(listElement, id);
        } else {
            this.addDeleteButton(listElement, id);
        }
    }

    addToDo(e) {
        e.preventDefault();

        if (this.input.value !== "") {
            let todoListItems = this.listTodo.querySelectorAll("li");

            let lastId = 0;
            if (todoListItems.length) {
                lastId = parseInt(todoListItems[todoListItems.length - 1].getAttribute("data-index")) + 1;
            }

            this.addListElement(this.input.value, lastId, this.listTodo, true);
            this.addToLocalStorage(this.input.value, lastId, "todo");

            this.input.value = "";
        } else {
            this.input.classList.add("error");
        }
    }

    createListElement(title, index, withButtons) {
        const text = document.createTextNode(title);
        const listElement = document.createElement("li");
        listElement.setAttribute("data-index", index);
        listElement.classList.add("listElement");
        listElement.appendChild(text);

        if (withButtons) {
            listElement.classList.add("todo");
        } else {
            listElement.classList.add("done");
        }

        return listElement;
    }

    addEditDoneButtons(listElement, index) {
        const buttonWrapper = document.createElement("div");
        buttonWrapper.classList.add("buttonWrapper");

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.classList.add("glow-on-hover", "edit");
        editButton.addEventListener("click", (e) => {
            this.editItem(e, editButton);
        });

        const doneButton = document.createElement("button");
        doneButton.innerText = "Done";
        doneButton.classList.add("glow-on-hover", "todo-done");
        doneButton.addEventListener("click", (e) => {
            this.markAsDone(e, doneButton);
        });

        buttonWrapper.appendChild(editButton);
        buttonWrapper.appendChild(doneButton);

        listElement.appendChild(buttonWrapper);
    }

    addDeleteButton(listElement, index) {
        const buttonWrapper = document.createElement("div");
        buttonWrapper.classList.add("buttonWrapper");

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("glow-on-hover", "delete");
        deleteButton.addEventListener("click", (e) => {
            this.deleteItem(e, deleteButton);
        });

        buttonWrapper.appendChild(deleteButton);

        listElement.appendChild(buttonWrapper);
    }

    markAsDone(e, elem) {
        e.preventDefault();
        const listItem = elem.parentElement.parentElement;
        const text = listItem.firstChild.textContent;

        listItem.remove();
        this.removeFromLocalStorage(listItem.getAttribute("data-index"), "todo");
        this.addListElement(text, listItem.getAttribute("data-index"), this.listDone, false);
        this.addToLocalStorage(text, listItem.getAttribute("data-index"), "done");
    }

    editItem(e, elem) {
        e.preventDefault();
        const listItem = elem.parentElement.parentElement;
        const text = listItem.firstChild.textContent;

        const newText = prompt("Edit task:", text);

        if (newText !== null) {
            listItem.firstChild.textContent = newText;
            const index = listItem.getAttribute("data-index");
            this.updateLocalStorage(index, newText, "done");
        }
    }

    deleteItem(e, elem) {
        e.preventDefault();
        const listItem = elem.parentElement.parentElement;
        const index = listItem.getAttribute("data-index");

        listItem.remove();
        this.removeFromLocalStorage(index, "done");
    }

    addToLocalStorage(item, index, storage) {
        let newStorage = [];
        if (storage === "todo") {
            newStorage = this.storedTodoItems;
        } else if (storage === "done") {
            newStorage = this.storedCheckedItems;
        }

        newStorage.push({
            name: item,
            id: index,
        });

        window.localStorage.setItem(storage, JSON.stringify(newStorage));
    }

    removeFromLocalStorage(index, storage) {
        let newStoredItems = storage === "todo" ? this.storedTodoItems : this.storedCheckedItems;
        let removeItem = newStoredItems.find((item) => parseInt(item.id) === parseInt(index));
        let removeIndex = newStoredItems.indexOf(removeItem);

        newStoredItems.splice(removeIndex, 1);

        if (storage === "todo") {
            this.storedTodoItems = newStoredItems;
        } else if (storage === "done") {
            this.storedCheckedItems = newStoredItems;
        }

        window.localStorage.setItem(storage, JSON.stringify(newStoredItems));
    }

    updateLocalStorage(index, newText, storage) {
        let updatedItems = storage === "todo" ? this.storedTodoItems : this.storedCheckedItems;
        let updatedItem = updatedItems.find((item) => parseInt(item.id) === parseInt(index));
        updatedItem.name = newText;

        window.localStorage.setItem(storage, JSON.stringify(updatedItems));
    }
}


new ToDoList();




// Función para abrir el modal de la lista de tareas
document.getElementById('openModalTodo').addEventListener('click', function() {
    var modal = document.getElementById('modalTodoList');
    modal.style.display = 'block';
  });
  
  // Función para cerrar el modal de la lista de tareas
  document.getElementById('closeModal').addEventListener('click', function() {
    var modal = document.getElementById('modalTodoList');
    modal.style.display = 'none';
  });