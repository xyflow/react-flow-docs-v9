import React, { memo } from 'react';
import { Global, css, jsx } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

const NormalizeStyle = memo(() => {
  const globalStyles = css`
    ${emotionNormalize}

    input {
      box-sizing: border-box;
    }
  `;

  return <Global styles={globalStyles} />;
});

export default NormalizeStyle;
