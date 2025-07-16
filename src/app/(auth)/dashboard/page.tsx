import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    type: 'Full-Time',
    location: 'San Francisco, CA',
    posted: '2 days ago',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Design Studio',
    type: 'Full-Time',
    location: 'New York, NY',
    posted: '1 week ago',
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    type: 'Full-Time',
    location: 'Remote',
    posted: '3 days ago',
  },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

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
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/60">
                  <TableHead className="py-4 px-6">Title</TableHead>
                  <TableHead className="py-4 px-6">Company</TableHead>
                  <TableHead className="py-4 px-6">Type</TableHead>
                  <TableHead className="py-4 px-6">Location</TableHead>
                  <TableHead className="py-4 px-6">Posted</TableHead>
                  <TableHead className="py-4 px-6 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockJobs.map((job, i) => (
                  <TableRow
                    key={job.id}
                    className={
                      i % 2 === 1
                        ? 'bg-muted/40 hover:bg-primary/5 transition-colors'
                        : 'hover:bg-primary/5 transition-colors'
                    }
                  >
                    <TableCell className="py-4 px-6 font-medium">
                      {job.title}
                    </TableCell>
                    <TableCell className="py-4 px-6">{job.company}</TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                        {job.type}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6">{job.location}</TableCell>
                    <TableCell className="py-4 px-6">{job.posted}</TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
