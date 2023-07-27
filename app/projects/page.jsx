'use client'
import React, { useState } from 'react';
import LikeButton from '../../components/LikeButton';
import CommentSection from '../../components/CommentSection';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Gantry Hoist',
      description:
        'A customer came to us with a specific need for four gantry hoists for his manufacturing business. We needed to be able to safely lift 1 ton, come under a weight limit for each hoist and needed them to be broken down for transfer between customers locations. From design/fabrication to final assembly at the customers site we handled everything. The customer was very happy with the final.',
      likes: 0,
    },
    {
      id: 2,
      title: 'Propane Tank Enclosure',
      description:
        'A customer came to us needing to protect his propane tank that he needed to store outside behind his restaurant. He was nervous with it being located near a street that the tank could be backed into by cars. We came out to the site and took field measurements to build something custom. After fabrication we delivered the finished product to the site and installed. This propane tank isnt going anywhere.',
      likes: 0,
    },
    {
      id: 3,
      title: 'Facility Site Restoration',
      description:
        'A customer came to us needing a makeover on the loading dock for his site. There were multiple safety concerns as well as outdated and broken equipment that led to unnecessary downtime. We started by removing broken dock levelers and replacing them with new ones. We then added bumpers and built up a curb capable of taking a hit from a truck. We installed custom brackets that adjusted height and added an aluminum guardrail to keep people from falling. At the end of the day production was back up and running to optimal levels.',
      likes: 0,
    },
    {
      id: 4,
      title: 'Custom Bike Frames',
      description:
        'We cant take all the credit for this one. We partnered with renowned Santa Barbara Cruisers to weld all the custom frames and bike parts created by their owner Rex. No matter what came to the welding table we were able to help take pieces of metal and turn them into pieces of beauty. We worked on 4130 chromoly, stainless, aluminum, mild steel and even a titanium frame. During this multi year partnership we’ve created some real works of art.',
      likes: 0,
    },
    {
      id: 5,
      title: 'Project 5',
      description:
        'A local machine shop came to us with a tight deadline and needed professional welders to help with cladding flanges and valves to be used in the energy sector. We’ve gained experience working with Inconel-625, Stellite-21, Duplex 2209 and Stainless-316. We have worked with this customer for years now and every-time a project comes in we deliver the products on time.',
      likes: 0,
    },
  ]);

  const handleLike = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, likes: project.likes + 1 } : project
      )
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
            <div className="flex items-center mt-4">
              <LikeButton
                projectId={project.id}
                likes={project.likes}
                onLike={handleLike}
              />
              <CommentSection projectId={project.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
