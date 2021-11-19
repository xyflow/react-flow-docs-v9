import React from 'react';
import styled from '@emotion/styled';
import { Flex, Box } from 'reflexbox';
import Helmet from 'react-helmet';

import Page from 'components/Page';
import Sidebar from 'components/Sidebar';

const Wrapper = styled(Flex)`
  border-top: 1px solid ${(p) => p.theme.colors.silverLighten30};
`;

const DocWrapper = styled(Box)`
  max-width: 620px;
  margin: 0 auto;
  position: relative;
  padding: 0 16px;
`;

const metaTags = {
  algolia: true,
};

export default ({ children, menu = [], ...rest }) => {
  return (
    <Page {...rest} footerBorder metaTags={metaTags}>
      <Wrapper>
        <Sidebar menu={menu} isDocs />
        <DocWrapper>{children}</DocWrapper>
      </Wrapper>
      <Helmet>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@docsearch/js@alpha"></script>
        <script type="text/javascript" src="/docsearch.js"></script>
      </Helmet>
    </Page>
  );
};
