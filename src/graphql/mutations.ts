/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSmartMeter = /* GraphQL */ `
  mutation CreateSmartMeter(
    $input: CreateSmartMeterInput!
    $condition: ModelSmartMeterConditionInput
  ) {
    createSmartMeter(input: $input, condition: $condition) {
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
export const updateSmartMeter = /* GraphQL */ `
  mutation UpdateSmartMeter(
    $input: UpdateSmartMeterInput!
    $condition: ModelSmartMeterConditionInput
  ) {
    updateSmartMeter(input: $input, condition: $condition) {
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
export const deleteSmartMeter = /* GraphQL */ `
  mutation DeleteSmartMeter(
    $input: DeleteSmartMeterInput!
    $condition: ModelSmartMeterConditionInput
  ) {
    deleteSmartMeter(input: $input, condition: $condition) {
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
export const createLoadProfile = /* GraphQL */ `
  mutation CreateLoadProfile(
    $input: CreateLoadProfileInput!
    $condition: ModelLoadProfileConditionInput
  ) {
    createLoadProfile(input: $input, condition: $condition) {
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
export const updateLoadProfile = /* GraphQL */ `
  mutation UpdateLoadProfile(
    $input: UpdateLoadProfileInput!
    $condition: ModelLoadProfileConditionInput
  ) {
    updateLoadProfile(input: $input, condition: $condition) {
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
export const deleteLoadProfile = /* GraphQL */ `
  mutation DeleteLoadProfile(
    $input: DeleteLoadProfileInput!
    $condition: ModelLoadProfileConditionInput
  ) {
    deleteLoadProfile(input: $input, condition: $condition) {
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
export const createDataPoint = /* GraphQL */ `
  mutation CreateDataPoint(
    $input: CreateDataPointInput!
    $condition: ModelDataPointConditionInput
  ) {
    createDataPoint(input: $input, condition: $condition) {
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
export const updateDataPoint = /* GraphQL */ `
  mutation UpdateDataPoint(
    $input: UpdateDataPointInput!
    $condition: ModelDataPointConditionInput
  ) {
    updateDataPoint(input: $input, condition: $condition) {
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
export const deleteDataPoint = /* GraphQL */ `
  mutation DeleteDataPoint(
    $input: DeleteDataPointInput!
    $condition: ModelDataPointConditionInput
  ) {
    deleteDataPoint(input: $input, condition: $condition) {
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
