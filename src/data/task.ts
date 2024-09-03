import { Task } from "../interfaces/Task";

const tasks: Task[] =[
    {
    id: 1,
    title: 'Create Landing Page',
    resources: {
      frontend: 3,
      backend: 1,
      qa: 1,
    },
    status: 'In Progress',
    description: 'Develop the main landing page for the application, including the header, footer, and main content sections.',
  },
  {
    id: 2,
    title: 'Implement Authentication',
    resources: {
      frontend: 2,
      backend: 2,
      qa: 2,
    },
    status: 'Completed',
    description: 'Implement user authentication using OAuth and JWT for secure login and signup processes.',
  },
  {
    id: 3,
    title: 'Set Up Database',
    resources: {
      frontend: 0,
      backend: 3,
      qa: 1,
    },
    status: 'Not Started',
    description: 'Configure the database schema and set up initial tables for storing user and project data.',
  },
  {
    id: 4,
    title: 'Create User Dashboard',
    resources: {
      frontend: 4,
      backend: 2,
      qa: 1,
    },
    status: 'In Progress',
    description: 'Design and develop a user dashboard that displays user-specific data and allows for personalized settings.',
  },
  {
    id: 5,
    title: 'Develop API Endpoints',
    resources: {
      frontend: 0,
      backend: 5,
      qa: 2,
    },
    status: 'Not Started',
    description: 'Develop the necessary API endpoints to support frontend interactions, including CRUD operations for user data.',
  },
]

export default tasks;