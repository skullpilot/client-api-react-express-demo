import { Button, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UserPage(props) {
  //console.log(props.location.state.userId);
  // console.log(window.location.href);
  // console.log(getLocation(window.location.href).search);

  useEffect(() => {
    axios.get("http://localhost:9000/getUsers").then((res) => {
      //console.log(res.data.users);
      let array = res.data.users;
      for (let i = 0; i < array.length; i++) {
        if (props.location.state.userId === array[i].id) {
          //console.log(object[i]);
          setId(array[i].id);
          setFirstName(array[i].firstName);
          setLastName(array[i].lastName);
          setEmailAdd(array[i].emailAdd);
        }
      }
    });
  }, []);

  const [id, setId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [emailAdd, setEmailAdd] = useState();

  function updateData() {
    //console.log("submitting");
    axios
      .post("http://localhost:9000/update", {
        id,
        firstName,
        lastName,
        emailAdd,
      })
      .then
      //console.log("data submitted")
      ();
  }

  function deleteData() {
    axios.post("http://localhost:9000/delete", { id }).then();
  }

  return (
    <div className="flex flex-row justify-center">
      <div className="w-64 flex flex-col items-center">
        <div className="m-2">
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="m-2">
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="m-2">
          <Input
            value={emailAdd}
            onChange={(e) => setEmailAdd(e.target.value)}
          />
        </div>
        <div>
          <Button
            type="primary"
            className="m-2"
            onClick={() => updateData()}
            href="/"
          >
            Submit
          </Button>
          <Button
            type="primary"
            danger
            className="primary m-2"
            onClick={() => deleteData()}
            href="/"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
