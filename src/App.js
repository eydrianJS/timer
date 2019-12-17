import React from "react";
import { Button, Card } from "react-bootstrap";
import images from "./images.png";
import "./style.css";
import AlertDialog from "./components/AlertDialog";
import { useSelector } from "react-redux";
import useEmiter from "./effects/useEmiter";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8081");

function App() {
  const dialog = useSelector(state => state);
  const { time } = useEmiter({socket});
  const updateSocket = e => {
    socket.emit("openDialog", { openDialog: true, agree: false });
  };

  return (
    <div className="App async-status-wrapper">
      {dialog ? <AlertDialog socket={socket} /> : false}
      <Card>
        <Card.Body>
          <Card.Title>Czas od znalezienia ostatniego buga</Card.Title>
          <h1 style={{ color: "green" }}>{time}</h1>
          <Button onClick={e => updateSocket(e)}> I znowu jebło!! </Button>
        </Card.Body>
        <Card.Img
          variant="top"
          src={images}
          style={{ width: "225px", height: "225px", marginLeft: "42.5%" }}
        />
      </Card>
    </div>
  );
}

export default App;
