/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSmartMeter = /* GraphQL */ `
  query GetSmartMeter($id: ID!) {
    getSmartMeter(id: $id) {
      id
      name
      description
      unit
      type
      profile {
        id
        name
        description
        unit
        type
        meter {
          id
          name
          description
          unit
          type
          createdAt
          updatedAt
        }
        dataPoints
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSmartMeters = /* GraphQL */ `
  query ListSmartMeters(
    $filter: ModelSmartMeterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSmartMeters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        unit
        type
        profile {
          id
          name
          description
          unit
          type
          dataPoints
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLoadProfile = /* GraphQL */ `
  query GetLoadProfile($id: ID!) {
    getLoadProfile(id: $id) {
      id
      name
      description
      unit
      type
      meter {
        id
        name
        description
        unit
        type
        profile {
          id
          name
          description
          unit
          type
          dataPoints
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      dataPoints
      createdAt
      updatedAt
    }
  }
`;
export const listLoadProfiles = /* GraphQL */ `
  query ListLoadProfiles(
    $filter: ModelLoadProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLoadProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        unit
        type
        meter {
          id
          name
          description
          unit
          type
          createdAt
          updatedAt
        }
        dataPoints
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDataPoint = /* GraphQL */ `
  query GetDataPoint($id: ID!) {
    getDataPoint(id: $id) {
      id
      timestamp
      time
      hour
      minutes
      value
      unit
      createdAt
      updatedAt
    }
  }
`;
export const listDataPoints = /* GraphQL */ `
  query ListDataPoints(
    $filter: ModelDataPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDataPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        timestamp
        time
        hour
        minutes
        value
        unit
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
