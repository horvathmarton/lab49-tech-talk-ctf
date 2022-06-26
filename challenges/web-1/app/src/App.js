import React, { Component } from "react";
import Cookies from "universal-cookie";

export default function App() {
  const cookies = new Cookies();
  cookies.set("flag2", "4rch_f", { path: "/" });

  return (
    <div className="App">
      <h1 class="text-primary">Will you find the flags?</h1>
      <p>
        To complete your final quests
        <br />
        you must find all the flags
        <br />
        to seek them you must find
        <br />
        the hidden beauty on this site
        <br />
        <br />
        On your path you may need
        <br />
        some dessert that you not eat
        <br />
        take your time and have a rest
        <br />
        while the robots do the rest
        <br />
      </p>
    </div>
  );
}
