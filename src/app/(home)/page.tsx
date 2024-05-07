import Image from "next/image";
import SectionHero from '../../components/SectionHero';
import Advantages from "@/components/Advantages";
import Courses from "@/components/Courses";
import Footer from "@/components/Footer";

export default async function Home() {
  return (
    <div>
      <SectionHero/>
      <Advantages/>
      <Courses/>
      <Footer/>
    </div>
  );
}
