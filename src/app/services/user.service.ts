import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, interval, of } from 'rxjs';
import { map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { getWeatherCodeInterpretation } from '../helpers/weather';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userCount = 10;
  private weatherApiUrl = 'https://api.open-meteo.com/v1/forecast?';
  private randomUserUrl = `https://randomuser.me/api/?results=${this.userCount}`;
  private refreshIntervalMs = 300000;
  savedUsersList$ = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http
      .get<any>(this.randomUserUrl)
      .pipe(map((response) => response.results));
  }

  getCurrentWeather(users: any[]): Observable<User[]> {
    const weatherRequests: Observable<User>[] = [];

    users.map((user) => {
      const { latitude, longitude } = user.location.coordinates;
      const weatherUrl = `${this.weatherApiUrl}latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`;
      const weatherRequest = this.http.get<any>(weatherUrl).pipe(
        map((weatherResponse) => {
          const weatherInterpretation = getWeatherCodeInterpretation(
            weatherResponse.current_weather.weathercode
          );
          return {
            name: `${user.name.title}. ${user.name.first} ${user.name.last}`,
            email: user.email,
            gender: user.gender,
            profileImage: user.picture.thumbnail,
            location: {
              coordinates: user.location.coordinates,
              address: `${user.location.city}, ${user.location.state}`,
              country: user.location.country,
            },
            weather: {
              icon: weatherInterpretation.icon,
              description: weatherInterpretation.description,
              temperature: weatherResponse.current_weather.temperature,
              temperatureUnit: weatherResponse.hourly_units.temperature_2m,
            },
          };
        })
      );
      weatherRequests.push(weatherRequest);
    });
    return forkJoin(weatherRequests);
  }

  getUsersData(): Observable<User[]> {
    return this.getUsers().pipe(
      switchMap((users) =>
        interval(this.refreshIntervalMs).pipe(
          startWith(0),
          switchMap(() => this.getCurrentWeather(users))
        )
      )
    );
  }

  getHourlyWeather(user: User): Observable<any> {
    const { latitude, longitude } = user?.location?.coordinates || {};
    const weatherUrl = `${this.weatherApiUrl}latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation`;

    return this.http.get<any>(weatherUrl).pipe(map((response) => response));
  }

  getSavedUsers() {
    const usersList = localStorage.getItem('savedUsers');
    if (usersList) {
      const parsedUsers = JSON.parse(usersList);

      this.savedUsersList$.next(parsedUsers);
    }
  }
}
