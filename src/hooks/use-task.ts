"use client"

import { useState } from "react";

import { createTask, updateTaskCompletion } from "@/services/task-service";
import { ITask } from "@/shared/models/task";

export function useTask(initialTasks: ITask[]) {
  const [tasks, setTasks] = useState(initialTasks);
  const [error, setError] = useState<string | null>(null);

  const addTask = async (task: ITask) => {
    setError(null);

    try {
      const savedTask = await createTask(task);
      setTasks((currentTasks) => [savedTask, ...currentTasks]);
    } catch (taskError) {
      setError(taskError instanceof Error ? taskError.message : "Unable to create task.");
      throw taskError;
    }
  };

  const updateTask = async (taskId: number, completed: boolean) => {
    setError(null);
    const previousTask = tasks.find((task) => task.id === taskId);

    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === taskId ? { ...task, completed } : task
    )));

    try {
      const savedTask = await updateTaskCompletion(taskId, completed);
      setTasks((currentTasks) => currentTasks.map((task) => task.id === taskId ? savedTask : task));
    } catch (taskError) {
      if (previousTask) {
        setTasks((currentTasks) => currentTasks.map((task) => (
          task.id === taskId ? previousTask : task
        )));
      }

      setError(taskError instanceof Error ? taskError.message : "Unable to update task.");
    }
  };

  return { tasks, addTask, updateTask, error };
}