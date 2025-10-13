import AboutAccordion from "../components/AboutAccordion";
import NavbarComp from "../components/Navbar";
import RulesGrid from "../components/RulesGrid";
import CarouselComp from "../components/carousel";
import { Button } from "react-bootstrap";

function About() {
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
        <Button className="btn-custom">About Us</Button>
        <Button className="btn-custom">Our Rules</Button>
      </div>

      <AboutAccordion/>
      <RulesGrid />
    </>
  );
}

export default About;
