/*import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room Id is generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both the field is requried");
      return;
    }

    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("room is created");
  };

  // when enter then also join
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-2 mb-5 bg-secondary rounded">
            <div className="card-body text-center bg-dark">
              <img
                src="/images/codecast.png"
                alt="Logo"
                className="img-fluid mx-auto d-block"
                style={{ maxWidth: "150px" }}
              />
              <h4 className="card-title text-light mb-4">Enter the ROOM ID</h4>

              <div className="form-group">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="form-control mb-2"
                  placeholder="ROOM ID"
                  onKeyUp={handleInputEnter}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control mb-2"
                  placeholder="USERNAME"
                  onKeyUp={handleInputEnter}
                />
              </div>
              <button
                onClick={joinRoom}
                className="btn btn-success btn-lg btn-block"
              >
                JOIN
              </button>
              <p className="mt-3 text-light">
                Don't have a room ID? create{" "}
                <span
                  onClick={generateRoomId}
                  className=" text-success p-2"
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  New Room
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

*/



import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room ID generated!");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required.");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: { username },
    });
    toast.success("Room joined successfully!");
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") joinRoom();
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center  text-white px-5">
      <div className="card bg-black text-light shadow-lg rounded-4 p-4" style={{ maxWidth: "700px", width: "100%" }}>
        <div className="text-center mb-2">
          <img
            src="\images\code sync_files\csync.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "300px" }}
          />
          
        </div>

        <div className="mb-3">
          <label htmlFor="roomIdInput" className="form-label d-flex align-items-center gap-2 fs-3">
             <i className="bi bi-key-fill text-danger fs-2"></i>
             Room ID
          </label>

          <input
            type="text"
            className="form-control p-3 bg-light text-black border-secondary"
            id="roomIdInput"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleInputEnter}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="usernameInput" className="form-label d-flex align-items-center gap-2 fs-3">
             <i className="bi bi-person-circle text-primary fs-2"></i>
              User Name
          </label>
          <input
            type="text"
            className="form-control p-3 bg-light text-black border-secondary"
            id="usernameInput"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleInputEnter}
          />
        </div>
        <div class="d-flex justify-content-center">
        <button onClick={joinRoom} className="btn btn-success custom-hover w-40 text-center fs-4 mb-3">
          JOIN ROOM
        </button>
        </div>

        <p className="mt-4 text-center text-light fs-5">
          Looking to create a new room ?{" "}
          <span
            onClick={generateRoomId}
            className="btn btn-outline-dark ms-3 text-primary fw-bold"
            style={{ cursor: "pointer" }}
          >
            Generate RoomId
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
