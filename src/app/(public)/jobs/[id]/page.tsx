import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import { jobs } from '@/constants/mock-data-jobs';

export default function JobDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const job = jobs.find((j) => j.id == id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to jobs
          </Link>
        </div>

        <div className="bg-white rounded-lg border p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-lg text-muted-foreground">{job.company}</p>
            </div>
            <Button size="lg" className="sm:ml-4">
              Apply Now
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Location</p>
              <p className="text-sm text-muted-foreground">{job.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Job Type</p>
              <p className="text-sm text-muted-foreground">{job.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Posted</p>
              <p className="text-sm text-muted-foreground">{job.posted}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Job Description
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="mb-4">{job.fullDescription}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Requirements
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Benefits
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <Button size="lg" className="w-full sm:w-auto">
              Apply for this position
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
