import React, {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CodeBlock from '@theme/CodeBlock';
import Sandbox from '@site/src/components/sandbox';

import Component from '@site/src/components/wljs-notebook-react/includes';
import Notebook from '@site/src/components/wljs-notebook-react';

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
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{width: 'auto', 'min-height': 420, 'position':'relative', 'border-radius': '6px', 'padding': '1em', 'background-color': isHover ? 'rgba(255, 255, 255, .5)' : 'transparent'}}
            >
        <div> 
          <Sandbox 
            code="('wls!'time%608.3%3B_dt%600.2%3B_pX%C2%80%26%25%2C_-%26-%25%24_FrontEndVirtual%5B(_AttachDOM%5B%5C'canvas%5C'%5D%2C_Graphics%5B(PointSize%5B0.06%5D%2CRGBColor%5B1%2C1%2C1%5D%2C_Opacity%5B0.8%5DKLine%5Bpts%5D)K%5C'TransitionType%5C'-%3E%5C'Linear%5C'K%5C'ImageSize%5C'-%3E(450%2C400)%2C_%5C'TransitionDuration%5C'-%3E200%5D)%5D%3B%20__While%5BTrue%2C_time%60time%20%2B%20dt%3B_If%5Btime%20%3E%2012Kdt%60-0.2%5D%3B%20_If%5Btime%20%3C%205Kdt%600.2%5D%3B%20_pX%C2%80%26%25%2C_-%26-%25%24Pause%5B0.19%5D%3B%20%20_K(iK4)%5D%3B'~js!''~includes!%5B'https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2FJerryI%2Fwljs-graphics-d3%40latest%2Fdist%2Fkernel.js'%5D~compiled!%5B'Hold'%7B%2C8.3%7F0.2%5D*%3F'%7C*Set'~t'*If'*%C2%81%23U%5D%7C%7D'Y7%7D'Z7%7DQY%5D7%7DQZ%5D7%5EFrontEndVirtual'%7C*AttachDOM'~%22canvas%22'%5D*Graphics'%7C*PointSize'%2C0.06%5D*RGBColor'%2C1%2C1%2C1%5D*Opacity'%2C0.8%5D*Line'~pts'%C2%82Type%22'~%22Linear%22'%5D*Rule'~%22ImageSize%22'%7C%2C450%2C400%C2%82Duration%22'%2C200UU*While'%2Ctrue%7B*Plus'~time'~dt'U*If'*Greater'~time'%2C12%7F-0.2U*If'*Less'~time'%2C5%7F0.2U*%3F'%7C*Set'~t'*If'*%C2%81%23U%5D%7C%7D'Y7%7D'Z7%7DQY%5D7%7DQZ%5D7%5EPause'%2C0.19%5D%2Cnull%5D%7C~i'%2C4U%2CnullU)*%2C%5B'7U*Power'*Sqrt'~t'%5D%2C-1UK%2C%20N%5Bt%5D)%2FSqrt%5Bt%5DQ'%7D'%2C-1U%5D%5DXts%60Partition%5BTable%5BWith%5B(t%60If%5Btime%20-%20delay%20%3C%20Y%7C*Cos'~t'%5D*Sin'~t'Z*ListQ*Sin'~t'U*Cos'~t'_%5Cn%23*Plus'~timeQ~delay'U%24)%5DK(delayK0K12K0.11)%5D%20%2F%2F%20FlattenK2%5D%3B_%25(-Sin%5Bt%5DKCosN%26(Cos%5Bt%5DKSinNK%3FSet'~pts'*Partition'*Flatten'*Table'*With%5EU%7C~delay'%2C0%2C12%2C0.11U%5D%2C2U*%60%20%3D%20%7B*CompoundExpression'*Set'~time'%7C*List'%7D*Times%7F%5D*Set'~dt'%2C%C2%800.1K0.1Ktime-delay%5D)K_(%C2%81Less'%23%2C0.1%5D%2C0.1%C2%82U*Rule'~%22Transition%01%C2%82%C2%81%C2%80%7F%7D%7C%7B%60%5E%3F%26%25%24%23_ZYXUQNK7*_" 
            height="420">Lines example
          </Sandbox>
        </div> 
        <div style={{transition: 'opacity .5s ease-in-out', opacity: isHover ? '1' : '0', 'text-align':'left', position: 'absolute', 'top':0, 'overflow-y': 'auto', 'height': 420, 'width':'100%'}}> 
         <Component></Component> 
        <Notebook code="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" name="waste-dc982">waste-dc982</Notebook>

        </div> 
        </div>
        <h1 className="hero__title">WLJS</h1>
        <p className="hero__subtitle" style={{ 'marginTop': '-0.6em', 'paddingBottom': '0.6em' }}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/frontend/instruction">
            Getting started - 5min ⏱️
          </Link>
        </div>

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
