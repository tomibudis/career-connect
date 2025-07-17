import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

export function useJobDelete() {
  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      const { error } = await supabase.from('jobs').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
  });
}
