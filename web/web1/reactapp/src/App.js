import React, { Component } from "react";
import Cookies from "universal-cookie";

export default function App() {
  const cookies = new Cookies();
  cookies.set("flag2", "4rch_f", { path: "/" });

  return (
    <div className="App">
      <h1>Will you find the flags?</h1>
    </div>
  );
}
