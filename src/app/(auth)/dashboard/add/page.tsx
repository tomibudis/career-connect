import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FormJobCreate } from '@/components/form-job-create';

export default function PostJobPage() {
  return (
    <>
      <main className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Post a New Job</h1>
        </div>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <FormJobCreate />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
