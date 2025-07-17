'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { useGetJobs } from '@/hooks/query/use-get-jobs';
import { useQueryParam } from '@/hooks/update-query-params';
import { PaginationTableJob } from './pagination';
import { DetailJobDialog } from './detail-job-dialog';
import { useState } from 'react';
import Link from 'next/link';
import { DeleteButton } from './delete-button';

const LoaderTable = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-8">
        Loading jobs...
      </TableCell>
    </TableRow>
  );
};

const ErrorTable = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-8 text-destructive">
        Failed to load jobs.
      </TableCell>
    </TableRow>
  );
};

const NoFoundData = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-8">
        No jobs found.
      </TableCell>
    </TableRow>
  );
};

const PER_PAGE = 10;

export const TableJob = () => {
  const [currentPageParam, setCurrentPageParam] = useQueryParam<number>(
    'page',
    1,
  );
  const currentPage = Number(currentPageParam);
  const [jobDialogModal, setJobDialogModal] = useState<boolean>(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const {
    data: jobsData,
    isLoading,
    isError,
    refetch: refetchJobs,
  } = useGetJobs({
    page: currentPage,
    pageSize: PER_PAGE,
  });

  const jobs = jobsData?.jobs ?? [];
  const totalPages = Math.ceil((jobsData?.total ?? 0) / PER_PAGE);

  return (
    <>
      <DetailJobDialog
        id={selectedJobId}
        isOpen={jobDialogModal}
        onOpenChange={setJobDialogModal}
      />
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
                  <TableHead className="py-4 px-6 text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <LoaderTable />}
                {isError && <ErrorTable />}
                {jobs.length === 0 && <NoFoundData />}
                {jobs.map((job, i) => (
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
                    <TableCell className="py-4 px-6">
                      {job.company_name}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                        {job.job_type}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6">{job.location}</TableCell>
                    <TableCell className="py-4 px-6">
                      {new Date(job.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedJobId(job.id);
                            setJobDialogModal(true);
                          }}
                        >
                          View
                        </Button>
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={`/dashboard/edit/${job.id}`}>Edit</Link>
                        </Button>
                        <DeleteButton jobId={job.id} onSuccess={refetchJobs} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination Controls */}
          <div className="py-4 flex justify-center">
            <PaginationTableJob
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPageParam}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
