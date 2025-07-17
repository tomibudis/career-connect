import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useGetJobDetail } from '@/hooks/query/use-get-job-detail';

interface DetailJobDialogProps {
  id: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
export const DetailJobDialog: React.FC<DetailJobDialogProps> = ({
  id,
  isOpen,
  onOpenChange,
}) => {
  const { data: job, isLoading, isError } = useGetJobDetail(id || undefined);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-y-auto">
        {isLoading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : isError ? (
          <div className="p-8 text-center text-destructive">
            Failed to load job details.
          </div>
        ) : !job ? (
          <div className="p-8 text-center">No job found.</div>
        ) : (
          <div className="bg-white rounded-lg border p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                  {job.title}
                </h1>
                <p className="text-base text-muted-foreground">
                  {job.company_name}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs font-medium text-gray-900 mb-1">
                  Location
                </p>
                <p className="text-xs text-muted-foreground">{job.location}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900 mb-1">
                  Job Type
                </p>
                <p className="text-xs text-muted-foreground">{job.job_type}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900 mb-1">Posted</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(job.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Job Description
                </h2>
                <div className="prose prose-sm max-w-none text-muted-foreground ProseMirror">
                  <div dangerouslySetInnerHTML={{ __html: job.description }} />
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t">
              <Button
                className="w-full sm:w-auto"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
