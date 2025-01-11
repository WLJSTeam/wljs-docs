import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

import Link from '@docusaurus/Link'

import css from './styles.css';
/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

const registeredTags = {}; 

['env', 'virtual', 'needsContainer', 'update', 'source', 'origin', 'registered'];

registeredTags.env = (a) => {
  console.log('env!!');
  console.log(a);

  const list = a.map((el) => {
    if (el === 'WLJS') {
      return(<>
        <div
                className='envBlock'
                >
                {el}
        </div>
      </>)
    } else {
    return(<>
    <div
            className='envBlock'
         >
            {el}
    </div>
  </>)}
  });

  return (<>
    <div className='envContainer'>{list}</div>  
    <div className='envTextInfo'>Execution environment</div>

  </>);
}




registeredTags.update = (a) => {
  console.log('virtual!!');

  if (a != true) return false;

  return (<>
    <div
                className='envContainer'
                ><div style={{'background': 'var(--ifm-color-success-lightest)'}} className='emphs'>Supports dynamics</div></div>
  </>);
}

registeredTags.source = (a, fm) => {
  console.log('virtual!!');

  //if (a != true) return false;

  return (<>
    <Link
                className='envContainer'
                to = {a}
                ><div style={{'background': 'var(--ifm-color-info-dark)'}} className='emphs'>{fm.package}</div><div className='envTextInfo'>Package</div></Link>
  </>);
}

registeredTags.context = (a, fm) => {


  //if (a != true) return false;

  return (<>
    <div
                 
               
                ><div style={{ 'font-weight': '500', 'background': 'none', color : 'var(--ifm-font-color-base)'}} >{a}</div><div className='envTextInfo'>Context</div></div>
  </>);
}


function ShowTags({fm}) {
  console.log(fm);
  const list = [];

  Object.keys(fm).forEach((el) => {
    if (Object.keys(registeredTags).indexOf(el) > -1) {
      const k = registeredTags[el](fm[el], fm);
      if (k) {
        list.push(<><div className='refTagsHolder-item'>{k}</div></>);
      }
    }
  });

  if (list.length < 1) return (<></>);

  return (<>
    <div className='refTagsHolder'>{list}</div>
  </>)
}

export default function DocItemContent({children}) {
  const syntheticTitle = useSyntheticTitle();
  const {frontMatter} = useDoc();
  console.error(children);
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
          <ShowTags fm={frontMatter}/>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
