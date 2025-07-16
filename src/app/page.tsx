'use client';

import { JobCard } from '@/components/job-card';
import { JobFilters } from '@/components/job-filters';
import { jobs } from '@/constants/mock-data-jobs';
import Link from 'next/link';

export default function Home() {
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
          {jobs.map((job) => (
            <Link href={`/jobs/${job.id}`} key={job.id}>
              <JobCard key={job.id} id={job.id}>
                <JobCard.Row>
                  <JobCard.Header>
                    <JobCard.Title>{job.title}</JobCard.Title>
                    <JobCard.Company>{job.company}</JobCard.Company>
                  </JobCard.Header>
                  <JobCard.Type>{job.type}</JobCard.Type>
                </JobCard.Row>
                <JobCard.Description>{job.description}</JobCard.Description>
                <JobCard.Footer>
                  <JobCard.Location>{job.location}</JobCard.Location>
                  <JobCard.Posted>{job.posted}</JobCard.Posted>
                </JobCard.Footer>
              </JobCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
