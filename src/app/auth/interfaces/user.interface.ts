import { Task } from '../../home/interfaces/task.interface';

export interface User {
  id?: string;
  nombre: string;
  email: string;
  password?: string;
  tasks?: Task[];
}
