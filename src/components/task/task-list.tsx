
"use client"

import { useEffect, useRef, useState } from "react";

import { FieldGroup } from "../ui/field";
import { ITask } from "@/shared/models/task";
import { Task } from "./task";

type TaskListProps = {
  tasks: ITask[];
  onToggleComplete?: (taskId: number, completed: boolean) => void;
};

export function TaskList({ tasks, onToggleComplete }: TaskListProps) {
  const [delayedCompletedIds, setDelayedCompletedIds] = useState<Set<number>>(new Set());
  const completionTimers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    return () => {
      completionTimers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleToggleComplete = (taskId: number, completed: boolean) => {
    if (!completed) {
      setDelayedCompletedIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(taskId);
        return nextIds;
      });
      onToggleComplete?.(taskId, false);
      return;
    }

    setDelayedCompletedIds((currentIds) => new Set(currentIds).add(taskId));
    onToggleComplete?.(taskId, true);

    const existingTimer = completionTimers.current.get(taskId);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timer = setTimeout(() => {
      setDelayedCompletedIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(taskId);
        return nextIds;
      });
      completionTimers.current.delete(taskId);
    }, 1000);

    completionTimers.current.set(taskId, timer);
  };

  const activeTasks = tasks.filter((task) => !task.completed || delayedCompletedIds.has(task.id));
  const completedTasks = tasks.filter((task) => task.completed && !delayedCompletedIds.has(task.id));

  return (
    <div className="space-y-6">
      <section aria-labelledby="active-tasks-heading">
        <h3 id="active-tasks-heading" className="mb-3 text-lg font-medium">To do</h3>
        <FieldGroup className="max-w-sm">
          {activeTasks.length > 0 ? activeTasks.map((task) => (
            <Task key={task.id} task={task} onToggleComplete={handleToggleComplete} />
          )) : <p className="text-sm text-muted-foreground">No active tasks.</p>}
        </FieldGroup>
      </section>

      <section aria-labelledby="completed-tasks-heading">
        <h3 id="completed-tasks-heading" className="mb-3 text-lg font-medium">Completed</h3>
        <FieldGroup className="max-w-sm">
          {completedTasks.length > 0 ? completedTasks.map((task) => (
            <Task key={task.id} task={task} onToggleComplete={handleToggleComplete} />
          )) : <p className="text-sm text-muted-foreground">No completed tasks.</p>}
        </FieldGroup>
      </section>
    </div>
  )
}