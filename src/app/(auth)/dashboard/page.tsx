import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import React from 'react';

import { TableJob } from '@/components/table-job';

export default function DashboardPage() {
  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Job Posts</h1>
        <p className="text-muted-foreground text-base max-w-2xl">
          Here you can manage all the jobs you have posted. Edit, update, or
          remove your job listings to keep your opportunities up to date and
          attract the best candidates.
        </p>
      </div>
      <div className="flex justify-start mb-4">
        <Button asChild className="gap-2" size="sm">
          <Link href="/dashboard/add">
            <Plus className="w-4 h-4" /> Add Job
          </Link>
        </Button>
      </div>
      <TableJob />
    </main>
  );
}
