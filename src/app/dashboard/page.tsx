import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MdToday } from 'react-icons/md';
import { IoIosAddCircle } from "react-icons/io";
import { TaskList } from '@/components/task/task-list';
import { ITask } from '@/shared/models/task';

export default async function DashboardPage() {
    const tasks: ITask[] = [
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
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-svh w-full items-center justify-center bg-white dark:bg-black">
        <div className="relative place-self-stretch border border-gray-300 w-1/4 p-2 m-3 rounded-lg shadow-2xl">
            <p>
                Hello <span>Tims</span>
                {/* Hello <span>{data.claims.email}</span> */}
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
        <div className="h-full w-3/4 p-3">
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-5xl font-bold mb-3">Today</h1>
            <div className="right">
                <div className="h-8 w-8 rounded-full shadow-xl">
                <IoIosAddCircle className="h-full w-full stroke-none border-none rounded-full text-gray-400" />
                </div>
            </div>
        </div>
        <TaskList tasks={tasks} />
        </div>
    </div>
  )
}
