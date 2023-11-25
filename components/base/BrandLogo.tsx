import Image from "next/image";
import React from "react";

export default function BrandLogo() {
  return (
    <div>
      <Image src="/images/logo.png" alt="logo" width={120} height={120} className="hidden lg:block" />
      <Image src="/images/logo-sm.png" alt="logo" width={90} height={90} className="lg:hidden" />
    </div>
  );
}
