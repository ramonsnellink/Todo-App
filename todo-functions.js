"use strict";

// add event handler to checkbox
// modify correct objects completed property -> toggleTodo (id)
// save and render

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
  document.querySelector("#todos").innerHTML = "";

  // maak h2 met aantal van todos die gedaan moeten worden (.length)
  document.querySelector("#todos").appendChild(generateSummaryDom(incompleteTodos));

  // maak een p voor elk element dat gefiltered is.
  filteredTodos.forEach((todo) => {
    document.querySelector("#todos").appendChild(generateTodoDom(todo));
  });
};

// generateTodoDom
const generateTodoDom = (todo) => {
  // setup container div
  const todoContainer = document.createElement("div");

  // setup checkbox

  const checkbox = document.createElement("input");
  checkbox.checked = todo.completed;
  checkbox.setAttribute("type", "checkbox");

  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  todoContainer.appendChild(checkbox);

  // setup span for todo text
  const todoSpan = document.createElement("span");
  todoSpan.textContent = todo.text;
  todoContainer.appendChild(todoSpan);

  const removeButton = document.createElement("button");
  removeButton.textContent = "x";
  todoContainer.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoContainer;
};

const generateSummaryDom = (incompleteTodos) => {
  const introParagraph = document.createElement("h2");
  introParagraph.textContent = `You have ${incompleteTodos.length} todo's left`;
  return introParagraph;
};
