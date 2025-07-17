import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

export function useGetUserData() {
  return useQuery({
    queryKey: ['user-data'],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user ?? null;
    },
    enabled: true,
  });
}
