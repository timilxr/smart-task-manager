export interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  urgency: "low" | "medium" | "high";
  importance: "low" | "medium" | "high";
  dueDate: Date | null;
  voiceTranscript: string | null;
}