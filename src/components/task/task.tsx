import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { ITask } from "@/shared/models/task";

type TaskProps = {
  readonly task: ITask;
  readonly onToggleComplete?: (taskId: number, completed: boolean) => void;
};

export function Task({ task, onToggleComplete }: TaskProps) {
    const {completed, title, description, id} = task;
  return (
      <Field orientation="horizontal" data-disabled={completed}>
        <Checkbox
          id={`task-${id}`}
          name={`task-${id}`}
          checked={completed}
          className={completed ? "border-gray-400 bg-gray-400 text-white" : undefined}
          onCheckedChange={(checked) => {
            onToggleComplete?.(id, checked === true);
          }}
        />
        <FieldContent>
          <FieldLabel htmlFor={`task-${id}`}>
            {title}
          </FieldLabel>
          <FieldDescription>
            {description}
          </FieldDescription>
        </FieldContent>
      </Field>
  )
}