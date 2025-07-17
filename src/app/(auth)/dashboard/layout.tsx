'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { GalleryVerticalEnd } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/user-provider';
import { CareerConnectLogo } from '@/components/career-connect-logo';
import Link from 'next/link';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = () => {
    const supabase = createClient();
    supabase.auth.signOut();
    router.push('/login');
  };
  return (
    <div className="min-h-screen bg-muted">
      {/* Navbar */}
      <nav className="bg-background border-b">
        <div className="max-w-5xl w-full px-4 py-3 flex items-center justify-between mx-auto">
          <Link href="/">
            <CareerConnectLogo />
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground hidden sm:block">
              {user?.user_metadata?.full_name}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(user?.user_metadata?.full_name || '')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-semibold">
                    {user?.user_metadata?.full_name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user?.user_metadata?.email}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
