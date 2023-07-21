import { LocationDto } from './location';
import { WeatherDto } from './weather';

export interface User {
  name: string;
  gender: string;
  profileImage: string;
  location: LocationDto;
  email: string;
  weather: WeatherDto;
}
