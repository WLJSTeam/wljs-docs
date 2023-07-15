import React from 'react';
import DocItem from '@theme-original/DocItem';

import GiscusComponent from '@site/src/components/GiscusComponent';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function DocItemWrapper(props) {
  return (
    <>
      <DocItem {...props} />
      <br></br>
      <GiscusComponent />
    </>
  );
}
