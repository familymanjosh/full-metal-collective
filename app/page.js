"use client"
import React from "react";
import { UserButton } from "@clerk/nextjs";

const Page = () => {

  return (
    <div className="bg-background">
      <h1 className="text-3xl font-bold text-center mt-8">Home</h1>
      <div className="flex justify-center mt-8">
        <UserButton afterSignOutUrl="/"/>
      </div>
    </div>
  );
};

export default Page;