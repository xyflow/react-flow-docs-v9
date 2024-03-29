const path = require('path');

const exampleTemplate = path.resolve('./src/templates/example-page.js');

const examplePagesQuery = `{
  allExamplesJson {
    edges {
      node {
        slug
        title
        source
        description
      }
    }
  }
}
`;

const createExamplePage = (createPage, examplePages) => {
  examplePages.forEach((page) => {
    const { slug, title, source, description } = page.node;

    createPage({
      path: slug,
      component: exampleTemplate,
      context: {
        slug,
        title,
        source,
        description,
        sourceSlug: `/example-flows/${source}/`,
      },
    });
  });
};

const exampleGenerator = (createPage, graphql) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(examplePagesQuery).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const pages = result.data.allExamplesJson.edges;

        try {
          createExamplePage(createPage, pages);
        } catch (e) {
          console.log(e);
        }
      })
    );
  });

module.exports = exampleGenerator;
