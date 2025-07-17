import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

interface UpdateJobInput {
  id: string;
  title: string;
  company_name: string;
  job_type: string;
  location: string;
  description: string;
}

export function useJobUpdate() {
  return useMutation({
    mutationFn: async ({ id, ...fields }: UpdateJobInput) => {
      const supabase = createClient();
      const { error, data } = await supabase
        .from('jobs')
        .update(fields)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });
}
