'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

interface SignUpData {
  email: string;
  password: string;
  phone?: string;
  options: {
    data: {
      full_name: string;
    };
  };
}
export async function signup(signUpData: SignUpData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(signUpData);

  if (error) {
    return { error };
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}
