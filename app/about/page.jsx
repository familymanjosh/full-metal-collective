import React from 'react';

const About = () => {
  return (
    <div
      className="bg-cover bg-center py-10 px-6 sm:py-16 sm:px-12 lg:py-20 lg:px-24 xl:py-24 xl:px-32"
      style={{ backgroundImage: 'url(../../Images/background.jpeg)' }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
          About Us
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          At Full Metal Collective, we specialize in providing high-end welding and fabrication services to meet the diverse needs of our customers. With over a decade of experience in the industry, we have successfully worked on a wide range of projects, including custom furniture, functional art pieces, and critical infrastructure welding for the energy sector.
        </p>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Our team of skilled welders is dedicated to helping you bring your vision to life. Whether you have a passion project that you have been dreaming of or a specific requirement, we are committed to delivering exceptional results within your desired timelines. With a Certified Welding Inspector (CWI) on board, we ensure that all our projects meet and exceed industry standards.
        </p>
        <p className="text-lg sm:text-xl text-gray-700">
          As a small business, we take pride in our commitment to both our customers and our craft. We offer comprehensive welding and fabrication solutions, capable of handling projects of any size and complexity. Our mission is to provide reliable, professional, and top-notch services that cater to your specific needs. Contact us today, and let us help you with all your welding and fabrication requirements.
        </p>
      </div>
    </div>
  );
};

export default About;
