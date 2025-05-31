import React, {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/features';
import CodeBlock from '@theme/CodeBlock';
import Sandbox from '@site/src/components/sandbox';

import { useWindowSize } from '@docusaurus/theme-common';

import Logo2 from '@site/static/img/logo2.svg';

import { WLJSHTML, WLJSEditor, WLJSStore } from "@site/src/components/wljs-notebook-react";

import './FeedbackCarousel.css';

import { useSwipeable } from 'react-swipeable';

import { FaReddit, FaTwitter, FaDiscord } from 'react-icons/fa';
import { SiYcombinator } from 'react-icons/si';


import { useEffect, useRef } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import styles from './index.module.css';

const feedbacks = [
  {
    text: `WLJS is basically the only good free alternative to Mathematica the IDE. So if you can't pay for Mathematica, you can download free WLJS and thus have "Mathematica at home"`,
    user: "u/ForceBru",
    platform: "Reddit",
  },
  {
    text: "As someone who occasionally dabbles in Mathematica for creative coding, using WLJS finally made me enjoy writing Wolfram code.",
    user: "pona-a",
    platform: "YCombinator",
  },
  {
    text: "WHAT A LEGEND. This solves most of the problems I have with Wolfram Cloud.",
    user: "YoshiRulz",
    platform: "YCombinator",
  },
  {
    text: "This looks amazing and I think you just ruined the productivity of my day. I want to learn and to experiment with what you’ve built. It could open up Wolfram Language for kids and hobbyists everywhere...",
    user: "Per Møldrup-Dalum, Aarhus University",
    platform: "",
  },
];

const platformIcons = {
  Reddit: <FaReddit className="icon reddit" />,
  Twitter: <FaTwitter className="icon twitter" />,
  Discord: <FaDiscord className="icon discord" />,
  YCombinator: <SiYcombinator className="icon yc" />,
  Generic: ''
};

function FeedbackCarousel() {
  const [index, setIndex] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    trackMouse: true,
  });

  const next = () => setIndex((i) => (i + 1) % feedbacks.length);
  const prev = () => setIndex((i) => (i - 1 + feedbacks.length) % feedbacks.length);

  useEffect(() => {
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, []);

  const getClass = (i) => {
    if (i === index) return 'feedback-card center';
    if (i === (index - 1 + feedbacks.length) % feedbacks.length) return 'feedback-card left';
    if (i === (index + 1) % feedbacks.length) return 'feedback-card right';
    return 'feedback-card hidden';
  };

  return (
    <div className="carousel-multi-container" {...swipeHandlers}>
      {feedbacks.map((fb, i) => (
        <div key={i} className={getClass(i)}>
          <div className="feedback-text">{fb.text}</div>
          <div className="feedback-user">
            {platformIcons[fb.platform]}
            <span>{fb.user}</span>
            <span className="platform-label">{fb.platform}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const notebooks = [
    <>
   
    <h3 style={{"color": "var(--ifm-color-primary)"}}>Fourier Series Approximation of a Square Wave</h3>     

    <WLJSEditor display={"codemirror"} nid={"81ca8f84-ffea-48c5-ab2d-6d126bc315d1"} id={"832dd62a-4235-4330-a3d7-c7e431823949"} type={"Input"} opts={{}} >{`ManipulatePlot%5B%7B%0A%20%20%28%2ATB%5B%2A%29Sum%5B%28%2A%7C%2A%29%28%2AFB%5B%2A%29%28%28Sin%5B2%CF%80%282j%20-%201%29%20x%5D%29%28%2A%2C%2A%29%2F%28%2A%2C%2A%29%282j-1%29%29%28%2A%5DFB%2A%29%28%2A%7C%2A%29%2C%20%7B%28%2A%7C%2A%29j%28%2A%7C%2A%29%2C%28%2A%7C%2A%291.0%28%2A%7C%2A%29%2C%28%2A%7C%2A%29n%28%2A%7C%2A%29%7D%5D%28%2A%7C%2A%29%28%2A1%3AeJxTTMoPSmNiYGAoZgMSwaW5TvkVmYwgPguQCCkqTQUAeAcHBQ%3D%3D%2A%29%28%2A%5DTB%2A%29%2C%0A%20%20%28%2ATB%5B%2A%29Sum%5B%28%2A%7C%2A%29%28%2AFB%5B%2A%29%28%28Cos%5B2%CF%80%282j%20-%201%29%20x%5D%29%28%2A%2C%2A%29%2F%28%2A%2C%2A%29%282j-1%29%29%28%2A%5DFB%2A%29%28%2A%7C%2A%29%2C%20%7B%28%2A%7C%2A%29j%28%2A%7C%2A%29%2C%28%2A%7C%2A%291.0%28%2A%7C%2A%29%2C%28%2A%7C%2A%29n%28%2A%7C%2A%29%7D%5D%28%2A%7C%2A%29%28%2A1%3AeJxTTMoPSmNiYGAoZgMSwaW5TvkVmYwgPguQCCkqTQUAeAcHBQ%3D%3D%2A%29%28%2A%5DTB%2A%29%0A%20%20%0A%7D%2C%20%7Bx%2C%20-1%2C1%7D%2C%20%7B%7Bn%2C4%7D%2C%201%2C7%2C%201%7D%5D`}</WLJSEditor>
    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"af779bda-51c1-40ac-b3c3-657a42d6e3f8"} type={"Output"} opts={{}} >{`%28%2AGB%5B%2A%29%7B%7B%28%2AVB%5B%2A%29%28FrontEndRef%5B%22a2060c96-b03a-45a6-811e-145e601c7d6a%22%5D%29%28%2A%2C%2A%29%28%2A%221%3AeJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKJxoZmBkkW5rpJhkYJ%2BqamCaa6VoYGqbqGpqYppoZGCabp5glAgB5MxUu%22%2A%29%28%2A%5DVB%2A%29%28%2A%7C%2A%29%2C%28%2A%7C%2A%29%28%2AVB%5B%2A%29%28EventObject%5B%3C%7C%22Id%22%20-%3E%20%2223ef7239-21ec-4217-bf86-c211e90cd013%22%2C%20%22Initial%22%20-%3E%20%7B4%7D%2C%20%22View%22%20-%3E%20%2260684f28-23aa-43ef-82aa-ed53c9614587%22%7C%3E%5D%29%28%2A%2C%2A%29%28%2A%221%3AeJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKmxmYWZikGVnoGhknJuqaGKem6VoYAVmpKabGyZZmhiamFuYAfRgVTA%3D%3D%22%2A%29%28%2A%5DVB%2A%29%7D%7D%28%2A%5DGB%2A%29`}</WLJSEditor>
 
    </>
,
  <> 

    <h3 style={{"color": "var(--ifm-color-primary)"}}>Basic numeric optimization</h3>     
    <p style={{"color": "var(--ifm-color-primary-text)"}}>Find a minimum of a function over a geometric region:</p>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"9b270c02-7830-48b1-a67e-ac9e7ed26123"} type={"Input"} opts={{}} >{`FindMinimum%5B%7Bx%20%2B%20y%2C%20Element%5B%7Bx%2C%20y%7D%2C%20Disk%5B%5D%5D%7D%2C%20%7Bx%2C%20y%7D%5D%20`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"4c554872-64be-41d7-830a-d7ae5088a243"} type={"Input"} opts={{}} >{`Show%5B%0A%20%20ContourPlot%5Bx%20%2B%20y%2C%20Element%5B%7Bx%2C%20y%7D%2C%20Disk%5B%5D%5D%5D%2C%20%0A%20%20Graphics%5B%7BRed%2C%20PointSize%5BLarge%5D%2C%20Point%5B%7Bx%2C%20y%7D%20%2F.%20Last%5B%25%5D%5D%7D%5D%0A%5D`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"c331d5b8-e183-496a-8998-594252e03fe8"} type={"Output"} opts={{}} >{`%28%2AVB%5B%2A%29%28FrontEndRef%5B%22abb23df4-f2de-4d60-ad79-094bd63d4241%22%5D%29%28%2A%2C%2A%29%28%2A%221%3AeJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKJyYlGRmnpJnophmlpOqapJgZ6CammFvqGliaJKWYGaeYGJkYAgCV%2BhX6%22%2A%29%28%2A%5DVB%2A%29`}</WLJSEditor>  
  </>
,
  <>
    <h3 style={{"color": "var(--ifm-color-primary)"}}>Pie chart</h3>
    <p style={{"color": "var(--ifm-color-primary-text)"}}>Generate a pie chart for a list of values:</p>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"8b46b5d0-ca2d-4796-94a3-8aa5fba1ee64"} type={"Input"} opts={{}} >{`PieChart%5B%7B1%2C%202%2C%203%2C%204%7D%5D`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"e9432813-4f9a-47e8-afed-e274bae8df99"} type={"Output"} opts={{}} >{`%28%2AVB%5B%2A%29%28FrontEndRef%5B%2274546f7d-a3c9-48ef-aebf-e18c6eb647a2%22%5D%29%28%2A%2C%2A%29%28%2A%221%3AeJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKm5uYmpilmafoJhonW%2BqaWKSm6SamJqXpphpaJJulJpmZmCcaAQCL3xZF%22%2A%29%28%2A%5DVB%2A%29`}</WLJSEditor>

  </>
,
  <>
    <h3 style={{"color": "var(--ifm-color-primary)"}}>Stream plot</h3>
    <p style={{"color": "var(--ifm-color-primary-text)"}}>Generates a stream plot of the vector field</p>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"f62f1f57-7886-4a64-a3cb-c41bf775099d"} type={"Input"} opts={{}} >{`StreamPlot%5B%0A%20%20%7B-1%20-%20%28%2ASpB%5B%2A%29Power%5Bx%28%2A%7C%2A%29%2C%28%2A%7C%2A%292%5D%28%2A%5DSpB%2A%29%20%2B%20y%2C%201%20%2B%20x%20-%20%28%2ASpB%5B%2A%29Power%5By%28%2A%7C%2A%29%2C%28%2A%7C%2A%292%5D%28%2A%5DSpB%2A%29%7D%2C%20%7Bx%2C%20-3%2C%203%7D%2C%20%7By%2C%20-3%2C%203%7D%0A%5D`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"d973a41e-564a-4632-8cda-d3e537f45195"} type={"Output"} opts={{}} >{`%28%2AVB%5B%2A%29%28FrontEndRef%5B%226ec4d731-5b99-4ccd-9004-96923285cf29%22%5D%29%28%2A%2C%2A%29%28%2A%221%3AeJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKm6Umm6SYGxvqmiZZWuqaJCen6FoaGJjoWppZGhkbWZgmpxlZAgCA5RUo%22%2A%29%28%2A%5DVB%2A%29`}</WLJSEditor>    
  </>
,
  <>
    <h3 style={{"color": "var(--ifm-color-primary)"}}>Manipulate</h3>
    <p style={{"color": "var(--ifm-color-primary-text)"}}>Build an interface to vary the number of sides, and the hue, of a polygon:</p>
  
    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"3c6adc72-f390-4709-adc0-1710ffa71564"} type={"Input"} opts={{}} >{`Manipulate%5B%0A%20Graphics%5B%7BHue%5Bh%5D%2C%20RegularPolygon%5Bn%5D%7D%5D%2C%20%0A%20%7Bn%2C%205%2C%2020%2C%201%7D%2C%20%7Bh%2C%200%2C%201%2C%200.2%7D%0A%5D`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"7199a831-6aad-4079-bb1c-e826100a3528"} type={"Output"} opts={{}} >{`%28%2AGB%5B%2A%29%7B%7B%28%2AVB%5B%2A%29%28EventObject%5B%3C%7C%22Id%22%20-%3E%20%2266177dc9-fd22-4fa5-a268-ed17bf5048b7%22%2C%20%22Initial%22%20-%3E%20%7B12%2C%200.4%7D%2C%20%22View%22%20-%3E%20%2255808fcf-4305-4af2-b0d4-52bac88e7aa0%22%7C%3E%5D%29%28%2A%2C%2A%29%28%2A%221%3AeJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKm5paGFikJafpmhgbmOqaJKYZ6SYZpJjomholJSZbWKSaJyYaAACA3RXK%22%2A%29%28%2A%5DVB%2A%29%7D%28%2A%7C%7C%2A%29%2C%28%2A%7C%7C%2A%29%7B%28%2AVB%5B%2A%29%28FrontEndRef%5B%225cf065e0-04df-4838-80fb-d4068b527eaf%22%5D%29%28%2A%2C%2A%29%28%2A%221%3AeJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKmyanGZiZphroGpikpOmaWBhb6FoYpCXpppgYmFkkmRqZpyamAQCBTxWo%22%2A%29%28%2A%5DVB%2A%29%7D%7D%28%2A%5DGB%2A%29`}</WLJSEditor>  
  </>
,
  <>
    <h3 style={{"color": "var(--ifm-color-primary)"}}>ODE</h3>
    <p style={{"color": "var(--ifm-color-primary-text)"}}>Solve Riccati equaiton</p>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"4f6df709-d286-4e59-93bb-07196187ba35"} type={"Input"} opts={{}} >{`DSolve%5B%7By%27%5Bx%5D%20%3D%3D%20y%5Bx%5D%20%281%20-%20%28%2AFB%5B%2A%29%28%28y%5Bx%5D%29%28%2A%2C%2A%29%2F%28%2A%2C%2A%29%2827%29%29%28%2A%5DFB%2A%29%29%2C%20y%5B0%5D%20%3D%3D%20a%7D%2C%20y%2C%20x%5D`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"d780c2ca-9e51-42e7-a461-f727be8a0bf5"} type={"Output"} opts={{}} >{`%7B%7By-%3EFunction%5B%7Bx%7D%2C%28%2AFB%5B%2A%29%28%2827%20a%20%28%28%2ASpB%5B%2A%29Power%5BE%28%2A%7C%2A%29%2C%28%2A%7C%2A%29x%5D%28%2A%5DSpB%2A%29%29%29%28%2A%2C%2A%29%2F%28%2A%2C%2A%29%2827-a%2Ba%20%28%28%2ASpB%5B%2A%29Power%5BE%28%2A%7C%2A%29%2C%28%2A%7C%2A%29x%5D%28%2A%5DSpB%2A%29%29%29%29%28%2A%5DFB%2A%29%5D%7D%7D`}</WLJSEditor>

    <p style={{"color": "var(--ifm-color-primary-text)"}}>Plot the solution for different initial values:</p>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"213d45e0-26fd-4f0c-97f0-0a1735bfe021"} type={"Input"} opts={{}} >{`y%5Bx%5D%20%2F.%20%25%20%2F.%20%7B%7Ba-%3E%28%2AFB%5B%2A%29%28%281%29%28%2A%2C%2A%29%2F%28%2A%2C%2A%29%2813%29%29%28%2A%5DFB%2A%29%7D%2C%7Ba-%3E%28%2AFB%5B%2A%29%28%281%29%28%2A%2C%2A%29%2F%28%2A%2C%2A%29%282%29%29%28%2A%5DFB%2A%29%7D%2C%7Ba-%3E4%7D%7D%3B%0APlot%5B%25%2C%20%7Bx%2C%200%2C%2018%7D%5D`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"90cf9c32-8837-4101-b3dd-7fb21f383f61"} type={"Output"} opts={{}} >{`%28%2AVB%5B%2A%29%28FrontEndRef%5B%2215e9ee44-9455-4352-9402-b142484ab3d4%22%5D%29%28%2A%2C%2A%29%28%2A%221%3AeJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKG5qmWqammpjoWpqYmuqaGJsaAVkGRrpJhiZGJhYmiUnGKSYAcs4UtA%3D%3D%22%2A%29%28%2A%5DVB%2A%29`}</WLJSEditor>    
  </>
