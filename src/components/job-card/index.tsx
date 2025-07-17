'use client';

import * as React from 'react';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

interface JobCardContextProps {
  id?: string;
  onCardClick?: (id?: string) => void;
}

const JobCardContext = React.createContext<JobCardContextProps>({});

interface JobCardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  onCardClick?: (id?: string) => void;
  href?: string;
  children: React.ReactNode;
}

function JobCard({
  id,
  onCardClick,
  href,
  children,
  ...props
}: JobCardRootProps) {
  const content = (
    <div
      className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onCardClick?.(id)}
      {...props}
    >
      <JobCardContext.Provider value={{ id, onCardClick }}>
        {children}
      </JobCardContext.Provider>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-gray-900 mb-1">{children}</h3>
  );
}

function Company({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground font-medium">{children}</p>;
}

function Type({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
      {children}
    </span>
  );
}

function Description({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm text-muted-foreground mb-4 line-clamp-2">
      <div
        className="ProseMirror"
        dangerouslySetInnerHTML={{ __html: children as string }}
      />
    </div>
  );
}

function Location({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center mb-2 sm:mb-0 capitalize">
      <MapPin className="w-4 h-4 mr-1" />
      {children}
    </div>
  );
}

function Posted({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center">
      <Clock className="w-4 h-4 mr-1" />
      {children}
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 sm:mb-0">{children}</div>;
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
      {children}
    </div>
  );
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
      {children}
    </div>
  );
}

JobCard.Title = Title;
JobCard.Company = Company;
JobCard.Type = Type;
JobCard.Description = Description;
JobCard.Location = Location;
JobCard.Posted = Posted;
JobCard.Header = Header;
JobCard.Row = Row;
JobCard.Footer = Footer;

export { JobCard };
