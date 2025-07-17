'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { FormJobCreate } from '@/components/form-job-create';
import { useGetJobDetail } from '@/hooks/query/use-get-job-detail';

export default function EditJobPage({ params }: { params: { id: string } }) {
  const { data: job, isLoading } = useGetJobDetail(params.id);

  return (
    <>
      <main className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Job</h1>
        </div>
        <Card className="shadow-sm">
          {isLoading && (
            <CardContent className="p-6">
              <div className="flex justify-center items-center h-full">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </CardContent>
          )}
          <CardContent className="p-6">
            {!isLoading && <FormJobCreate initialValues={job || undefined} />}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
