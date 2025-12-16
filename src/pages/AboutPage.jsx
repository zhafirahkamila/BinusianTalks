import AboutAccordion from "../components/AboutAccordion";
import Footer from "../components/Footer";
import NavbarComp from "../components/Navbar";
import RulesGrid from "../components/RulesGrid";
import CarouselComp from "../components/carousel";
import { Button } from "react-bootstrap";

function About() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <NavbarComp showAuthButton={false}
      showProfile={true} />
      <CarouselComp />
      
      <div className="d-flex justify-content-center align-items-center">
        <h3 className="text-center pb-5 w-25">
          We offer a safe, user-friendly, and efficient Forum App
        </h3>
      </div>

      <div className="btn d-flex justify-content-center align-items-center gap-4 pb-5">
        <Button className="btn-custom" onClick={() => scrollToSection('about-section')}>
          About Us
        </Button>
        <Button className="btn-custom" onClick={() => scrollToSection('rules-section')}>
          Our Rules
        </Button>
      </div>

      <div id="about-section">
        <AboutAccordion />
      </div>
      
      <div id="rules-section">
        <RulesGrid />
      </div>
      
      <Footer />
    </>
  );
}

export default About;