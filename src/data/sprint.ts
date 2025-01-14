import { Sprint } from "../interfaces/Sprint";
import task from "./task";

const sprints: Sprint[] = [
    { id: 1, projectId: 1, sprintTitle: 'Sprint 1', startDate: '2024-07-01', endDate: '2024-07-15', description: 'Initial setup',status:'In Progress',task:[task[1]] },
    { id: 2, projectId: 2, sprintTitle: 'Sprint 1', startDate: '2024-07-10', endDate: '2024-08-01', description: 'Feature development' ,status:'Not Started',task:[task[0],task[2]]},
    { id: 3, projectId: 3, sprintTitle: 'Sprint 1', startDate: '2024-08-01', endDate: '2024-08-20', description: 'Backend development',status:'In Progress' ,task:[task[4]]},
    { id: 4, projectId: 4, sprintTitle: 'Sprint 1', startDate: '2024-09-01', endDate: '2024-09-15', description: 'Requirement analysis' ,status:'Not Started',task:[task[4],task[3]]},
    { id: 5, projectId: 5, sprintTitle: 'Sprint 1', startDate: '2024-07-20', endDate: '2024-08-05', description: 'Data collection',status:'In Progress' ,task:[task[4],task[1]]},
    { id: 6, projectId: 6, sprintTitle: 'Sprint 1', startDate: '2024-08-05', endDate: '2024-08-25', description: 'UI design',status:'Not Started' ,task:[task[4],task[2]]},
    { id: 7, projectId: 7, sprintTitle: 'Sprint 1', startDate: '2024-08-15', endDate: '2024-09-05', description: 'API development',status:'In Progress',task:[task[0],task[2]] },
    { id: 8, projectId: 8, sprintTitle: 'Sprint 1', startDate: '2024-07-15', endDate: '2024-08-01', description: 'Feature integration' ,status:'Not Started',task:[]},
    { id: 9, projectId: 9, sprintTitle: 'Sprint 1', startDate: '2024-08-20', endDate: '2024-09-10', description: 'Training content',status:'In Progress' ,task:[]},
    { id: 10, projectId: 10, sprintTitle: 'Sprint 1', startDate: '2024-10-01', endDate: '2024-10-20', description: 'Prototype development',status:'In Progress',task:[] },
    { id: 11, projectId: 11, sprintTitle: 'Sprint 1', startDate: '2024-07-01', endDate: '2024-07-20', description: 'Initial development' ,status:'Not Started',task:[]},
    { id: 12, projectId: 12, sprintTitle: 'Sprint 1', startDate: '2024-09-01', endDate: '2024-09-30', description: 'Content creation' ,status:'In Progress',task:[]},
    { id: 13, projectId: 13, sprintTitle: 'Sprint 1', startDate: '2024-08-10', endDate: '2024-08-30', description: 'Dashboard design' ,status:'Not Started',task:[]},
    { id: 14, projectId: 14, sprintTitle: 'Sprint 1', startDate: '2024-10-01', endDate: '2024-10-31', description: 'System architecture',status:'Not Started' ,task:[]},
    { id: 15, projectId: 15, sprintTitle: 'Sprint 1', startDate: '2024-07-01', endDate: '2024-07-25', description: 'System setup' ,status:'In Progress',task:[]},
  ];

  export default sprints;