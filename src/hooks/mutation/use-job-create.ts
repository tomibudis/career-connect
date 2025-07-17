import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

export type JobCreateInput = {
  title: string;
  company: string;
  type: string;
  location: string;
  description: string;
  user_id: string;
};

export function useJobCreate() {
  return useMutation({
    mutationFn: async (input: JobCreateInput) => {
      const supabase = createClient();
      const { title, company, type, location, description, user_id } = input;
      const { data, error } = await supabase
        .from('jobs')
        .insert([
          {
            title,
            company_name: company,
            job_type: type,
            location,
            description,
            user_id,
          },
        ])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });
}
