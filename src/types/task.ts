export type TaskFormType = Partial<{
  title: string | null;
  description: string | null;
  priority: string | null;
  date: string | null;
  time: string | null;
}>;

export type TaskType = {
  id: string;
  dateAdded: Date;
  dueDate: Date;
  title: string;
  description: string;
  priority: string;
};
