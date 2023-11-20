// app.js
import TodoManager from './todoManager';
import DOM from './dom';

document.addEventListener('DOMContentLoaded', () => {
  // Your app initialization logic

  // Example usage:
  const project1 = TodoManager.createProject('Project 1');
  const todo1 = TodoManager.createTodo('Example Todo', 'Description', '2023-11-30', 'High', 'Some notes', ['Task 1', 'Task 2'], project1);
  console.log(todo1);
  console.log(project1.todos);
  // Use DOM module to render todos and projects to the UI
  DOM.renderProjects(); // Initial rendering of projects
  DOM.renderTodos(project1); // Initial rendering of todos in the default project
});
