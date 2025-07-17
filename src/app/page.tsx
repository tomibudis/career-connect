'use client';

import { JobCard } from '@/components/job-card';
import { JobFilters } from '@/components/job-filters';
// import { jobs } from '@/constants/mock-data-jobs';
import Link from 'next/link';
import { useGetJobs } from '@/hooks/query/use-get-jobs';
import { useQueryParam } from '@/hooks/update-query-params';
import { formatRelativeDate } from '@/lib/date';

export default function Home() {
  const [location] = useQueryParam<string>('location', 'all');
  const [jobType] = useQueryParam<string>('job_type', 'all');

  const locationQuery = location === 'all' ? undefined : location;
  const jobTypeQuery = jobType === 'all' ? undefined : jobType;
  const { data, isLoading, isError } = useGetJobs({
    location: locationQuery,
    jobType: jobTypeQuery,
  });
  const jobs = data?.jobs || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Browse Jobs
          </h1>
          <p className="text-muted-foreground">Find your next opportunity</p>
        </div>

        <JobFilters />

        <div className="space-y-4 flex flex-col">
          {isLoading ? (
            <div className="text-center py-8">Loading jobs...</div>
          ) : isError ? (
            <div className="text-center py-8 text-destructive">
              Failed to load jobs.
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8">No jobs found.</div>
          ) : (
            jobs.map((job) => (
              <Link href={`/jobs/${job.id}`} key={job.id}>
                <JobCard key={job.id} id={job.id}>
                  <JobCard.Row>
                    <JobCard.Header>
                      <JobCard.Title>{job.title}</JobCard.Title>
                      <JobCard.Company>{job.company_name}</JobCard.Company>
                    </JobCard.Header>
                    <JobCard.Type>{job.job_type}</JobCard.Type>
                  </JobCard.Row>
                  <JobCard.Description>{job.description}</JobCard.Description>
                  <JobCard.Footer>
                    <JobCard.Location>{job.location}</JobCard.Location>
                    <JobCard.Posted>
                      {formatRelativeDate(job.created_at)}
                    </JobCard.Posted>
                  </JobCard.Footer>
                </JobCard>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
