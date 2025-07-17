import { SignupForm } from '@/components/signup-form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import Link from 'next/link';
import { CareerConnectLogo } from '@/components/career-connect-logo';

export default function SignupPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="self-center">
          <CareerConnectLogo />
        </Link>
        <div className="flex flex-col gap-6">
          <Card className="py-6">
            <CardHeader>
              <CardTitle className="text-xl">Create an account</CardTitle>
              <CardDescription>
                Enter your email and password to create your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
