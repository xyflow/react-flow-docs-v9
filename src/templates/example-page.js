import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { ReactFlowProvider } from 'react-flow-renderer';

import ExamplePage from 'components/Page/Example';

export default ({ data, pageContext }) => {
  const [flow, setFlow] = useState(null);
  const sourceCodeFiles = data?.allFile?.edges
    ?.map(({ node }) => node)
    .sort((a, b) => {
      if (a.absolutePath.includes('index.js')) {
        return -1;
      }
    })
    .filter((node) => node.internal.content);

  useEffect(() => {
    const load = async () => {
      const nextFlow = await import(`example-flows/${pageContext.source}`);
      setFlow(nextFlow);
    };

    load();
  }, [pageContext]);

  return (
    <ExamplePage
      title={pageContext.title}
      slug={pageContext.slug}
      description={pageContext.description}
      sourceCodeFiles={sourceCodeFiles}
    >
      <ReactFlowProvider>{flow && <flow.default />}</ReactFlowProvider>
    </ExamplePage>
  );
};

export const pageQuery = graphql`
  query SourceBySourceSlug($sourceSlug: String!) {
    allFile(filter: { absolutePath: { regex: $sourceSlug } }) {
      edges {
        node {
          id
          absolutePath
          internal {
            content
          }
        }
      }
    }
  }
`;
