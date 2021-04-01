import React from 'react';
import styled from '@emotion/styled';
import { Flex, Box } from 'reflexbox';
import { GatsbyImage } from 'gatsby-plugin-image';

import CenterContent from 'components/CenterContent';
import useShowcaseImages from 'hooks/useShowcaseImages';
import { H4 } from 'components/Typo';
import { getThemeColor } from 'utils/css-utils';

const gridPadding = 3;

const RoundImage = styled(GatsbyImage)`
  border-radius: 4px;
  height: 250px;
  transition: transform 200ms ease;
`;

const Title = styled(H4)`
  color: ${getThemeColor('textInverted')};
  margin: 16px 0 0 0;
  font-weight: 400;
`;

const Link = styled.a`
  &&& {
    color: ${getThemeColor('silverDarken15')};

    &:hover {
      color: ${getThemeColor('silverLighten15')};

      ${RoundImage} {
        transform: scale(1.025);
      }
    }
  }
`;

const Showcases = () => {
  const showcases = useShowcaseImages();

  return (
    <CenterContent mb={6}>
      <Flex marginX={[0, 0, -gridPadding]} flexWrap="wrap">
        {showcases.map((showcase) => (
          <Box
            key={showcase.title}
            width={[1, 1, 1 / 3]}
            px={[0, 0, gridPadding]}
            mb={[3, 3, 0]}
          >
            <Link href={showcase.url} target="_blank" rel="noopener noreferrer">
              <RoundImage
                image={showcase.image.childImageSharp.gatsbyImageData}
              />
              <Title>{showcase.title}</Title>

              {showcase.url}
            </Link>
          </Box>
        ))}
      </Flex>
    </CenterContent>
  );
};

export default Showcases;
