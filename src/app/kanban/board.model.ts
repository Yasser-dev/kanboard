export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

export interface Task {
  description?: string;
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'gray';
}
