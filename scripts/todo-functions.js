"use strict";

//Fetch exisiting todos from storage: getSavedTodos
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  // kijk of er correcte data is, zo niet, return een lege string. Als er foutieve data is, return ook een lege string.
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};
//save todos localstorage: saveTodos

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Je gebruikt hier findIndex omdat je moet splitten bij de index. Niet de waarde
const removeTodo = (id) => {
  // vind index van de todo. returned true of false
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  // als true, verwijder de todo. DIT IS NIET EENS NODIG!
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Hier gebruik je find, omdat je een waarde wilt aanpassen, niet een index weghalen.
// Hoe werkt die ID check?
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);

  // CHECK
  if (todo) {
    // dit is de flip. Op basis van todo, welke een functie is de de specifieke todo selecteerd. Hij returned de ID.
    todo.completed = !todo.completed;
  }
};

//renderTodos
const renderTodos = (todos, filters) => {
  const todoEl = document.querySelector("#todos");

  //check of de indiv todo text matched met de filter input
  let filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    // return als hideCompleted filter false is (dus niet gechecked). Of als de todo compled false is.
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  // op basis van zoekfilter (filtereredTodos), kijk welke completed zijn.
  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  // clear todos div
  todoEl.innerHTML = "";

  // maak h2 met aantal van todos die gedaan moeten worden (.length)
  todoEl.appendChild(generateSummaryDom(incompleteTodos));

  // maak een p voor elk element dat gefiltered is. Als er geen todos zijn om te laten zien, laat dan een message zien.
  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todoEl.appendChild(generateTodoDom(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "No Todo's to show";
    todoEl.appendChild(messageEl);
  }
};

// generateTodoDom
const generateTodoDom = (todo) => {
  // setup container div
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoSpan = document.createElement("span");
  const removeButton = document.createElement("button");

  // setup checkbox

  checkbox.checked = todo.completed;
  checkbox.setAttribute("type", "checkbox");

  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  containerEl.appendChild(checkbox);

  // setup span for todo text
  todoSpan.textContent = todo.text;
  containerEl.appendChild(todoSpan);

  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");

  todoEl.appendChild(containerEl);

  removeButton.classList.add("button", "button--text");
  removeButton.textContent = "remove";
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

const generateSummaryDom = (incompleteTodos) => {
  const introParagraph = document.createElement("h2");
  introParagraph.classList.add("list-title");
  if (incompleteTodos.length > 1) {
    introParagraph.textContent = `You have ${incompleteTodos.length} todo's left`;
  } else {
    introParagraph.textContent = `You have ${incompleteTodos.length} todo left`;
  }

  return introParagraph;
};

//add list-title class
// als je 1 todo hebt dan enkel, anders meervoud.
