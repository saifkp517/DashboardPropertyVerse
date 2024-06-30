"use client"

import Head from 'next/head'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import MyTable from '../components/tools/Table';
import axios from 'axios'
import MyChart from '../components/tools/Chart';
import SideNav from '../components/SideNav';

//sections
import PropertyUpload from '../components/sections/PropertyUpload';
import Investors from '../components/sections/Users';
import MyProperties from '../components/sections/MyProperties';
import EditSection from '../components/sections/EditSection';
import Meetings from '../components/sections/Meetings';

export default function Home() {



  const [activeComponent, setActiveComponent] = useState(() => {
    const savedActiveComp = localStorage.getItem('activeComponent');
    return savedActiveComp ? savedActiveComp : 'properties'
  });

  const handleActiveComponent = (data: string) => {
    setActiveComponent(data)
    console.log(data)
  }

  useEffect(() => {
    localStorage.setItem('activeComponent', activeComponent)
  }, [activeComponent])

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
