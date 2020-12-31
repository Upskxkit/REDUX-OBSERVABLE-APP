import React from "react";

export default function Toolbar({ title, text }) {
  return (
    <>
      <h1>{title}</h1>
      <p>{text}</p>
    </>
  );
}
