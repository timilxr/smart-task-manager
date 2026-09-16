import type { SupabaseClient } from "@supabase/supabase-js";

import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { ITask } from "@/shared/models/task";

type TaskRow = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  urgency: ITask["urgency"];
  importance: ITask["importance"];
  due_date: string | null;
  voice_transcript: string | null;
};

const taskColumns = "id, title, description, completed, urgency, importance, due_date, voice_transcript";

function mapTaskRow(row: TaskRow): ITask {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    completed: row.completed,
    urgency: row.urgency,
    importance: row.importance,
    dueDate: row.due_date ? new Date(row.due_date) : null,
    voiceTranscript: row.voice_transcript,
  };
}

export async function getTasks(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select(taskColumns)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to load tasks: ${error.message}`);
  }

  return (data as TaskRow[]).map(mapTaskRow);
}

export async function createTask(task: ITask) {
  const supabase = createBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    throw new Error("You must be signed in to create a task.");
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: userData.user.id,
      title: task.title,
      description: task.description || null,
      completed: task.completed,
      urgency: task.urgency,
      importance: task.importance,
      due_date: task.dueDate?.toISOString() ?? null,
      voice_transcript: task.voiceTranscript,
    })
    .select(taskColumns)
    .single();

  if (error) {
    throw new Error(`Unable to create task: ${error.message}`);
  }

  return mapTaskRow(data as TaskRow);
}

export async function updateTaskCompletion(taskId: number, completed: boolean) {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from("tasks")
    .update({ completed })
    .eq("id", taskId)
    .select(taskColumns)
    .single();

  if (error) {
    throw new Error(`Unable to update task: ${error.message}`);
  }

  return mapTaskRow(data as TaskRow);
}