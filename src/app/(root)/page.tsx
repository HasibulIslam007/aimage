import { UserButton } from "@clerk/nextjs";
import React from "react";

const Home = () => (
  <div>
    <UserButton afterSignOutUrl="/" />
  </div>
);

export default Home;
