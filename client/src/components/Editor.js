import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../Actions";
import "codemirror/theme/eclipse.css";
import 'codemirror/theme/monokai.css'



import "./codemirror.css"

function Editor({ socketRef, roomId, onCodeChange,theme }) {
  const editorRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: 'theme',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      // for sync the code
      editorRef.current = editor;

      editor.setSize(null, "100%");
      editorRef.current.on("change", (instance, changes) => {
        // console.log("changes", instance ,  changes );
        const { origin } = changes;
        const code = instance.getValue(); // code has value which we write
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    init();
  }, []);

  // data receive from server
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);
  /*useEffect(() => {
    if (!socketRef.current) return;
  
    const handleCodeChange = ({ code }) => {
      if (code !== null) {
        editorRef.current.setValue(code);
      }
    };
  
    socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);
  
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
    };
  }, []);*/
  useEffect(() => {
  if (editorRef.current) {
    editorRef.current.setOption("theme", theme);
  }
  }, [theme]);

  

  return (
    <div style={{ height: "600px" }}>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
}

export default Editor;
