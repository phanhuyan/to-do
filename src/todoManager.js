// todoManager.js
import Todo from './todo';
import Project from './project';
import { get } from 'lodash';

const TodoManager = (() => {
  const projects = [];
  let currentProject = null;
  const getDefaultProject = () => {
    // Create a default project
    const defaultProject = new Project('Default Project');
    projects.push(defaultProject);
    return defaultProject;
  };
  const getCurrentProject = () => {
    return currentProject;
  }
  const setCurrentProject = (project) => {
    currentProject = project;
  }
  const createTodo = (title, description, dueDate, priority, notes, checklist, project = getCurrentProject()) => {
    if (!project) {
      return;
    }
    const newTodo = new Todo(title, description, dueDate, priority, notes, checklist);
    project.addTodo(newTodo);
    return newTodo;
  };

  const createProject = (name) => {
    const newProject = new Project(name);
    projects.push(newProject);
    return newProject;
  };
  const getProjects = () => {
    return projects;
  };
  const getProjectByTodo = (todo) => {
    return projects.find((project) => project.todos.includes(todo));
  };

  // Add other methods for managing todos and projects
  
  return {
    getProjects,
    getDefaultProject,
    createTodo,
    createProject,
    getProjectByTodo,
    getCurrentProject,
    setCurrentProject
    // Add other methods as needed
  };
})();

export default TodoManager;
