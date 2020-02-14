/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLog = `query GetLog($id: ID!) {
  getLog(id: $id) {
    id
    runner
    distance
    elevation
    sortKey
  }
}
`;
export const listLogs = `query ListLogs($filter: ModelLogFilterInput, $limit: Int, $nextToken: String) {
  listLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      runner
      distance
      elevation
      sortKey
    }
    nextToken
  }
}
`;
