import React from "react";

import Navbar from "common/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-40 flex h-full w-full items-center justify-center text-6xl font-bold text-indigo-600 ">
        Welcome to <br />
        Scribble
      </div>
    </>
  );
}

export default Home;
