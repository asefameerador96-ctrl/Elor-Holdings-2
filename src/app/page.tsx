import { Hero } from "@/components/sections/hero";
import { Statement } from "@/components/sections/statement";
import { Districts } from "@/components/sections/districts";
import { Stewardship } from "@/components/sections/stewardship";
import { Services } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Statement />
        <Districts />
        <Stewardship />
        <Services />
      </main>
      <Contact />
    </>
  );
}
