import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Interests } from "@/components/Interests";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Interests />
      <Contact />
    </>
  );
}
