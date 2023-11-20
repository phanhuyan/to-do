// dom.js
import TodoManager from './todoManager';
import css from './style.css';
const DOM = (() => {
  const projectListContainer = document.getElementById('project-list');
  const todoListContainer = document.getElementById('todo-list');
  const todoDetailsContainer = document.getElementById('todo-details');
  const createProjectBtn = document.getElementById('createProjectBtn');
  const createTodoBtn = document.getElementById('createTodoBtn');

  const handleCreateTodo = () => {
    // make a dialog box
    const dialog = document.createElement('dialog');
    dialog.classList.add('create-todo-dialog');
    const form = document.createElement('form');
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.placeholder = 'Enter todo title';
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.name = 'description';
    descriptionInput.placeholder = 'Enter todo description';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.name = 'dueDate';
    dueDateInput.placeholder = 'Enter todo due date';
    const priorityInput = document.createElement('input');
    priorityInput.type = 'text';
    priorityInput.name = 'priority';
    priorityInput.placeholder = 'Enter todo priority';
    const notesInput = document.createElement('input');
    notesInput.type = 'text';
    notesInput.name = 'notes';
    notesInput.placeholder = 'Enter todo notes';
    const checklistInput = document.createElement('input');
    checklistInput.type = 'text';
    checklistInput.name = 'checklist';
    checklistInput.placeholder = 'Enter todo checklist';
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Create Todo';
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      const title = titleInput.value;
      const description = descriptionInput.value;
      const dueDate = dueDateInput.value;
      const priority = priorityInput.value;
      const notes = notesInput.value;
      const checklist = checklistInput.value;
      if (title) {
        const newTodo = TodoManager.createTodo(title, description, dueDate, priority, notes, checklist);
        renderTodos(TodoManager.getCurrentProject());
        dialog.close();
      }
    });
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => dialog.close());

    form.appendChild(titleInput);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateInput);
    form.appendChild(priorityInput);
    form.appendChild(notesInput);
    form.appendChild(checklistInput);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);
    dialog.appendChild(form);
    document.body.appendChild(dialog);
    dialog.showModal();
  };
  createTodoBtn.addEventListener('click', handleCreateTodo);
  const handleCreateProject = () => {
    const projectName = prompt('Enter project name:');
    if (projectName) {
      const newProject = TodoManager.createProject(projectName);
      renderProjects();
    }
  };
  // Event listener for the create project button
  createProjectBtn.addEventListener('click', handleCreateProject);
  const renderProjects = () => {
    // Clear existing projects
    projectListContainer.innerHTML = '';

    // Render each project
    TodoManager.getProjects().forEach((project) => {
      const projectElement = document.createElement('div');
      projectElement.classList.add('project');
      projectElement.textContent = project.name;

      // Add click event to display todos in the project
      projectElement.addEventListener('click', () => {
        // Clear background from all projects
        document.querySelectorAll('.project').forEach((element) => {
          element.classList.remove('selected-project');
        });
  
        // Add background to the clicked project
        projectElement.classList.add('selected-project');
  
        // Render todos for the selected project
        renderTodos(project);
      });

      projectListContainer.appendChild(projectElement);
    });
  };

  const renderTodos = (project) => {
    // Clear existing todos
    TodoManager.setCurrentProject(project);
    todoListContainer.innerHTML = '';
    console.log(project);
    // Render each todo in the project
    project.todos.forEach((todo) => {
      console.log(todo);
      const todoElement = document.createElement('div');
      todoElement.classList.add('todo');
      todoElement.innerHTML = `<strong>${todo.title}</strong> - ${todo.dueDate}`;

      // Highlight priority with different colors
      todoElement.style.backgroundColor = getPriorityColor(todo.priority);

      // Add click event to display todo details
      todoElement.addEventListener('click', () => renderTodoDetails(todo));

      todoListContainer.appendChild(todoElement);
    });
  };

  const renderTodoDetails = (todo) => {
      // Create a modal container
      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modal-container');
  
      // Create a modal content
      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
  
      // Create a close button for the modal
      const closeButton = document.createElement('button');
      closeButton.classList.add('close-button');
      closeButton.innerHTML = '&times;'; // '×' symbol for close
  
      // Add a click event to the close button
      closeButton.addEventListener('click', () => {
        modalContainer.style.display = 'none';
      });
  
      // Create content for the modal (todo details)
      const todoDetails = document.createElement('div');
      todoDetails.innerHTML = `
        <h2>${todo.title}</h2>
        <p>Description: ${todo.description}</p>
        <p>Due Date: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
        <p>Notes: ${todo.notes}</p>
        <p>Checklist: ${todo.checklist}</p>
      `;
  
      // Append close button and todo details to the modal content
      modalContent.appendChild(closeButton);
      modalContent.appendChild(todoDetails);
  
      // Append modal content to the modal container
      modalContainer.appendChild(modalContent);
  
      // Append the modal container to the body
      document.body.appendChild(modalContainer);
  
      // Display the modal
      modalContainer.style.display = 'block';
  };



  const deleteTodo = (todo) => {
    // Delete the todo from the project
    const project = TodoManager.getProjectByTodo(todo);
    project.deleteTodo(todo);

    // Re-render the todos
    renderTodos(project);

    // Clear todo details
    todoDetailsContainer.innerHTML = '';
  };
  const editTodo = (todo) => {
    // Edit the todo from the project
    const project = TodoManager.getProjectByTodo();
    project.editTodo();

    // Re-render the todos
    renderTodos(project);
  }
  const getPriorityColor = (priority) => {
    // Implement logic to determine color based on priority
    // For example: High priority - red, Medium priority - yellow, Low priority - green
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'yellow';
      case 'Low':
        return 'green';
      default:
        return 'white';
    }
  };

  // Initial render
  renderProjects();

  return {
    // Expose necessary functions to interact with the DOM
    renderProjects,
    renderTodos,
    renderTodoDetails,
    deleteTodo,
  };
})();

export default DOM;
