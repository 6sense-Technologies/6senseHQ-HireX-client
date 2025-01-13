import React, { FC } from 'react';
import { SidebarTrigger } from './ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

type TopbreadcrumbProps = {
  initialData?: string;
  secondayData?: string;
  thirdData?: string;
  initalLink?: string;
  secondayLink?: string;
  thirdLink?: string;
};

const Topbreadcrumb: FC<TopbreadcrumbProps> = ({
  initialData,
  secondayData,
  thirdData,
  initalLink,
  secondayLink,
  thirdLink,
}: TopbreadcrumbProps) => {
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href={initalLink}>{initialData}</BreadcrumbLink>
            </BreadcrumbItem>
            {secondayData ? (
              <>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbLink href={secondayLink}>
                    {secondayData}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : null}
            {thirdData ? (
              <>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbLink href={thirdLink}>{thirdData}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : null}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Topbreadcrumb;
