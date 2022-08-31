import React from "react";

export default function Button({ children, type, modifiers, callback }) {
  const defaultButton =
    "px-2 py-2 rounded-full font-bold w-30 h-10 transition ease-in-out delay-150 hover:scale-110  duration-1000 ";
  const types = {
    primary: "bg-orange-primary text-white",
    secondary: "bg-white text-orange-primary",
    default: "bg-white text-black",
  };
  return (
    <button
      className={`${defaultButton} ${types[type]} ${modifiers}`}
      onClick={() => callback(children)}
    >
      {children}
    </button>
  );
}
