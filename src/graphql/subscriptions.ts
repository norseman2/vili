/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSmartMeter = /* GraphQL */ `
  subscription OnCreateSmartMeter {
    onCreateSmartMeter {
      id
      name
      description
      unit
      type
      role
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
          role
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
export const onUpdateSmartMeter = /* GraphQL */ `
  subscription OnUpdateSmartMeter {
    onUpdateSmartMeter {
      id
      name
      description
      unit
      type
      role
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
          role
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
export const onDeleteSmartMeter = /* GraphQL */ `
  subscription OnDeleteSmartMeter {
    onDeleteSmartMeter {
      id
      name
      description
      unit
      type
      role
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
          role
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
export const onCreateLoadProfile = /* GraphQL */ `
  subscription OnCreateLoadProfile {
    onCreateLoadProfile {
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
        role
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
export const onUpdateLoadProfile = /* GraphQL */ `
  subscription OnUpdateLoadProfile {
    onUpdateLoadProfile {
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
        role
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
export const onDeleteLoadProfile = /* GraphQL */ `
  subscription OnDeleteLoadProfile {
    onDeleteLoadProfile {
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
        role
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
export const onCreateDataPoint = /* GraphQL */ `
  subscription OnCreateDataPoint {
    onCreateDataPoint {
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
export const onUpdateDataPoint = /* GraphQL */ `
  subscription OnUpdateDataPoint {
    onUpdateDataPoint {
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
export const onDeleteDataPoint = /* GraphQL */ `
  subscription OnDeleteDataPoint {
    onDeleteDataPoint {
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