,
  <>
    <h3 style={{"color": "var(--ifm-color-primary)"}}>NDSolve</h3>
    <p style={{"color": "var(--ifm-color-primary-text)"}}>Second-order nonlinear ordinary differential equation:</p>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"d88e9d33-0df1-482e-80eb-1ffa281cb776"} type={"Input"} opts={{}} >{`s%20%3D%20NDSolve%5B%7B%0A%20%20y%27%27%5Bx%5D%20%2B%20Sin%5By%5Bx%5D%5D%20y%5Bx%5D%20%3D%3D%200%2C%20%0A%20%20y%5B0%5D%20%3D%3D%201%2C%20y%27%5B0%5D%20%3D%3D%200%0A%7D%2C%20y%2C%20%7Bx%2C%200%2C%2030%7D%5D`}</WLJSEditor>

    <p style={{"color": "var(--ifm-color-primary-text)"}}>Plot the solution and a few derivatives</p>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"7efe2ca5-cc3c-48a1-b8e5-490a9eec3462"} type={"Input"} opts={{}} >{`Plot%5BEvaluate%5B%7B%0A%20%20y%5Bx%5D%2C%20y%27%5Bx%5D%2C%20y%27%27%5Bx%5D%0A%7D%20%2F.%20s%5D%2C%20%7Bx%2C%200%2C%2030%7D%5D`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"26d7e212-03b5-4d7f-be79-e0404b43f6a8"} type={"Output"} opts={{}} >{`%28%2AVB%5B%2A%29%28Legended%5BToExpression%5BFrontEndRef%5B%22b1f00cd1-ba43-40dc-8e68-a7916184fffb%22%5D%2C%20InputForm%5D%2C%20Placed%5BLineLegend%5B%7BDirective%5BOpacity%5B1.%5D%2C%20RGBColor%5B0.24%2C%200.6%2C%200.8%5D%2C%20AbsoluteThickness%5B2%5D%5D%2C%20Directive%5BOpacity%5B1.%5D%2C%20RGBColor%5B0.95%2C%200.627%2C%200.1425%5D%2C%20AbsoluteThickness%5B2%5D%5D%2C%20Directive%5BOpacity%5B1.%5D%2C%20RGBColor%5B0.455%2C%200.7%2C%200.21%5D%2C%20AbsoluteThickness%5B2%5D%5D%7D%2C%20%7B%221%22%2C%20%222%22%2C%20%223%22%7D%2C%20LegendMarkers%20-%3E%20None%2C%20LabelStyle%20-%3E%20%7B%7D%2C%20LegendLayout%20-%3E%20%22Column%22%5D%2C%20After%2C%20Identity%5D%5D%29%28%2A%2C%2A%29%28%2A%221%3AeJy1Uj1LA0EQPTV%2BBQUV64hgG8glIcYiHNHEICRGc8F%2B725WD8%2FdsLennr0%2FQls7C%2BvUlhYWNlYWQRFEEP0H7ocRYiWIUzzuZt%2FOm7cziw5t4RHDMMJpATs%2BHFXApQxxyuxxkanDLhAvi4clJSmg6vniTBLxkMzNCVhnlPAq8arH4EYcOQHYSyLtmDiTcT0z7aB8Lp3PeG66CIViGi2vmAWzmMcYO7pwQkArEtcm5Acgr0mCWGXbLALd35iArQC54OHRfjN1n4DuUHMSKhdy%2FTcpoOIzcLl%2FCLpbaanZQa7PY2aoeLc0WSnXVtdoQBnrpk5ft7u3FsupeLTY%2BZmMF0uXmRVQdkIaRBzae767TyAMfWnlr8pYxZvFLj%2FuGs7Mk8VKyfuLTun635UXpOXUg%2FXVwrPFeifzV7XezS%2BV%2B29vS7apMKswNzhjtWh6aA3E9oGF6miTEvhBVBNGDgQ2jwPAxsCEB6lT3zXrKKYRt%2BW2CF%2FRAQnltpQxF0LS74YHhIun%2BATHbcQ4%22%2A%29%28%2A%5DVB%2A%29`}</WLJSEditor>
  </>
