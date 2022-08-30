import React, { useState } from "react";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Buffer } from "buffer";
import { javascript } from "react-syntax-highlighter/dist/esm/languages/prism";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import Button from "../ButtonComponent/ButtonComponent";
import * as Md from "react-icons/md";

const CodeViewer = () => {
  const fileContent = useSelector((data) => data.repositories.content);
  const [code, setCode] = useState(null);
  const [startingLaneNumber, setStartingLaneNumber] = useState(1);
  const [linesToHighlight, setLinesToHighlight] = useState([]);
  const getCode = async () => {
    const fetchData = await fetch(fileContent.url);
    const result = await fetchData.json();
    const decodedCode = Buffer.from(result.content, "base64").toString("ascii");
    setCode(decodedCode);
  };
  const undoSelections = () => setLinesToHighlight([]);
  useEffect(() => {
    getCode();
  }, []);
  SyntaxHighlighter.registerLanguage("javascript", javascript);
  return (
    <>
      <Button
        type="secondary"
        modifiers="w-auto  h-auto absolute right-2 top-[42%] align-middle  md:w-[20vw] md:text-[1rem] bg-inherit rounded-xl md:right-0 md:w-[5vw] "
        callback={undoSelections}
      >
        <Md.MdOutlineCancel size="30px" />
      </Button>
      <SyntaxHighlighter
        language="javascript"
        style={dracula}
        customStyle={{
          width: "100%",
          paddingTop: "40px",
          backgroundColor: "rgb(30 41 59)",
        }}
        wrapLines={true}
        showLineNumbers
        lineProps={(lineNumber) => {
          const style = { display: "block", width: "fit-content" };
          linesToHighlight.map((lineToHighlight) => {
            if (lineToHighlight === lineNumber)
              style.backgroundColor = "#9470db71";
          });
          return {
            style,
            onClick: () => {
              if (linesToHighlight.includes(lineNumber)) {
                console.log(lineNumber);
                let newLinesToHighLight = [];
                setLinesToHighlight(
                  newLinesToHighLight.concat(
                    linesToHighlight.slice(
                      0,
                      linesToHighlight.indexOf(lineNumber)
                    ),
                    linesToHighlight.slice(
                      linesToHighlight.indexOf(lineNumber) + 1
                    )
                  )
                );
              } else setLinesToHighlight([...linesToHighlight, lineNumber]);
            },
          };
        }}
        startingLineNumber={startingLaneNumber}
        className={"syntax-highlighter"}
      >
        {code}
      </SyntaxHighlighter>
    </>
  );
};
export default CodeViewer;
