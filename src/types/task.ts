export type TaskContext = "HOME" | "WORK" | "ANYWHERE";
export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";
export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "WAITING"
  | "COMPLETED"
  | "CANCELLED";

export interface Task {
  id: string;
  title: string;
  context: TaskContext;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  estimatedMinutes: number | null;
  waitingReason?: string | null;
}
