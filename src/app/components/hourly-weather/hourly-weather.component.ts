import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.scss'],
})
export class HourlyWeatherComponent implements OnChanges, OnInit {
  @Input() user: User = {} as User;
  myChart: Chart | undefined;

  constructor(private userService: UserService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.myChart?.destroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.myChart) this.myChart.destroy();

    if (this.user?.email) {
      this.userService.getHourlyWeather(this.user).subscribe((val) => {
        const tempData: any[] = [];

        Object.keys(val.hourly).map((label: string) => {
          const temp = {
            data: val.hourly[label].slice(0, 48),
            label,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          };

          tempData.push(temp);
        });

        this.renderChart(tempData);
      });
    }
  }

  renderChart(datasets: any) {
    const labels = datasets.filter((val: any) => val.label === 'time');
    const dataFinal = datasets.filter((val: any) => val.label !== 'time');
    this.myChart = new Chart('hourlyChart', {
      type: 'line',
      data: {
        labels: labels[0].data,
        datasets: dataFinal,
      },
    });
  }
}
