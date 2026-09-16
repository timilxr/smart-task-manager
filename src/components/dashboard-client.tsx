"use client"

import { useState } from 'react'

import { LogoutButton } from '@/components/logout-button'
import { AddTask } from '@/components/task/add-task';
import { EisenhowerMatrix } from '@/components/task/eisenhower-matrix';
import { TaskList } from '@/components/task/task-list';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ITask } from '@/shared/models/task';
import { MdToday } from 'react-icons/md';

const initialTasks: ITask[] = [
    {
        id: 1,
        title: "Task 1",
        description: "This is the first task",
        completed: false,
        urgency: "medium",
        importance: "high",
        dueDate: new Date(),
        voiceTranscript: null
    },
    {
        id: 2,
        title: "Task 2",
        description: "This is the second task",
        completed: true,
        urgency: "low",
        importance: "medium",
        dueDate: new Date(),
        voiceTranscript: null
    }
]

export function DashboardClient() {
    const [tasks, setTasks] = useState<ITask[]>(initialTasks)

    const handleAddTask = (task: ITask) => {
        setTasks((currentTasks) => [task, ...currentTasks])
    }

    return (
        <div className="flex h-svh w-full items-center justify-center bg-white dark:bg-black">
            <div className="relative place-self-stretch border border-gray-300 w-1/4 p-2 m-3 rounded-lg shadow-2xl">
                <p>
                    Hello <span>Tims</span>
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Card className="text-white bg-gray-500">
                        <CardContent className="flex items-center justify-between gap-4">
                            <MdToday className="h-8 w-8" />
                            <p className="text-2xl font-bold">9</p>
                        </CardContent>
                        <CardFooter className="border-0 bg-transparent">
                            <p>Today</p>
                        </CardFooter>
                    </Card>
                    <Card className="text-white bg-blue-500">
                        <CardContent className="flex items-center justify-between gap-4">
                            <MdToday className="h-8 w-8" />
                            <p className="text-2xl font-bold">9</p>
                        </CardContent>
                        <CardFooter className="border-0 bg-transparent">
                            <p>Today</p>
                        </CardFooter>
                    </Card>
                </div>
                <LogoutButton className="absolute bottom-4 right-4" />
            </div>
            <div className="h-full w-3/4 overflow-y-auto p-3">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="mb-3 text-5xl font-bold">Today</h1>
                    <div className="right">
                        <AddTask onAdd={handleAddTask} />
                    </div>
                </div>
                <EisenhowerMatrix tasks={tasks} />
                <section className="mt-8">
                    <h2 className="mb-4 text-2xl font-semibold">All tasks</h2>
                    <TaskList tasks={tasks} />
                </section>
            </div>
        </div>
    )
}