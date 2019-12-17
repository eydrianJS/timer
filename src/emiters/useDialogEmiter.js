import { useEffect, useState } from "react";
import io from "socket.io-client";

import { useDispatch } from "react-redux";

const useDialogEmiter = () => {
  useEffect(() => {
    const dispatch = useDispatch();
    const socket = io.connect("http://localhost:8081");

    socket.on("chat message", msg => {
      dispatch({
        type: "OPEN_DIALOG"
      });
    });

    const openDialog = e => {
      socket.emit("chat message", {openDialog: true, agree: true});
    };

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useDialogEmiter;