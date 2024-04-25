import Image from "next/image";
import SectionHero from '../components/SectionHero';
import Advantages from "@/components/Advantages";

export default async function Home() {
  return (
    <div>
      <SectionHero/>
      <Advantages/>
    </div>
  );
}
