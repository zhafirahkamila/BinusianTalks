import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

const AboutAccordion = () => {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://binusiantalks-api-production.up.railway.app/api/about")
      .then((res) => res.json())
      .then((data) => {
        setAbout(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching about data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading about data...</p>;
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <h3 className="text-center pt-4 w-25">About Us</h3>
      </div>
      <div className="container-custom">
        <Accordion defaultActiveKey={[]} alwaysOpen>
          {about.map((item, idx) => (
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