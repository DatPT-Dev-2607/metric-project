import { TemperatureUnit } from '.';

export const conversionToMeter = {
  meter: 1,
  centimeter: 0.01,
  inch: 0.0254,
  feet: 0.3048,
  yard: 0.9144,
};
export type TemperatureSymbol = '°C' | '°F' | '°K';

export const temperatureConversion = {
  '°C': (value: number) => value,
  '°F': (value: number) => ((value - 32) * 5) / 9, // Fahrenheit -> Celsius
  '°K': (value: number) => value - 273.15, // Kelvin -> Celsius
};

export const temperatureFromCelsius = {
  '°C': (value: number) => value, // Celsius -> Celsius
  '°F': (value: number) => (value * 9) / 5 + 32, // Celsius -> Fahrenheit
  '°K': (value: number) => value + 273.15, // Celsius -> Kelvin
};

export const temperatureUnitMap: Record<TemperatureUnit, TemperatureSymbol> = {
  [TemperatureUnit.C]: '°C',
  [TemperatureUnit.F]: '°F',
  [TemperatureUnit.K]: '°K',
};

export const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