,
  <>
    <h3 style={{"color": "var(--ifm-color-primary)"}}>Take an integral</h3>
    <p style={{"color": "var(--ifm-color-primary-text)"}}>Use command palette Special Characters toolbox to enter integral or type it directly:</p>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"fcc75f4f-c443-4df1-b4bb-958dbd0c3412"} type={"Input"} opts={{}} >{`%28%2ATB%5B%2A%29Integrate%5B%28%2A%7C%2A%29Log%5Bx%5D%28%2A%7C%2A%29%2C%20%28%2A%7C%2A%29x%28%2A%7C%2A%29%5D%28%2A%7C%2A%29%28%2A1%3AeJxTTMoPSmNmYGAo5gUSYZmp5S6pyflFiSX5RcGcQBHPvJLUdCA3NZMRpIgVSLgl5hSnAgCQTg44%2A%29%28%2A%5DTB%2A%29`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"5500edd7-e325-4e11-8748-43ba24124b56"} type={"Output"} opts={{}} >{`-x%2Bx%20Log%5Bx%5D`}</WLJSEditor>

    <p style={{"color": "var(--ifm-color-primary-text)"}}>More complicated example:</p>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"a4ca6411-5db9-4a63-b1b1-b40f82bb5598"} type={"Input"} opts={{}} >{`Integrate%5B%28%2ASpB%5B%2A%29Power%5B2%28%2A%7C%2A%29%2C%28%2A%7C%2A%29Max%5Bx%2C%201%20-%20x%5D%5D%28%2A%5DSpB%2A%29%2C%20x%5D`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"ae54f221-9bc3-4ef1-a7e4-ffcb43c5e8b5"} type={"Output"} opts={{}} >{`%28%2ATB%5B%2A%29Piecewise%5B%7B%7B%28%2A%7C%2A%29-%28%2AFB%5B%2A%29%28%28%28%2ASpB%5B%2A%29Power%5B2%28%2A%7C%2A%29%2C%28%2A%7C%2A%291-x%5D%28%2A%5DSpB%2A%29%29%28%2A%2C%2A%29%2F%28%2A%2C%2A%29%28Log%5B2%5D%29%29%28%2A%5DFB%2A%29%28%2A%7C%2A%29%2C%28%2A%7C%2A%29x%3C%3D%28%2AFB%5B%2A%29%28%281%29%28%2A%2C%2A%29%2F%28%2A%2C%2A%29%282%29%29%28%2A%5DFB%2A%29%28%2A%7C%2A%29%7D%2C%7B%28%2A%7C%2A%29-%28%2AFB%5B%2A%29%28%282%20%28%28%2ASqB%5B%2A%29Sqrt%5B2%5D%28%2A%5DSqB%2A%29%29%29%28%2A%2C%2A%29%2F%28%2A%2C%2A%29%28Log%5B2%5D%29%29%28%2A%5DFB%2A%29%2B%28%2AFB%5B%2A%29%28%28%28%2ASpB%5B%2A%29Power%5B2%28%2A%7C%2A%29%2C%28%2A%7C%2A%29x%5D%28%2A%5DSpB%2A%29%29%28%2A%2C%2A%29%2F%28%2A%2C%2A%29%28Log%5B2%5D%29%29%28%2A%5DFB%2A%29%28%2A%7C%2A%29%2C%28%2A%7C%2A%29True%28%2A%7C%2A%29%7D%7D%5D%28%2A%7C%2A%29%28%2A1%3AeJxTTMoPSmNiYGAo5gUSYZmp5S6pyflFiSX5RcGcQJGAzNTk1PLM4tRMkCIAD2QL0A%3D%3D%2A%29%28%2A%5DTB%2A%29`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"2c99fd33-9808-49c9-aed1-02bfb177671f"} type={"Input"} opts={{}} >{`Plot%5B%25%2C%20%7Bx%2C%20-5%2C%205%7D%5D`}</WLJSEditor>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"8b46ecc7-1fdc-4716-b377-6f20f6da521b"} type={"Output"} opts={{}} >{`%28%2AVB%5B%2A%29%28FrontEndRef%5B%226242afd6-29ad-4aec-831a-821268160e10%22%5D%29%28%2A%2C%2A%29%28%2A%221%3AeJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKmxmZGCWmpZjpGlkmpuiaJKYm61oYGybqWhgZGplZGJoZpBoaAACDyxU0%22%2A%29%28%2A%5DVB%2A%29`}</WLJSEditor>    
  
  </>
