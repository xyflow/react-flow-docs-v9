import React, { Fragment } from 'react';
import { Box } from 'reflexbox';

import theme from 'themes/index';

import CenterContent from 'components/CenterContent';

export default ({
  children,
  bg = 'transparent',
  centered = false,
  id = null,
  big = false,
  ...rest
}) => {
  const WrapperComponent = centered ? CenterContent : Fragment;
  const wrapperProps = centered ? { big: big } : {};

  return (
    <Box
      id={id}
      bg={theme.light.colors[bg] ? theme.light.colors[bg] : bg}
      py={[4, 5]}
      {...rest}
    >
      <WrapperComponent {...wrapperProps}>{children}</WrapperComponent>
    </Box>
  );
};
