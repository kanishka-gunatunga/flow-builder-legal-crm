'use client';

import 'reactflow/dist/style.css';
import React from 'react';
import { useState, useRef } from 'react';
import type { PutBlobResult } from '@vercel/blob';
import { apiUrl } from '../service/idGenerateFunctions';


interface ButtonPrimaryProps {
  id: string;
  text: string;
  link: string;
}


export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ id, text, link }) => {

  return (
    <>
      <a className='primaryButton' id={id} href={link}>
        {text}
      </a>
    </>
  )
}

function Home() {

  const flowPaths = [
    {
      id: '1',
      text: 'English',
      link: '/english'
    },
    {
      id: '2',
      text: 'සිංහල',
      link: '/sinhala'
    },
    {
      id: '3',
      text: 'தமிழ்',
      link: '/tamil'
    }
  ]

  

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: '100vw',
          height: '100vh',
          color: '#333'
        }}
      >
        <h1>Welcome to Flow Builder</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {
            flowPaths.map((item) => (
              <div key={item.id} className="d-flex">
                <ButtonPrimary id={item.id} text={item.text} link={item.link} />
              </div>
            ))
          }
          <div>

          </div>
        </div>
       
      </div>
    </>
  )
}

export default Home
