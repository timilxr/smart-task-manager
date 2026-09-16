import { DashboardClient } from '@/components/dashboard-client';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getTasks } from '@/services/task-service';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims?.sub) {
        redirect('/auth/login');
    }

    const tasks = await getTasks(supabase, data.claims.sub);

    return <DashboardClient initialTasks={tasks} />;
}
