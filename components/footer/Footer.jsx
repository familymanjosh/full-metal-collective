"use client";

import React from 'react';
import Link from 'next/link'
import {UserButton} from '@clerk/clerk-react';

const Footer = () => {
  return (
    <div className="text-center mt-4">
      <div className="flex justify-center mt-4">      
        <h1 className="text-2xl font-bold">Full Metal Collective</h1>
        <h1 className="text-2xl font-bold mx-4">|</h1>
        <h1 className="text-2xl font-bold">2021</h1>
        <h1 className="text-2xl font-bold mx-4">|</h1>
        <h1 className="text-2xl font-bold">All Rights Reserved</h1>
        <h1 className="text-2xl font-bold mx-4">|</h1>
        <UserButton afterSignOutUrl="/"/>
      </div>
    </div>
  );
};

export default Footer;
