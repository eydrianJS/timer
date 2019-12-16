import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import images from "./images.png";
import "./style.css";
const publicIp = require('public-ip');

function App() {
  const [time, setTime] = useState();
  const [startTime, setStartTime] = useState(new Date().getTime());

  const updateStartDate = (e) => {
    (async () => {
        console.log(await publicIp.v4());
        //=> '46.5.21.123'
    
        console.log(await publicIp.v6());
        //=> 'fe80::200:f8ff:fe21:67cf'
    })();
    axios.put("http://10.102.40.12:8080").then(({ status }) => {
      if (status === 200) {
        axios
          .get("http://10.102.40.12:8080")
          .then(({ data }) =>
            setStartTime(new Date(data[0].startTime).getTime())
          );
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://10.102.40.12:8080")
      .then(({ data }) => setStartTime(new Date(data[0].startTime).getTime()));
  }, []);

  useEffect(() => {
    function time(ms) {
      var days = Math.floor(ms/86400000);
      return days + `${days == 1? " dzień ": " dni "}` + new Date(ms).toISOString().slice(11, -5).replace("T", " dni ") + " godzin";
    }
    const interval = setInterval(() => {
      const getDiddTime = () => {
        return time(new Date().getTime() - startTime);
      };
      setTime(getDiddTime());
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  return (
    <div className="App" className="async-status-wrapper">
      {/* <Container style={{marginTop: "50px"}}>
        <Row>
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={4} style={{ textAlign: "center" }}> */}
      <Card>
        <Card.Body>
          <Card.Title>Czas od znalezienia ostatniego buga</Card.Title>
          <h1 style={{color: "green"}}>{time}</h1>
          <Button onClick={(e) => updateStartDate(e)}> I znowu jebło!! </Button>
        </Card.Body>
        <Card.Img variant="top" src={images} style={{width: "225px", height: "225px", marginLeft: "42.5%"}}/>
      </Card>
      {/* </Col>
          <Col xs={6} md={4}></Col>
        </Row>
      </Container> */}
    </div>
  );
}

export default App;
