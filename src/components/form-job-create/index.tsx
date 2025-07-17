'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { JOB_TYPE_OPTIONS } from '@/constants/job-type-options';
import { useJobCreate } from '@/hooks/mutation/use-job-create';
import { useUser } from '@/context/user-provider';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const TiptapEditor = dynamic(() => import('../ui/tiptap-editor'), {
  ssr: false, // tiptap relies on `window` object
});
const jobSchema = z.object({
  title: z.string().min(2, { message: 'Title is required' }),
  company: z.string().min(2, { message: 'Company is required' }),
  type: z.enum(['Full-Time', 'Part-Time', 'Contract', 'Internship'], {
    message: 'Type is required',
  }),
  location: z.string().min(2, { message: 'Location is required' }),
  description: z.string().min(10, { message: 'Description is required' }),
});

type JobFormValues = z.infer<typeof jobSchema>;

export function FormJobCreate() {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      company: '',
      type: undefined,
      location: '',
      description: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const { user } = useUser();
  const jobCreate = useJobCreate();
  const router = useRouter();

  const handleSubmit = async (values: JobFormValues) => {
    if (!user) {
      toast.error('You must be logged in to post a job.');
      return;
    }
    try {
      await jobCreate.mutateAsync({
        title: values.title,
        company: values.company,
        type: values.type,
        location: values.location,
        description: values.description,
        user_id: user.id,
      });
      toast.success('Job posted successfully!');
      router.push('/dashboard');
    } catch (error) {
      // @ts-expect-error error is not typed
      toast.error(error?.['message'] || 'Failed to post job.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Frontend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="e.g. TechCorp Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  name={field.name}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Remote or City, Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <TiptapEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Describe the job role and requirements..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full mt-4"
          loading={form.formState.isSubmitting || jobCreate.isPending}
        >
          Post Job
        </Button>
      </form>
    </Form>
  );
}
