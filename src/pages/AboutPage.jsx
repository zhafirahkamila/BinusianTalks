import { useRef } from "react";
import AboutAccordion from "../components/AboutAccordion";
import Footer from "../components/Footer";
import NavbarComp from "../components/Navbar";
import RulesGrid from "../components/RulesGrid";
import CarouselComp from "../components/CarouselComp";
import { Button } from "react-bootstrap";

const About = () => {
  const aboutRef = useRef(null);
  const rulesRef = useRef(null);

  return (
    <>
      <NavbarComp />
      <CarouselComp />
      
      <div className="d-flex justify-content-center align-items-center">
        <h3 className="text-center pb-5 w-25">
          We offer a safe, user-friendly, and efficient Forum App
        </h3>
      </div>

      <div className="btn d-flex justify-content-center align-items-center gap-4 pb-5">
        <Button className="btn-custom" onClick={() => aboutRef.current.scrollIntoView({ behavior: "smooth" })}>About Us</Button>
        <Button className="btn-custom" onClick={() => rulesRef.current.scrollIntoView({ behavior: "smooth" })}>Our Rules</Button>
      </div>

      <div ref={aboutRef}>
        <AboutAccordion/>
      </div>

      <div ref={rulesRef}>
        <RulesGrid />
      </div>
    
      <Footer />
    </>
  );
}

export default About;
