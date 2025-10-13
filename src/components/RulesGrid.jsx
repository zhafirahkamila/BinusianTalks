import RulesData from "../data/rulesData";
import { Card, Col, Row } from "react-bootstrap";

const RulesGrid = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <h3 className="text-center pt-4 w-25 mb-4 pb-5">Our Rules</h3>
      </div>
      <div className="container-custom">
        <Row xs={1} md={3} className="gy-6 gx-4">
          {RulesData.map((item, idx) => (
            <Col key={idx}>
              <Card className="h-100 rounded-5 card-custom">
                <div className="img-wrapper">
                  <img
                    src={item.img}
                    alt="image icon"
                    className="card-img-top custom-img"
                  />
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="card-title">{item.title}</Card.Title>
                  <Card.Text className="card-text">{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default RulesGrid;
