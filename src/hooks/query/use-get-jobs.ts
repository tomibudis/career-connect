import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

// Define your Job type (adjust fields as needed)
type Job = {
  id: string;
  user_id: string;
  title: string;
  company_name: string;
  description: string;
  location: string;
  job_type: 'Full-Time' | 'Part-Time' | 'Contract';
  created_at: string; // ISO string
  updated_at: string; // ISO string
};

interface UseGetJobsResult {
  jobs: Job[];
  total: number;
}

interface UseGetJobsOptions {
  page?: number;
  pageSize?: number;
  location?: string;
  jobType?: string;
}

export type { Job };
export function useGetJobs({
  page = 1,
  pageSize = 10,
  location,
  jobType,
}: UseGetJobsOptions = {}) {
  return useQuery<UseGetJobsResult>({
    queryKey: ['jobs', page, pageSize, location, jobType],
    queryFn: async () => {
      const supabase = createClient();
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      let query = supabase
        .from('jobs')
        .select('*', { count: 'exact' })
        .order('id', { ascending: true });
      if (location) {
        query = query.eq('location', location);
      }
      if (jobType) {
        query = query.eq('job_type', jobType);
      }
      const { data, error, count } = await query.range(from, to);
      if (error) throw error;
      return { jobs: (data as Job[]) || [], total: count || 0 };
    },
    enabled: true,
  });
}
