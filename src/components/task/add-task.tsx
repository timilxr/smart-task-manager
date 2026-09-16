"use client"

import { SubmitEvent, useState } from "react";
import { IoMdAdd } from "react-icons/io";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ITask } from "@/shared/models/task";

type AddTaskProps = {
  onAdd: (task: ITask) => void;
};

export function AddTask({ onAdd }: AddTaskProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<ITask["urgency"]>("medium");
  const [importance, setImportance] = useState<ITask["importance"]>("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    const newTask: ITask = {
      id: Date.now(),
      title: trimmedTitle,
      description: description.trim(),
      completed: false,
      urgency,
      importance,
      dueDate: dueDate ? new Date(dueDate) : null,
      voiceTranscript: null,
    };

    onAdd(newTask);
    setTitle("");
    setDescription("");
    setUrgency("medium");
    setImportance("medium");
    setDueDate("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="m-0 rounded-full border-0 border-none p-0 shadow-lg shadow-gray-300"
            type="button"
          >
            <IoMdAdd className="h-8 w-8 rounded-full border-none stroke-none text-gray-500" />
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add a task</DialogTitle>
            <DialogDescription>
              Capture what needs to get done today and keep it visible in your queue.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="task-title">Title</Label>
              <Input
                id="task-title"
                name="title"
                placeholder="Finish project brief"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="task-description">Description</Label>
              <Input
                id="task-description"
                name="description"
                placeholder="Add notes for the sprint"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="task-urgency">Urgency</Label>
                <select
                  id="task-urgency"
                  name="urgency"
                  value={urgency}
                  onChange={(event) => setUrgency(event.target.value as ITask["urgency"])}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </Field>

              <Field>
                <Label htmlFor="task-importance">Importance</Label>
                <select
                  id="task-importance"
                  name="importance"
                  value={importance}
                  onChange={(event) => setImportance(event.target.value as ITask["importance"])}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </Field>
            </div>

            <Field>
              <Label htmlFor="task-date">Due date</Label>
              <Input
                id="task-date"
                name="dueDate"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline">Cancel</Button>} />
            <Button type="submit">Add task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}