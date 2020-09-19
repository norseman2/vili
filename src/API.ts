/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSmartMeterInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  unit: MeterUnit,
  type: MeterType,
  role?: string | null,
  meterId?: string | null,
};

export enum MeterUnit {
  kW = "kW",
  kWh = "kWh",
  m3 = "m3",
  celsius = "celsius",
}


export enum MeterType {
  ELECTRICITY = "ELECTRICITY",
  WATER = "WATER",
  GAS = "GAS",
  TEMPERATURE = "TEMPERATURE",
}


export type ModelSmartMeterConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  unit?: ModelMeterUnitInput | null,
  type?: ModelMeterTypeInput | null,
  role?: ModelStringInput | null,
  and?: Array< ModelSmartMeterConditionInput | null > | null,
  or?: Array< ModelSmartMeterConditionInput | null > | null,
  not?: ModelSmartMeterConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelMeterUnitInput = {
  eq?: MeterUnit | null,
  ne?: MeterUnit | null,
};

export type ModelMeterTypeInput = {
  eq?: MeterType | null,
  ne?: MeterType | null,
};

export type UpdateSmartMeterInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  unit?: MeterUnit | null,
  type?: MeterType | null,
  role?: string | null,
  meterId?: string | null,
};

export type DeleteSmartMeterInput = {
  id?: string | null,
};

export type CreateLoadProfileInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  unit: MeterUnit,
  type: MeterType,
  dataPoints?: string | null,
  meterId: string,
};

export type ModelLoadProfileConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  unit?: ModelMeterUnitInput | null,
  type?: ModelMeterTypeInput | null,
  dataPoints?: ModelStringInput | null,
  and?: Array< ModelLoadProfileConditionInput | null > | null,
  or?: Array< ModelLoadProfileConditionInput | null > | null,
  not?: ModelLoadProfileConditionInput | null,
};

export type UpdateLoadProfileInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  unit?: MeterUnit | null,
  type?: MeterType | null,
  dataPoints?: string | null,
  meterId?: string | null,
};

export type DeleteLoadProfileInput = {
  id?: string | null,
};

export type CreateDataPointInput = {
  id?: string | null,
  timestamp: string,
  time: string,
  hour: number,
  minutes: number,
  value: number,
  unit: DataPointUnit,
};

export enum DataPointUnit {
  kW = "kW",
  kWh = "kWh",
  m3 = "m3",
  celsius = "celsius",
}


export type ModelDataPointConditionInput = {
  timestamp?: ModelStringInput | null,
  time?: ModelStringInput | null,
  hour?: ModelIntInput | null,
  minutes?: ModelIntInput | null,
  value?: ModelFloatInput | null,
  unit?: ModelDataPointUnitInput | null,
  and?: Array< ModelDataPointConditionInput | null > | null,
  or?: Array< ModelDataPointConditionInput | null > | null,
  not?: ModelDataPointConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelDataPointUnitInput = {
  eq?: DataPointUnit | null,
  ne?: DataPointUnit | null,
};

export type UpdateDataPointInput = {
  id: string,
  timestamp?: string | null,
  time?: string | null,
  hour?: number | null,
  minutes?: number | null,
  value?: number | null,
  unit?: DataPointUnit | null,
};

export type DeleteDataPointInput = {
  id?: string | null,
};

export type ModelSmartMeterFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  unit?: ModelMeterUnitInput | null,
  type?: ModelMeterTypeInput | null,
  role?: ModelStringInput | null,
  and?: Array< ModelSmartMeterFilterInput | null > | null,
  or?: Array< ModelSmartMeterFilterInput | null > | null,
  not?: ModelSmartMeterFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelLoadProfileFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  unit?: ModelMeterUnitInput | null,
  type?: ModelMeterTypeInput | null,
  dataPoints?: ModelStringInput | null,
  and?: Array< ModelLoadProfileFilterInput | null > | null,
  or?: Array< ModelLoadProfileFilterInput | null > | null,
  not?: ModelLoadProfileFilterInput | null,
};

export type ModelDataPointFilterInput = {
  id?: ModelIDInput | null,
  timestamp?: ModelStringInput | null,
  time?: ModelStringInput | null,
  hour?: ModelIntInput | null,
  minutes?: ModelIntInput | null,
  value?: ModelFloatInput | null,
  unit?: ModelDataPointUnitInput | null,
  and?: Array< ModelDataPointFilterInput | null > | null,
  or?: Array< ModelDataPointFilterInput | null > | null,
  not?: ModelDataPointFilterInput | null,
};

