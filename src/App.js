import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import images from "./images.png";
import "./style.css";
import io from "socket.io-client";
import AlertDialog from "./components/AlertDialog";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const publicIp = require("public-ip");

const socket = io.connect("http://localhost:8081");

function App() {
  const [time, setTime] = useState();
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [chat, setChat] = useState({ id: "sadsad", msg: "sadsa" });
  const counter = useSelector(state => state);
  const dispatch = useDispatch();

  const updateStartDate = e => {
    (async () => {
      console.log(await publicIp.v4());
      console.log(await publicIp.v6());
    })();
    axios.put("http://localhost:8081").then(({ status }) => {
      if (status === 200) {
        axios
          .get("http://localhost:8081")
          .then(({ data }) =>
            setStartTime(new Date(data[0].startTime).getTime())
          );
      }
    });
  };
  const updateSocket = e => {
    socket.emit("chat message", "Raz dwa trzy");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then(({ data }) => setStartTime(new Date(data[0].startTime).getTime()));
  }, []);

  useEffect(() => {
    socket.on("chat message", msg => {
      console.log(msg);
      // Add new messages to existing messages in "chat"
      dispatch({
        type: "OPEN_DIALOG"
      });
      setChat(msg);
    });
  }, []);

  useEffect(() => {
    function time(ms) {
      var days = Math.floor(ms / 86400000);
      return (
        days +
        `${days === 1 ? " dzień " : " dni "}` +
        new Date(ms)
          .toISOString()
          .slice(11, -5)
          .replace("T", " dni ") +
        " godzin"
      );
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
    <div className="App async-status-wrapper">
      {counter.dialog ? <AlertDialog socket={socket}/> : false}
      <Card>
        <Card.Body>
          <Card.Title>Czas od znalezienia ostatniego buga</Card.Title>
          <h1 style={{ color: "green" }}>{time}</h1>
          <h1>{chat.id + "" + chat.msg}</h1>
          <h1>{counter.num}</h1>
          <Button onClick={e => updateStartDate(e)}> I znowu jebło!! </Button>
          <Button onClick={e => updateSocket(e)}> !!! </Button>
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
