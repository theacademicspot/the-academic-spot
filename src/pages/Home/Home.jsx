import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Stats from "../../components/stats/stats";

import Features from "../../components/Features/Features";
import Colleges from "../../components/colleges/colleges";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
import WhatsAppButton from "../../components/whatsAppButton/whatsAppButton";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Colleges />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Home;