import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum MeterUnit {
  K_W = "kW",
  K_WH = "kWh",
  M3 = "m3",
  CELSIUS = "celsius"
}

export enum MeterType {
  ELECTRICITY = "ELECTRICITY",
  WATER = "WATER",
  GAS = "GAS",
  TEMPERATURE = "TEMPERATURE"
}

export enum DataPointUnit {
  K_W = "kW",
  K_WH = "kWh",
  M3 = "m3",
  CELSIUS = "celsius"
}



export declare class SmartMeter {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly unit: MeterUnit | keyof typeof MeterUnit;
  readonly type: MeterType | keyof typeof MeterType;
  readonly profile?: LoadProfile;
  constructor(init: ModelInit<SmartMeter>);
  static copyOf(source: SmartMeter, mutator: (draft: MutableModel<SmartMeter>) => MutableModel<SmartMeter> | void): SmartMeter;
}

export declare class LoadProfile {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly unit: MeterUnit | keyof typeof MeterUnit;
  readonly type: MeterType | keyof typeof MeterType;
  readonly meter: SmartMeter;
  readonly dataPoints?: string;
  constructor(init: ModelInit<LoadProfile>);
  static copyOf(source: LoadProfile, mutator: (draft: MutableModel<LoadProfile>) => MutableModel<LoadProfile> | void): LoadProfile;
}

export declare class DataPoint {
  readonly id: string;
  readonly timestamp: string;
  readonly time: string;
  readonly hour: number;
  readonly minutes: number;
  readonly value: number;
  readonly unit: DataPointUnit | keyof typeof DataPointUnit;
  constructor(init: ModelInit<DataPoint>);
  static copyOf(source: DataPoint, mutator: (draft: MutableModel<DataPoint>) => MutableModel<DataPoint> | void): DataPoint;
}