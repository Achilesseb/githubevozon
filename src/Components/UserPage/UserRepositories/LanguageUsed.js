import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { calcPercent, colors, getDataForNesting, lines } from "../../../utils";

const LanguageUsed = () => {
  const dispatch = useDispatch();
  const { login, repositoryName } = useParams();
  const languages = useSelector((data) => data.repositories.fileCode);
  const languagesUsed = Object.entries(languages);
  const [linesProba, setLinesProba] = useState({});

  useEffect(() => {
    getDataForNesting(
      dispatch,
      `https://api.github.com/repos/${login}/${repositoryName}/languages`
    );
  }, []);

  useEffect(() => {
    setLinesProba(lines);
    console.log(linesProba);
  }, []);

  calcPercent(languagesUsed);

  return (
    <div className="flex justify-center w-full h-auto">
      <div className="flex flex-col min-w-[94vw] bg-white md:my-[5%]">
        <div className="p-2 text-xl font-bold bg-gray-200">Languages</div>
        <div className="flex w-full h-full mt-4">
          <div className="flex flex-col gap-2 py-2 mb-2 ml-2">
            {Object.entries(languages).map((language, index) => (
              <div
                key={index}
                className="flex justify-center w-full text-sm md:text-base"
              >
                {language[0]}
              </div>
            ))}
          </div>

          <div className="flex flex-col w-full gap-2 py-2 pl-2 mx-2 mb-2 text-sm bg-gray-200 border-b-2 border-l-2 border-black md:text-base md:mx-6 ">
            {Object.entries(languages).map((language, index) => {
              console.log(colors[language[0]], language[0]);
              return (
                <div key={index} className="flex w-full h-full ">
                  <div
                    style={lines[language[0]].style}
                    className={`h-full ${
                      colors[language[0]] ? colors[language[0]] : `bg-Other`
                    }`}
                  ></div>
                  <div className="pl-4">{lines[language[0]].percent}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageUsed;
