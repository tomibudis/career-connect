import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Job } from './use-get-jobs';

export function useGetJobDetail(id?: string) {
  return useQuery<Job | null>({
    queryKey: ['job-detail', id],
    queryFn: async () => {
      if (!id) return null;
      const supabase = createClient();
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Job;
    },
    enabled: !!id,
  });
}
