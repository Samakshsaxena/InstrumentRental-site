import HeroSection from "@/components/HeroSection";
import Popular_Instruments_Section from "@/components/Popular_Instruments_Section";
import User_review from "@/components/User_review";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Featured_musicians from "@/components/Featured_musicians";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-black antialiased">
      {/* <h1 className="text-2xl text-center">this is testing</h1> */}
      <HeroSection />
      <Popular_Instruments_Section />
      <User_review />
      <Featured_musicians />
      <Footer />
    </main>


  );
}
