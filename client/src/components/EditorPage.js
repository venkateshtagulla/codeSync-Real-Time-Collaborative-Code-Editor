import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "../Socket";
import { ACTIONS } from "../Actions";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

// List of supported languages
const LANGUAGES = [
  "python3",
  "java",
  "cpp",
  "nodejs",
  "c",
  "ruby",
  "go",
  "scala",
  "bash",
  "sql",
  "pascal",
  "csharp",
  "php",
  "swift",
  "rust",
  "r",
];

function EditorPage() {
  const [clients, setClients] = useState([]);
  const [output, setOutput] = useState("");
  const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python3");
  const codeRef = useRef(null);
  const [theme, setTheme] = useState("eclipse");
  const Location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const socketRef = useRef(null);
  const toggleTheme = () => {
  setTheme((prevTheme) => (prevTheme === "eclipse" ? "monokai" : "eclipse"));
  };


  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log("Error", err);
        toast.error("Socket connection failed, Try again later");
        navigate("/");
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: Location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== Location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          /*socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });*/
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current || "", // Ensure default empty string
            socketId,
          });
          
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    return () => {
      socketRef.current && socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  if (!Location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID is copied`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the room ID");
    }
  };

  const leaveRoom = async () => {
    navigate("/");
  };

  const runCode = async () => {
    setIsCompiling(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/compile`, {
        code: codeRef.current,
        language: selectedLanguage,
      });
      /*const runCode = async () => {
        if (!codeRef.current) {
          toast.error("No code available to run!");
          return;
        }
        setIsCompiling(true);
        try {
          const response = await axios.post("http://localhost:5000/compile", {
            code: codeRef.current || "", // Ensure it has a valid string
            language: selectedLanguage,
          });*/
           
      console.log("Backend response:", response.data);
      setOutput(response.data.output || JSON.stringify(response.data));
    } catch (error) {
      console.error("Error compiling code:", error);
      setOutput(error.response?.data?.error || "An error occurred");
    } finally {
      setIsCompiling(false);
    }
  };

  const toggleCompileWindow = () => {
    setIsCompileWindowOpen(!isCompileWindowOpen);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <div className="row flex-grow-1">
        {/* Client panel */}
        <div className="col-md-2 bg-black text-light d-flex flex-column" >
          <img
            src="\images\code sync_files\csync.png"
            alt="Logo"
            className=" bg-dark img-fluid mx-auto"
            style={{ maxWidth: "150px", marginTop: "-43px" ,}}
          />
          <hr style={{ marginTop: "-3rem" }} />

          {/* Client list container */}
          <div className="d-flex flex-column flex-grow-1 overflow-auto">
            <span className="mb-2 bg-info fs-4 fw-semibold">🤝 LIVE Collaborators</span>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>

          <hr />
          {/* Buttons */}
          <div className="mt-auto mb-3">
            <button className="btn btn-success w-100 mb-2" onClick={copyRoomId}>
              🔗 Copy Invite Link
            </button>
            <button className="btn btn-warning w-100" onClick={leaveRoom}>
              🛑 Quit Session
            </button>
          </div>
        </div>

        {/* Editor panel */}
        <div className="col-md-10 text-light d-flex flex-column fs-2 fw-semibold">
          {/* Language selector */}

          <div className="bg-dark p-2 d-flex justify-content-between align-items-center ">
            <button
            className="btn btn-outline-danger ms-2"
             onClick={toggleTheme}
          >
           Theme: {theme === "eclipse" ? "Light" : "Dark"}
          </button>
           <div><i class="bi bi-code-slash"></i> 💻 Execute Code</div>
            <select
              className="btn btn-outline-primary form-select w-auto "
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
            theme={theme}
          />
        </div>
      </div>

      {/* Compiler toggle button */}
      <button
        className="btn btn-primary position-fixed bottom-0 end-0 m-3"
        onClick={toggleCompileWindow}
        style={{ zIndex: 1050 }}
      >
        {isCompileWindowOpen ? "Close Compiler" : "Open Compiler"}
      </button>

      {/* Compiler section */}
      <div
        className={`bg-dark text-light p-3 ${
          isCompileWindowOpen ? "d-block" : "d-none"
        }`}
        style={{
          position: "fixed",
          bottom: 0,
          left: 350,
          right: 0,
          height: isCompileWindowOpen ? "30vh" : "0",
          transition: "height 0.3s ease-in-out",
          overflowY: "auto",
          zIndex: 1040,
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Compiler Output ({selectedLanguage})</h5>
          <div>
            <button
              className="btn btn-success me-2"
              onClick={runCode}
              disabled={isCompiling}
            >
              {isCompiling ? "⚙ Compiling..." : "Run Code"}
            </button>
            <button className="btn btn-secondary" onClick={toggleCompileWindow}>
              Close
            </button>
          </div>
        </div>
        <pre className="fs-5 fw-bold text-light bg-dark p-3 rounded">
          {output || "Output will appear here after compilation"}
        </pre>
      </div>
    </div>
  );
}

export default EditorPage;
