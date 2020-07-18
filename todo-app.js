// remove paragraphs met de text "zeker"
let todos = getSavedTodos();

// leeg object waar de input in gaat.
const filters = {
  searchText: "",
  hideCompleted: false,
};

//functie die de todos filtered. input is een todo array, en filter

//render in ieder geval 1 keer. Voeg de todos array in een gebruik filters object.
renderTodos(todos, filters);

// luister en assign de input aan filters.searchText. Render opnieuw tijdens het luisteren.
document.querySelector("#searchtodo").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#addtodo").addEventListener("submit", (e) => {
  e.preventDefault();
  // push nieuw object naar array.
  todos.push({
    id: uuidv4(),
    text: e.target.elements.text.value,
    completed: false,
  });

  saveTodos(todos);
  // render opnieuw
  renderTodos(todos, filters);
  //clear value
  e.target.elements.text.value = "";
});

document.querySelector("#hidecompleted").addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
