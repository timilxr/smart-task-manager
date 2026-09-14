import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { ITask } from "@/shared/models/task";

export function Task({task}: {readonly task: ITask}) {
    const {completed, title, description, id} = task;
  return (
      <Field orientation="horizontal" data-disabled={completed}>
        <Checkbox
          id={`task-${id}`}
          name={`task-${id}`}
          defaultChecked={completed}
          disabled={completed}
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