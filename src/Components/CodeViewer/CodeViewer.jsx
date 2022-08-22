import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Buffer } from "buffer";

const CodeViewer = () => {
  const fileContent = useSelector((data) => data.repositories.content);
  const [code, setCode] = useState(null);

  const getCode = async () => {
    const fetchData = await fetch(fileContent.url);
    const result = await fetchData.json();
    const decodedCode = Buffer.from(result.content, "base64").toString("ascii");
    setCode(decodedCode);
  };
  useEffect(() => {
    getCode();
  }, []);
  return (
    <SyntaxHighlighter
      language="javascript"
      style={dracula}
      customStyle={{ width: "100%" }}
    >
      {code}
    </SyntaxHighlighter>
  );
};
export default CodeViewer;
