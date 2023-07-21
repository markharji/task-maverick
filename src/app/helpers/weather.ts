import { weatherInterpretationDto } from '../models/weather';

export function getWeatherCodeInterpretation(
  code: number
): weatherInterpretationDto {
  switch (code) {
    case 0:
      return {
        description: 'Clear sky',
        icon: 'https://worldweather.wmo.int/images/21a.png',
      };
    case 1:
      return {
        description: 'Mainly clear',
        icon: 'https://worldweather.wmo.int/images/21a.png',
      };
    case 2:
      return {
        description: 'Partly cloudy',
        icon: 'https://worldweather.wmo.int/images/22a.png',
      };
    case 3:
      return {
        description: 'Overcast',
        icon: 'https://worldweather.wmo.int/images/20.png',
      };
    case 45:
      return {
        description: 'Foggy',
        icon: 'https://worldweather.wmo.int/images/16.png',
      };
    case 48:
      return {
        description: 'Depositing rime fog',
        icon: 'https://worldweather.wmo.int/images/16.png',
      };
    case 51:
      return {
        description: 'Drizzle: Light',
        icon: 'https://worldweather.wmo.int/images/15.png',
      };
    case 53:
      return {
        description: 'Drizzle: moderate',
        icon: 'https://worldweather.wmo.int/images/15.png',
      };
    case 55:
      return {
        description: 'Drizzle: dense intensity',
        icon: 'https://worldweather.wmo.int/images/15.png',
      };
    case 56:
      return {
        description: 'Freezing Drizzle: Light',
        icon: 'https://worldweather.wmo.int/images/15.png',
      };
    case 57:
      return {
        description: 'Freezing Drizzle: dense intensity',
        icon: 'https://worldweather.wmo.int/images/15.png',
      };
    case 61:
      return {
        description: 'Rain: Slight',
        icon: 'https://worldweather.wmo.int/images/14.png',
      };
    case 63:
      return {
        description: 'Rain: Moderate',
        icon: 'https://worldweather.wmo.int/images/14.png',
      };
    case 65:
      return {
        description: 'Rain: Intensity',
        icon: 'https://worldweather.wmo.int/images/13.png',
      };
    case 66:
      return {
        description: 'Freezing Rain: Light',
        icon: 'https://worldweather.wmo.int/images/13.png',
      };
    case 67:
      return {
        description: 'Freezing Rain: Heavy intensity',
        icon: 'https://worldweather.wmo.int/images/13.png',
      };
    case 71:
      return {
        description: 'Snow fall: Slight',
        icon: 'https://worldweather.wmo.int/images/6.png',
      };
    case 73:
      return {
        description: 'Snow fall: Moderate',
        icon: 'https://worldweather.wmo.int/images/6.png',
      };
    case 75:
      return {
        description: 'Snow fall: Heavy intensity',
        icon: 'https://worldweather.wmo.int/images/6.png',
      };
    case 77:
      return {
        description: 'Snow grains',
        icon: 'https://worldweather.wmo.int/images/5.png',
      };
    case 80:
      return {
        description: 'Rain showers: Slight',
        icon: 'https://worldweather.wmo.int/images/9.png',
      };
    case 81:
      return {
        description: 'Rain showers: Moderate',
        icon: 'https://worldweather.wmo.int/images/9.png',
      };
    case 82:
      return {
        description: 'Rain showers: Violent',
        icon: 'https://worldweather.wmo.int/images/9.png',
      };
    case 85:
      return {
        description: 'Snow showers slight',
        icon: 'https://worldweather.wmo.int/images/5.png',
      };
    case 86:
      return {
        description: 'Snow showers heavy',
        icon: 'https://worldweather.wmo.int/images/5.png',
      };
    case 95:
      return {
        description: 'Thunderstorm: Slight or moderate',
        icon: 'https://worldweather.wmo.int/images/2.png',
      };
    case 96:
      return {
        description: 'Thunderstorm with slight hail',
        icon: 'https://worldweather.wmo.int/images/2.png',
      };
    case 99:
      return {
        description: 'Thunderstorm with heavy hail',
        icon: 'https://worldweather.wmo.int/images/2.png',
      };
  }

  return {
    description: 'Unknown',
    icon: '',
  };
}
