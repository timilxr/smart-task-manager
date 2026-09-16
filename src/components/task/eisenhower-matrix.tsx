import { ITask } from "@/shared/models/task";
import { Task } from "./task";

export type EisenhowerQuadrant =
  | "urgent-important"
  | "not-urgent-important"
  | "urgent-not-important"
  | "not-urgent-not-important";

export type EisenhowerMatrixTasks = Record<EisenhowerQuadrant, ITask[]>;

const quadrantOrder: Array<{
  id: EisenhowerQuadrant;
  title: string;
  action: string;
  className: string;
}> = [
  {
    id: "urgent-important",
    title: "Do first",
    action: "Urgent and important",
    className: "border-red-200 bg-red-50/70",
  },
  {
    id: "not-urgent-important",
    title: "Schedule",
    action: "Not urgent and important",
    className: "border-blue-200 bg-blue-50/70",
  },
  {
    id: "urgent-not-important",
    title: "Delegate",
    action: "Urgent and not important",
    className: "border-amber-200 bg-amber-50/70",
  },
  {
    id: "not-urgent-not-important",
    title: "Eliminate",
    action: "Not urgent and not important",
    className: "border-gray-200 bg-gray-50/70",
  },
];

export function groupTasksByQuadrant(tasks: ITask[]): EisenhowerMatrixTasks {
  const grouped: EisenhowerMatrixTasks = {
    "urgent-important": [],
    "not-urgent-important": [],
    "urgent-not-important": [],
    "not-urgent-not-important": [],
  };

  for (const task of tasks) {
    const isUrgent = task.urgency === "high";
    const isImportant = task.importance === "high";

    if (isUrgent && isImportant) {
      grouped["urgent-important"].push(task);
    } else if (!isUrgent && isImportant) {
      grouped["not-urgent-important"].push(task);
    } else if (isUrgent && !isImportant) {
      grouped["urgent-not-important"].push(task);
    } else {
      grouped["not-urgent-not-important"].push(task);
    }
  }

  return grouped;
}

type EisenhowerMatrixProps = {
  tasks: ITask[];
  quadrant?: EisenhowerQuadrant;
};

export function EisenhowerMatrix({ tasks, quadrant }: EisenhowerMatrixProps) {
  const groupedTasks = groupTasksByQuadrant(tasks);
  const quadrants = quadrantOrder.filter((item) => !quadrant || item.id === quadrant);

  return (
    <section aria-label="Eisenhower Matrix" className="grid gap-4 md:grid-cols-2">
      {quadrants.map((quadrantDefinition) => {
        const quadrantTasks = groupedTasks[quadrantDefinition.id];

        return (
          <article
            key={quadrantDefinition.id}
            className={`min-h-52 rounded-xl border p-4 shadow-sm ${quadrantDefinition.className}`}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{quadrantDefinition.title}</h2>
                <p className="text-sm text-muted-foreground">{quadrantDefinition.action}</p>
              </div>
              <span className="rounded-full bg-white/80 px-2.5 py-1 text-sm font-medium text-foreground">
                {quadrantTasks.length}
              </span>
            </div>

            {quadrantTasks.length > 0 ? (
              <div className="space-y-3">
                {quadrantTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No tasks here yet.</p>
            )}
          </article>
        );
      })}
    </section>
  );
}