,
  <>
    <h3 style={{"color": "var(--ifm-color-primary)"}}>Preparing a report</h3>
    <p style={{"color": "var(--ifm-color-primary-text)"}}>How about making a presentation right here:</p>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"dfb26770-f3d1-437d-847a-c4558e9031ae"} type={"Input"} opts={{}} >{`Figure%20%3D%20Plot%5B2%20Sin%5Bx%5D%20%2B%20x%2C%20%7Bx%2C%200%2C%2015%7D%2C%20Filling%20-%3E%20Bottom%5D%3B`}</WLJSEditor>

    <p style={{"color": "var(--ifm-color-primary-text)"}}>Place a figure on the slide</p>

    <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"1691f239-95f6-4ff0-bd98-b54c6a311caa"} type={"Input"} opts={{}} >{`.slide%0A%0A%23%20Slide%20%0A%0APlace%20some%20%3Cspan%20style%3D%22color%3Ared%22%3Eequations%3C%2Fspan%3E%0A%0A%24%24%0A%5C%5Chat%7BH%7D%20%5C%5CPsi%20%3D%20E%20%5C%5CPsi%0A%24%24%0A%0AOr%20figures%0A%0A%3CFigure%2F%3E`}</WLJSEditor>

    <WLJSEditor display={"slide"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"7710ad70-72c4-40ce-aaca-6b0407b6819c"} type={"Output"} opts={{}} >{`%3Cdummy%20%3E%0A%23%20Slide%20%0A%0APlace%20some%20%3Cspan%20style%3D%22color%3Ared%22%3Eequations%3C%2Fspan%3E%0A%0A%24%24%0A%5C%5Chat%7BH%7D%20%5C%5CPsi%20%3D%20E%20%5C%5CPsi%0A%24%24%0A%0AOr%20figures%0A%0AFrontEndExecutable%5B28b90f5f-727a-44da-8db4-17350917e2ed%5D%3C%2Fdummy%3E`}</WLJSEditor>

  </>
]

