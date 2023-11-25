import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function MobileNav() {
  return (
    <div className="m-3 md:hidden">
      <div className="flex justify-between items-center border rounded-3xl space-x-4 px-3 py-1">
        <div className="flex items-center">
          <Search />
          <div className="flex flex-col ml-5">
            <span className="text-sm font-semibold">Anywhere</span>
            <span className="text-sm">Any week . Add guest</span>
          </div>
        </div>
        <SlidersHorizontal />
      </div>
    </div>
  );
}
