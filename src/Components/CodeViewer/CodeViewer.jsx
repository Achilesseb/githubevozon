import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Buffer } from "buffer";

const CodeViewer = () => {
  const state = useSelector((data) => data.repositories.fileCode);
  const [code, setCode] = useState(null);
  const getCode = async () => {
    const fetchData = await fetch(state.url);
    const code = await fetchData.json();
    const decoded = Buffer.from(code.content, "base64").toString("ascii");
    setCode(decoded);
  };
  useEffect(() => {
    getCode();
  }, []);
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {code}
    </SyntaxHighlighter>
  );
};
export default CodeViewer;
