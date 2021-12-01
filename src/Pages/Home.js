import React, { useEffect, useState } from "react";
import { Button, Input, Card } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAdd, setEmailAdd] = useState("");
  const [info, setInfo] = useState();

  function sendData() {
    let id = Date.now();
    axios
      .post("http://localhost:9000/add", { id, firstName, lastName, emailAdd })
      .then((res) => {
        //console.log(res.data.users);
        setInfo(res.data.users);
        setLastName("");
        setFirstName("");
        setEmailAdd("");
      });
  }

  useEffect(() => {
    axios.get("http://localhost:9000/getUsers").then((res) => {
      setInfo(res.data.users);
      console.log(res.data.users);
    });
  }, []);

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col">
        <h1>New User Information</h1>
        <div className="flex flex-col items-center">
          <div className="m-2">
            <Input
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="m-2">
            <Input
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="m-2">
            <Input
              value={emailAdd}
              placeholder="Email Address"
              onChange={(e) => setEmailAdd(e.target.value)}
            />
          </div>
          <div>
            <Button type="primary" onClick={sendData}>
              Submit
            </Button>
          </div>
          {/* {console.log(info)} */}
          {info
            ? info.map((personal) => (
                <div className="m-2">
                  <Card
                    key={personal.id}
                    title="User Info"
                    style={{ width: 300 }}
                  >
                    <p>{personal.firstName}</p>
                    <p>{personal.lastName}</p>
                    <p>{personal.emailAdd}</p>
                    <Link
                      to={{
                        pathname: `/UserPage/${personal.id}`,
                        state: { userId: personal.id },
                      }}
                    >
                      Modify
                    </Link>
                  </Card>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Home;

export function sendUserId(userId) {
  //console.log(userId);
  return userId;
}
