// project.js
class Project {
    constructor(name) {
      this.name = name;
      this.todos = [];
    }
  
    addTodo(todo) {
      this.todos.push(todo);
    }
    // Add other methods as needed\
    deleteTodo(todo) {
        this.todos = this.todos.filter((t) => t !== todo);
      }
    editTodo() {
        // Edit the todo
      }
  }
  
  export default Project;
  