import { Button } from '@/components/ui/button';
import { useJobDelete } from '@/hooks/mutation/use-job-delete';

interface DeleteButtonProps {
  jobId: string;
  onSuccess: () => void;
}
export const DeleteButton: React.FC<DeleteButtonProps> = ({
  jobId,
  onSuccess,
}) => {
  const { mutate: deleteJob, isPending: isDeleting } = useJobDelete();

  const handleDeleteJob = (id: string) => {
    deleteJob(id, {
      onSuccess,
    });
  };
  return (
    <Button
      size="sm"
      variant="destructive"
      loading={isDeleting}
      onClick={() => {
        handleDeleteJob(jobId);
      }}
    >
      Delete
    </Button>
  );
};
