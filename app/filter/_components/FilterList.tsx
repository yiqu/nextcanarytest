'use client';


import FooterText from '@/components/sidenav-footer/FooterText';
import { ReactNode, use } from 'react';

interface Props {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
  children: ReactNode;
}

export default function FilterList({searchParams, children}: Props) {
  const params = use(searchParams);
  console.log(params);
  const nameParam = params.name;

  return (
    <div>
      Name param: {nameParam}

      {children}
    </div>
  )

}