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
  }, []);

  calcPercent(languagesUsed);

  return (
    <div className="flex justify-center w-full h-auto">
      <div className="flex flex-col min-w-[94vw] bg-white md:my-[5%]">
        <div className="p-2 font-bold text-xl bg-gray-200">Languages</div>
        <div className="w-full h-full mt-4 flex">
          <div className="ml-2 py-2 mb-2 flex flex-col gap-2">
            {Object.entries(languages).map((language, index) => (
              <div
                key={index}
                className="flex justify-center w-full text-sm md:text-base"
              >
                {language[0]}
              </div>
            ))}
          </div>

          <div className="text-sm md:text-base mx-2 md:mx-6 pl-2 py-2 mb-2 flex flex-col gap-2 w-full bg-gray-200 border-l-2 border-b-2 border-black ">
            {Object.entries(languages).map((language, index) => {
              return (
                <div key={index} className="w-full h-full flex ">
                  <div
                    style={lines[language[0]].style}
                    className={`h-full ${colors[language[0]]}`}
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
