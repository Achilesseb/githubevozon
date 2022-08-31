const divClassName =
  "w-full flex justify-center items-center rounded-lg py-2 text-sm font-medium leading-5 text-blue-700 transition ease-in-out duration-300 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2";
const iconClassName = "block text-[1.2rem] md:text-3xl text-black w-[40%]";
const ulClassName = "w-[60%] flex justify-start";

export const options = [
  {
    name: "code",
    to: "files",
    divClassName: divClassName,
    iconClassName: iconClassName,
    ulClassName: ulClassName,
  },
  {
    name: "commits",
    to: "commits",
    divClassName: divClassName,
    iconClassName: iconClassName,
    ulClassName: ulClassName,
  },
  {
    name: "merges",
    to: "merges",
    divClassName: divClassName,
    iconClassName: iconClassName,
    ulClassName: ulClassName,
  },
];
