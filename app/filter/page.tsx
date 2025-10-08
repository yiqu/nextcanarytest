import { Suspense } from "react";
import FilterList from "./_components/FilterList";
import FooterText from "@/components/sidenav-footer/FooterText";

export default function FilterPage({
  params,
  searchParams,
}: PageProps<"/filter">) {
  return (
    <div>
      Params
      <Suspense fallback={<div>Loading...</div>}>
        <FilterList searchParams={searchParams}>
          <div>
            <div className='mt-20'>
              <Suspense fallback={<div>CACHED Loading...</div>}>
                Cached: <FooterText />
              </Suspense>
            </div>
          </div>
        </FilterList>
      </Suspense>
    </div>
  );
}
