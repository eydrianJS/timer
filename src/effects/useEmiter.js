import { useEffect, useState } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";

const useEmiter = props => {
  const [time, setTime] = useState();
  const [startTime, setStartTime] = useState(new Date().getTime());
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then(({ data }) => setStartTime(new Date(data[0].startTime).getTime()));
  }, []);

  useEffect(() => {
    props.socket.on("openDialog", newState => {
      dispatch({
        type: "OPEN_DIALOG",
        openDialog: newState.openDialog
      });
      if (newState.startTime) {
        setStartTime(new Date(newState.startTime).getTime());
      }
    });
  }, [dispatch, props.socket]);

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

  return { time };
};

export default useEmiter;
