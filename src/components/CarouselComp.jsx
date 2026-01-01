import { useState } from "react";
import { Carousel } from "react-bootstrap";

const CarouselComp = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="custom-carousel m-5 pb-3 rounded-5">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="rounded-5 overflow-hidden"
      >
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/images/test.jpg" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/images/test.jpg" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/images/test.jpg" alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComp;
