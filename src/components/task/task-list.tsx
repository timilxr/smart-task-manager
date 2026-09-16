
import { FieldGroup } from "../ui/field";
import { ITask } from "@/shared/models/task";
import { Task } from "./task";

export function TaskList({tasks}: {tasks: ITask[]}) {
  return (
    <FieldGroup className="max-w-sm">
        {tasks.map((task) => (
            <Task key={task.id} task={task} />
        ))}
    </FieldGroup>
  )
}