import React, {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/DEMOFeatures';
import CodeBlock from '@theme/CodeBlock';
import Sandbox from '@site/src/components/sandbox';

import Logo2 from '@site/static/img/logo2.svg';


import { useEffect, useRef } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [isHover, setIsHover] = useState(false);


  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={{"background-color": "var(--ifm-background-color)"}}>
      <div className="container">
      
   
        <h1 className="hero__title" style={{"color": "var(--ifm-color-primary)"}}>WLJS Demonstration Project</h1>
        <p className="hero__subtitle" style={{"color": "var(--ifm-color-primary-text)", 'marginTop': '-0.6em', 'paddingBottom': '0.6em' }}>A collection of various notebooks showcasing examples of how to use the Wolfram Language and the dynamic features of our frontend, posted as static web pages.</p>

        <p style={{
  color: "var(--ifm-color-primary-text)",
  marginTop: "-0.6em",
  paddingBottom: "0.6em",
  padding: "0.5rem",
  borderRadius: "4px",
  background: "transparent",
  fontWeight: 400, 
}}><b>WLJS Notebook</b> is an open-source notebook interface designed to work with the <b>Wolfram Engine</b>, a <b>free implementation of the Wolfram Language</b> and its standard library. All algorithms, functions, and other components of the Wolfram Language provided by the Wolfram Engine are the intellectual property of Wolfram Research, Inc.</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  ); 
}
