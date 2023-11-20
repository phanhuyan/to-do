// todo.js
class Todo {
    constructor(title, description, dueDate, priority, notes = '', checklist = []) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.notes = notes;
      this.checklist = checklist;
      this.completed = false;
    }
  
    // Additional methods for managing the todo
    markAsComplete() {
      this.completed = true;
    }
  
    updatePriority(newPriority) {
      this.priority = newPriority;
    }
  
    // Add other methods as needed
  }
  
  export default Todo;
  