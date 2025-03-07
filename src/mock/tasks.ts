import { TaskType } from '../types/task';

export const mockTasks: TaskType[] = [
  {
    id: '2asdX13asfa',
    dateAdded: new Date('2025-03-02'),
    dueDate: new Date(),
    title: 'CMSC 129 Lab',
    description:
      'Angular Laboratory exercise that is a little bit fun and sometimes frustrating because Angular sucks!',
    priority: 'High',
  },
  {
    id: '4Xas34ag5',
    dateAdded: new Date('2025-03-05'),
    dueDate: new Date('2025-03-08'),
    title: 'Codeforces Div. 2',
    description: 'Do some competitive programming!',
    priority: 'Mid',
  },
  {
    id: '8asdx123',
    dateAdded: new Date('2025-03-01'),
    dueDate: new Date('2025-03-06'),
    title: 'CMSC 125 Long Exam 1',
    description:
      'The test was fine! It was okay! I liked the test! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere qui eum in veritatis quam expedita impedit, nobis officia neque fugit!',
    priority: 'Low',
  },
];
