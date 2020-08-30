// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MeterUnit = {
  "K_W": "kW",
  "K_WH": "kWh",
  "M3": "m3",
  "CELSIUS": "celsius"
};

const MeterType = {
  "ELECTRICITY": "ELECTRICITY",
  "WATER": "WATER",
  "GAS": "GAS",
  "TEMPERATURE": "TEMPERATURE"
};

const DataPointUnit = {
  "K_W": "kW",
  "K_WH": "kWh",
  "M3": "m3",
  "CELSIUS": "celsius"
};

const { SmartMeter, LoadProfile, DataPoint } = initSchema(schema);

export {
  SmartMeter,
  LoadProfile,
  DataPoint,
  MeterUnit,
  MeterType,
  DataPointUnit
};