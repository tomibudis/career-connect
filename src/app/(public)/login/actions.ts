'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

interface FormData {
  email: string;
  password: string;
}
export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return { error };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
