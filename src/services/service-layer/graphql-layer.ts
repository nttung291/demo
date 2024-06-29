import { GraphQLClient } from "graphql-request";
import { GRAPHCMS_ENDPOINT, GRAPHCMS_TOKEN } from "../config";

const client = new GraphQLClient(GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${GRAPHCMS_TOKEN}`,
  },
});

export const graphQlRequest = (query: string) => {
  return client.request(query);
};
