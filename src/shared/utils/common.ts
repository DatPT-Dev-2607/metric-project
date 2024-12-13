import { DistanceUnit } from '@shared/constants';
import {
  conversionToMeter,
  temperatureConversion,
  temperatureFromCelsius,
  TemperatureSymbol,
} from '@shared/constants/common';

export function convertDistance(
  value: number,
  fromUnit: DistanceUnit,
  toUnit: DistanceUnit,
) {
  // Convert fromUnit to meter
  const valueInMeters = value * conversionToMeter[fromUnit];

  // Convert meter to toUnit
  return valueInMeters / conversionToMeter[toUnit];
}

export function convertTemperature(
  value: number,
  fromUnit: TemperatureSymbol,
  toUnit: TemperatureSymbol,
) {
  // Convert fromUnit to Celsius
  const valueInCelsius = temperatureConversion[fromUnit](value);

  // Convert Celsius to toUnit
  return temperatureFromCelsius[toUnit](valueInCelsius);
}
