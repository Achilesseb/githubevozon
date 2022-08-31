import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { calcPercent, colors, getDataForNesting, lines } from "../../../utils";

const LanguageUsed = () => {
  const dispatch = useDispatch();
  const { login, repositoryName } = useParams();
  const languages = useSelector((data) => data.repositories.fileCode);
  const languagesUsed = Object.entries(languages);
  const [counter, setCounter] = useState(0);
  const [count, setCount] = useState(false);

  useEffect(() => {
    getDataForNesting(
      dispatch,
      `https://api.github.com/repos/${login}/${repositoryName}/languages`
    );
  }, []);

  setTimeout(() => {
    setCount(true);
  }, 1000);

  useEffect(() => {
    let interval;
    if (count) {
      interval = setInterval(() => {
        if (counter < 100) {
          setCounter(counter + 1);
        } else {
          clearInterval(interval);
        }
      }, 20);
    } else {
    }

    return () => clearInterval(interval);
  }, [counter, count]);

  calcPercent(languagesUsed);
  return (
    <div className="flex flex-wrap justify-center w-full h-full md:mb-8">
      {Object.entries(languages).map((language, index) => (
        <div
          key={index}
          className="text-black relative flex items-center justify-center w-[180px] h-[180px] rounded-full"
        >
          {!count ? (
            <div className="flex justify-center w-full">
              <DotLoader color="#F9A03C" />
            </div>
          ) : (
            <div
              className={`flex flex-col relative flex items-center justify-center w-[calc(100%-50px)] h-[calc(100%-50px)] ${
                colors[language[0]]?.background
              } rounded-full shadow-[0_0_5px_3px] ${
                colors[language[0]]?.shadow
              } before:absolute before:rounded-full before:w-[calc(100%+28px)] before:h-[calc(100%+28px)] before:border-[1px] before:border-gray-700`}
            >
              <p className="">
                <span className="text-[35px] font-semibold">
                  {lines[language[0]].percent < counter
                    ? lines[language[0]].percent
                    : counter}
                </span>
                <span className="text-[20px]">%</span>
              </p>
              <p>{language[0]}</p>
            </div>
          )}
          <svg className="absolute w-full h-full fill-[none] rotate-[-90deg]">
            <defs>
              <linearGradient id="gradientStyle">
                <stop offset="0%" stopColor="#565656" />
                <stop offset="100%" stopColor="#b7b5b5" />
              </linearGradient>
            </defs>
            <circle
              cx="90"
              cy="90"
              r="80"
              style={{
                strokeDasharray: 502,
                strokeDashoffset:
                  lines[language[0]]?.percent > counter
                    ? 502 - (counter / 100) * 502
                    : 502 - (lines[language[0]]?.percent / 100) * 502,
              }}
              className={`${colors[language[0]]?.color} stroke-[5px]`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default LanguageUsed;
