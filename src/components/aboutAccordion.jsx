import { Accordion } from "react-bootstrap";
import AboutData from "../data/aboutData";

const AboutAccordion = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <h3 className="text-center pt-4 w-25">About Us</h3>
      </div>
      <div className="container-custom">
        <Accordion defaultActiveKey={[]} alwaysOpen>
          {AboutData.map((item, idx) => (
            <Accordion.Item eventKey={idx.toString()} key={idx}>
              <Accordion.Header>
                <div>
                  {item.questionIndo}
                  <div className="eng-header">{item.questionEng}</div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <p>{item.answerIndo}</p>
                <p className="eng-body">{item.answerEng}</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default AboutAccordion;
