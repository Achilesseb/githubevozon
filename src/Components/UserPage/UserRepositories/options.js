const divClassName =
  "flex items-center justify-evenly md:flex md:justify-evenly h-[8vh] w-full border-2 border-gray-600 bg-gray-200 p-2 after:bg-black";
const iconClassName =
  "block text-[1.2rem] md:text-3xl text-black md:w-[30%] cursor-pointer ";
const ulClassName =
  "py-2 bg-black text-white w-full flex flex-col h-auto gap-4 justify-center items-center transition-all ease-in duration-200";

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
