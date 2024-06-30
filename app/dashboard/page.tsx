"use client"

import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

// Dynamic import of components
const MyTable = dynamic(() => import('../components/tools/Table'), { ssr: false });
const MyChart = dynamic(() => import('../components/tools/Chart'), { ssr: false });
const SideNav = dynamic(() => import('../components/SideNav'), { ssr: false });
const PropertyUpload = dynamic(() => import('../components/sections/PropertyUpload'), { ssr: false });
const Investors = dynamic(() => import('../components/sections/Users'), { ssr: false });
const MyProperties = dynamic(() => import('../components/sections/MyProperties'), { ssr: false });
const EditSection = dynamic(() => import('../components/sections/EditSection'), { ssr: false });
const Meetings = dynamic(() => import('../components/sections/Meetings'), { ssr: false });

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('properties');

  const handleActiveComponent = (data: string) => {
    setActiveComponent(data);
    console.log(data);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedActiveComp = window.localStorage.getItem('activeComponent');
      if (savedActiveComp) {
        setActiveComponent(savedActiveComp);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('activeComponent', activeComponent);
    }
  }, [activeComponent]);

  return (
    <div className="">
      <SideNav sendChangedComponent={handleActiveComponent} />
      <div className="p-8 sm:ml-64 bg-gray-200">
        {activeComponent === 'upload' && <PropertyUpload />}
        {activeComponent === 'users' && <Investors />}
        {activeComponent === 'properties' && <MyProperties sendChangedComponent={handleActiveComponent} />}
        {activeComponent === 'meetings' && <Meetings />}
        {activeComponent.startsWith('edit/') && <EditSection id={activeComponent.substring(5)} />}
      </div>
    </div>
  );
}