function GetNotebook(props) {
  return notebooks[props.index]
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [isHover, setIsHover] = useState(false);

  const windowSize = useWindowSize();


  const [index, setIndex] = useState(null);
  const [rendered, setRendered] = useState(true);
  const [targetIndex, setTargetIndex] = useState(null);

  useEffect(() => {
    if (index === null && windowSize !== 'ssr') {
      if (windowSize === 'mobile') {
        setIndex(2); // fixed index for mobile
      } else {
        setIndex(Math.floor(Math.random() * notebooks.length));
      }
    }
  }, [windowSize, index]);

  const changeNotebook = (newIndex) => {
    if (newIndex === index) return;
    setRendered(false);
    setTargetIndex(newIndex);

    setTimeout(() => {
      setIndex(newIndex);
      setRendered(true);
    }, 50); // Delay to simulate destruction
  };


  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={{"background-color": "var(--docusaurus-collapse-button-bg-hover)"}}>
      <WLJSStore kernel={require('./attachments/kernel-6354281729975158648.txt').default} json={require('./attachments/c0ccbdc5-acc8-4894-b9b2-daae8b112e17.txt').default}/>


      <div className={clsx('hero hero--primary', styles.heroBanner)} >
        <div className={clsx('container', styles.container, styles.fadeIn)} >
          <div style={{'height':'78vh', 'overflowY':'scroll', 'scrollbar-width': 'thin', 'margin-bottom':'1rem', 'borderRadius':'0.25rem'}}>
          {rendered && <GetNotebook index={index} />}
          </div>
          <div style={{ marginTop: 'auto', textAlign: 'center' }}>
        {notebooks.map((_, i) => (
          <span
            key={i}
            onClick={() => changeNotebook(i)}
            style={{
              display: 'inline-block',
              margin: '0 5px',
              cursor: 'pointer',
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: i === index ? '#000' : '#ccc',
            }}
          />
        ))}
      </div>
        </div>
        <div className={clsx('container', styles.specialGrow)}>
      
          <h1 className="hero__title" style={{"color": "var(--ifm-color-primary)"}}>WLJS Notebook</h1>
          <p className={clsx('hero__subtitle', styles.typewriter)} style={{"color": "var(--ifm-color-primary-text)", 'marginTop': '-0.6em', 'paddingBottom': '0.6em' }}>Next-Gen Digital Notebook for Physics, Math, and Data Science</p>
          <p className={styles.fadeIn} style={{"color": "var(--ifm-color-primary-text)"}}>It is the first open-source solution to feature <b>true 2D math input</b> combined with powerful syntax sugar and the <b>fastest granular interactive evaluation engine</b>, making it ideal for advanced mathematical workflows, 
    scientific computing, and data exploration.</p>

          <div className={clsx(styles.buttons, styles.fadeIn)} >
            <Link
              className="button button--secondary button--lg" style={{"background": "var(--ifm-color-primary-button)", "box-shadow": "0 0 31px -14px rgba(0, 0, 0, 0.8)", "color": "var(--ifm-color-primary-text-alt)", "textDecoration":"none !important"}}
              to="/wljs-demo">
              See online
            </Link>
            <Link
              className="button button--secondary button--lg" style={{"background": "var(--ifm-color-primary-button)", "box-shadow": "0 0 31px -14px rgba(0, 0, 0, 0.8)", "color": "var(--ifm-color-primary-text-alt)", "textDecoration":"none !important"}}
              to="/setup">
              Install 📥
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`WLJS Notebook`}
      description="It is the first open-source solution featuring true 2D math input combined with powerful syntax sugar and the fastest granular interactive evaluation engine, making it ideal for advanced mathematical workflows, 
    scientific computing, and data exploration.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={clsx('hero hero--primary', styles.heroBanner)} style={{"background-color": "var(--docusaurus-collapse-button-bg-hover)","color": "var(--ifm-color-primary-text)"}}>
          <div className="container">
            <br/>
            <FeedbackCarousel/>
          </div>
        </section>        
        <section className={clsx('hero hero--primary', styles.heroBanner)} style={{"color": "var(--ifm-color-primary-text)"}}>
          <div className="container">
            <br/>
            <h2 style={{"color": "var(--ifm-color-primary)"}}>We need your support</h2>
            <p>As an independent open-source project, we’re unaffiliated with Wolfram or any company. <a href="/sponsorship"><b>Your support keeps this project alive</b></a></p>
            <div className={clsx(styles.buttons, styles.fadeIn)} style={{display:'flex', 'flex-wrap':'wrap'}}>
            <Link
              className="button button--secondary button--lg" style={{"background": "var(--ifm-color-primary-button)", "box-shadow": "0 0 31px -14px rgba(0, 0, 0, 0.8)", "color": "var(--ifm-color-primary-text-alt)", "textDecoration":"none !important"}}
              to="https://github.com/JerryI/wolfram-js-frontend">
              <span className="flex flex-row items-center">Star <svg className="w-6 h-6 ml-3" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg></span>
            </Link>
            <Link
              className="button button--secondary button--lg" style={{"background": "var(--ifm-color-primary-button)", "box-shadow": "0 0 31px -14px rgba(0, 0, 0, 0.8)", "color": "var(--ifm-color-primary-text-alt)", "textDecoration":"none !important"}}
              to="/sponsorship">
              Donate
            </Link>
            <Link
              className="button button--secondary button--lg" style={{"background": "var(--ifm-color-primary-button)", "box-shadow": "0 0 31px -14px rgba(0, 0, 0, 0.8)", "color": "var(--ifm-color-primary-text-alt)", "textDecoration":"none !important", display: "flex"}}
              to="https://opencollective.com/wljs-notebook">
                <img class="mt-auto mb-auto pr-2" width="30" src="https://next-images.opencollective.com/_next/image?url=%2Fstatic%2Fimages%2Foc-logo-watercolor-256.png&amp;w=64&amp;q=75"/>
                <span>Open Collective</span>
            </Link>
            </div>
          </div>
        </section> 
        <section className={clsx('hero hero--primary', styles.heroBanner)} style={{"background-color": "var(--docusaurus-collapse-button-bg-hover)", "color": "var(--ifm-color-primary-text)"}}>
          <div className="container py-4">
            <a href="https://scoutforge.net/reviews/wljs-notebook/" title="Trusted and reviewed by Scout Forge"><img src="https://scoutforge.net/wp-content/themes/wp-theme/assets/img/badges/badge-light.webp" style={{"max-width":"300px"}} alt="Trusted and Reviewed by Scout Forge"/></a>  
          </div>
        </section>   
        <section className={clsx('hero hero--primary', styles.heroBanner)} style={{"color": "var(--ifm-color-primary-text)"}}>
          <div className="container">
            <br/>
            <h2 style={{"color": "var(--ifm-color-primary)"}}>Licensing</h2>
            <p>WLJS Notebooks (including all extensions, graphics and sound libraries, frontend and backend) are <strong>licensed under GPLv3</strong> 👩🏼‍⚖️. The algorithms, functions, and other components of the <strong>Wolfram Language</strong> provided by the freeware distribution of Wolfram Engine are the intellectual property of Wolfram Research, Inc. See the <a href="https://www.wolfram.com/legal/terms/wolfram-engine.html">license agreement</a> if you use it in commerce.</p>
          </div>
        </section>             
      </main>
    </Layout>
  ); 
}