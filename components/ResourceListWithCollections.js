import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Card,
  ResourceList,
  Stack,
  TextStyle,
} from '@shopify/polaris';

const GET_COLLECTIONS = gql`
  query {
    collections(first:1) {
        edges {
        node {
          id
          title
          image {
            originalSrc
          }
        }
      }
    }
  }
`;

class ResourceListWithCollections extends React.Component {
  render() {
    return (
      <Query query={GET_COLLECTIONS}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;

          return (
            <Card>
              <ResourceList
                showHeader
                resourceName={{ singular: 'Collection', plural: 'Collections' }}
                items={data.collections.edges}
                renderItem={item => {
                  return (
                    <ResourceList.Item
                      id={item.node.id}
                    >
                      <Stack>
                        <Stack.Item fill>
                          <h3>
                            <TextStyle variation="strong">
                              {item.node.title}
                            </TextStyle>
                          </h3>
                        </Stack.Item>
                      </Stack>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default ResourceListWithCollections;
