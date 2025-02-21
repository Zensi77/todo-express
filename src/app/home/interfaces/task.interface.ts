import { User } from '../../auth/interfaces/user.interface';

export interface Task {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  user: User;
}