export type CreateSmartMeterMutationVariables = {
  input: CreateSmartMeterInput,
  condition?: ModelSmartMeterConditionInput | null,
};

export type CreateSmartMeterMutation = {
  createSmartMeter:  {
    __typename: "SmartMeter",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    role: string | null,
    profile:  {
      __typename: "LoadProfile",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      meter:  {
        __typename: "SmartMeter",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        role: string | null,
        createdAt: string,
        updatedAt: string,
      },
      dataPoints: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSmartMeterMutationVariables = {
  input: UpdateSmartMeterInput,
  condition?: ModelSmartMeterConditionInput | null,
};

export type UpdateSmartMeterMutation = {
  updateSmartMeter:  {
    __typename: "SmartMeter",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    role: string | null,
    profile:  {
      __typename: "LoadProfile",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      meter:  {
        __typename: "SmartMeter",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        role: string | null,
        createdAt: string,
        updatedAt: string,
      },
      dataPoints: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSmartMeterMutationVariables = {
  input: DeleteSmartMeterInput,
  condition?: ModelSmartMeterConditionInput | null,
};

export type DeleteSmartMeterMutation = {
  deleteSmartMeter:  {
    __typename: "SmartMeter",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    role: string | null,
    profile:  {
      __typename: "LoadProfile",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      meter:  {
        __typename: "SmartMeter",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        role: string | null,
        createdAt: string,
        updatedAt: string,
      },
      dataPoints: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateLoadProfileMutationVariables = {
  input: CreateLoadProfileInput,
  condition?: ModelLoadProfileConditionInput | null,
};

export type CreateLoadProfileMutation = {
  createLoadProfile:  {
    __typename: "LoadProfile",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    meter:  {
      __typename: "SmartMeter",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      role: string | null,
      profile:  {
        __typename: "LoadProfile",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        dataPoints: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    dataPoints: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLoadProfileMutationVariables = {
  input: UpdateLoadProfileInput,
  condition?: ModelLoadProfileConditionInput | null,
};

export type UpdateLoadProfileMutation = {
  updateLoadProfile:  {
    __typename: "LoadProfile",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    meter:  {
      __typename: "SmartMeter",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      role: string | null,
      profile:  {
        __typename: "LoadProfile",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        dataPoints: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    dataPoints: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLoadProfileMutationVariables = {
  input: DeleteLoadProfileInput,
  condition?: ModelLoadProfileConditionInput | null,
};

export type DeleteLoadProfileMutation = {
  deleteLoadProfile:  {
    __typename: "LoadProfile",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    meter:  {
      __typename: "SmartMeter",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      role: string | null,
      profile:  {
        __typename: "LoadProfile",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        dataPoints: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    dataPoints: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDataPointMutationVariables = {
  input: CreateDataPointInput,
  condition?: ModelDataPointConditionInput | null,
};

export type CreateDataPointMutation = {
  createDataPoint:  {
    __typename: "DataPoint",
    id: string,
    timestamp: string,
    time: string,
    hour: number,
    minutes: number,
    value: number,
    unit: DataPointUnit,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDataPointMutationVariables = {
  input: UpdateDataPointInput,
  condition?: ModelDataPointConditionInput | null,
};

export type UpdateDataPointMutation = {
  updateDataPoint:  {
    __typename: "DataPoint",
    id: string,
    timestamp: string,
    time: string,
    hour: number,
    minutes: number,
    value: number,
    unit: DataPointUnit,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDataPointMutationVariables = {
  input: DeleteDataPointInput,
  condition?: ModelDataPointConditionInput | null,
};

export type DeleteDataPointMutation = {
  deleteDataPoint:  {
    __typename: "DataPoint",
    id: string,
    timestamp: string,
    time: string,
    hour: number,
    minutes: number,
    value: number,
    unit: DataPointUnit,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetSmartMeterQueryVariables = {
  id: string,
};

export type GetSmartMeterQuery = {
  getSmartMeter:  {
    __typename: "SmartMeter",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    role: string | null,
    profile:  {
      __typename: "LoadProfile",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      meter:  {
        __typename: "SmartMeter",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        role: string | null,
        createdAt: string,
        updatedAt: string,
      },
      dataPoints: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSmartMetersQueryVariables = {
  filter?: ModelSmartMeterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSmartMetersQuery = {
  listSmartMeters:  {
    __typename: "ModelSmartMeterConnection",
    items:  Array< {
      __typename: "SmartMeter",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      role: string | null,
      profile:  {
        __typename: "LoadProfile",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        dataPoints: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetLoadProfileQueryVariables = {
  id: string,
};

export type GetLoadProfileQuery = {
  getLoadProfile:  {
    __typename: "LoadProfile",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    meter:  {
      __typename: "SmartMeter",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      role: string | null,
      profile:  {
        __typename: "LoadProfile",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        dataPoints: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    dataPoints: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLoadProfilesQueryVariables = {
  filter?: ModelLoadProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLoadProfilesQuery = {
  listLoadProfiles:  {
    __typename: "ModelLoadProfileConnection",
    items:  Array< {
      __typename: "LoadProfile",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      meter:  {
        __typename: "SmartMeter",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        role: string | null,
        createdAt: string,
        updatedAt: string,
      },
      dataPoints: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetDataPointQueryVariables = {
  id: string,
};

export type GetDataPointQuery = {
  getDataPoint:  {
    __typename: "DataPoint",
    id: string,
    timestamp: string,
    time: string,
    hour: number,
    minutes: number,
    value: number,
    unit: DataPointUnit,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDataPointsQueryVariables = {
  filter?: ModelDataPointFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDataPointsQuery = {
  listDataPoints:  {
    __typename: "ModelDataPointConnection",
    items:  Array< {
      __typename: "DataPoint",
      id: string,
      timestamp: string,
      time: string,
      hour: number,
      minutes: number,
      value: number,
      unit: DataPointUnit,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateSmartMeterSubscription = {
  onCreateSmartMeter:  {
    __typename: "SmartMeter",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    role: string | null,
    profile:  {
      __typename: "LoadProfile",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      meter:  {
        __typename: "SmartMeter",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        role: string | null,
        createdAt: string,
        updatedAt: string,
      },
      dataPoints: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSmartMeterSubscription = {
  onUpdateSmartMeter:  {
    __typename: "SmartMeter",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    role: string | null,
    profile:  {
      __typename: "LoadProfile",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      meter:  {
        __typename: "SmartMeter",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        role: string | null,
        createdAt: string,
        updatedAt: string,
      },
      dataPoints: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSmartMeterSubscription = {
  onDeleteSmartMeter:  {
    __typename: "SmartMeter",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    role: string | null,
    profile:  {
      __typename: "LoadProfile",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      meter:  {
        __typename: "SmartMeter",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        role: string | null,
        createdAt: string,
        updatedAt: string,
      },
      dataPoints: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateLoadProfileSubscription = {
  onCreateLoadProfile:  {
    __typename: "LoadProfile",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    meter:  {
      __typename: "SmartMeter",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      role: string | null,
      profile:  {
        __typename: "LoadProfile",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        dataPoints: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    dataPoints: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLoadProfileSubscription = {
  onUpdateLoadProfile:  {
    __typename: "LoadProfile",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    meter:  {
      __typename: "SmartMeter",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      role: string | null,
      profile:  {
        __typename: "LoadProfile",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        dataPoints: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    dataPoints: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLoadProfileSubscription = {
  onDeleteLoadProfile:  {
    __typename: "LoadProfile",
    id: string,
    name: string,
    description: string | null,
    unit: MeterUnit,
    type: MeterType,
    meter:  {
      __typename: "SmartMeter",
      id: string,
      name: string,
      description: string | null,
      unit: MeterUnit,
      type: MeterType,
      role: string | null,
      profile:  {
        __typename: "LoadProfile",
        id: string,
        name: string,
        description: string | null,
        unit: MeterUnit,
        type: MeterType,
        dataPoints: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    dataPoints: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateDataPointSubscription = {
  onCreateDataPoint:  {
    __typename: "DataPoint",
    id: string,
    timestamp: string,
    time: string,
    hour: number,
    minutes: number,
    value: number,
    unit: DataPointUnit,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDataPointSubscription = {
  onUpdateDataPoint:  {
    __typename: "DataPoint",
    id: string,
    timestamp: string,
    time: string,
    hour: number,
    minutes: number,
    value: number,
    unit: DataPointUnit,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDataPointSubscription = {
  onDeleteDataPoint:  {
    __typename: "DataPoint",
    id: string,
    timestamp: string,
    time: string,
    hour: number,
    minutes: number,
    value: number,
    unit: DataPointUnit,
    createdAt: string,
    updatedAt: string,
  } | null,
};
