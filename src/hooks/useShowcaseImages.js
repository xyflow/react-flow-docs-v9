import { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export default function useFeaturedProjects() {
  const rawData = useStaticQuery(graphql`
    query ShowcaseImages {
      allShowcasesJson {
        edges {
          node {
            title
            url
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 600)
              }
            }
          }
        }
      }
    }
  `);

  const images = useMemo(
    () => rawData.allShowcasesJson.edges.map(({ node }) => node),
    [rawData]
  );

  return images;
}
