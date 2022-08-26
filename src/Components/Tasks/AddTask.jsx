import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { getUserData } from "./Actions";

const AddTask = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [userData, setuserData] = useState([]);
  // setuserData(state.data);
  // console.log("state", state.data);
  const [taskData, setTaskData] = useState();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const handleAddTask = (e) => {
    const { name, value, valueAsNumber } = e.target;
    if (valueAsNumber) {
      setTaskData({ ...taskData, deadline: valueAsNumber });
    } else {
      setTaskData({ ...taskData, [name]: value });
    }
  };

  const handleSubmitTask = async () => {
    console.log(taskData);
    try {
      await axios
        .post("http://localhost:8080/usertasks", taskData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          getUserData(dispatch, token);
          // dispatch({ type: "loadUserData", payload: data.data.jobs });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData(dispatch, token);
  }, []);

  return (
    <div>
      <div>
        <h2>Name: {name}</h2>
      </div>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="name" onChange={handleAddTask} />
        <input type="date" onChange={handleAddTask} />
        <button onClick={() => handleSubmitTask()}>Add Task</button>
      </form>
      <div></div>
    </div>
  );
};

export default AddTask;