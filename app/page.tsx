import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import About from "../components/About/About";
import PriceList from "../components/PriceList/PriceList";
import BookingSteps from "../components/BookingSteps/BookingSteps";
import Gallery from "../components/Gallery/Gallery";
import Reviews from "../components/Reviews/Reviews";
import Team from "../components/Team/Team";
import BlogPreview from "../components/BlogPreview/BlogPreview";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <PriceList />
        <BookingSteps />
        <Gallery />
        <Reviews />
        <Team />
        <BlogPreview />
        <FAQ />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}