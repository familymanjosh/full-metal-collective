"use client";

import React from 'react';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';

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
        <a href="/contact" className="text-2xl font-bold mx-4">Get An Estimate!</a>

        <a href="#" className="fa mx-2" style={{ background: "#007bb5", fontSize: '27px' }}>
          <FontAwesomeIcon icon={faLinkedin} className="text-white" />
        </a>
        <a href="#" className="fa mx-2" style={{ background: "#125688", fontSize: '27px' }}>
          <FontAwesomeIcon icon={faInstagram} className="text-white" />
        </a>
        <a href="#" className="fa mx-2" style={{ background: "#dd4b39", fontSize: '27px' }}>
          <FontAwesomeIcon icon={faGoogle} className="text-white" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
