import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() user: User = {} as User;
  @Input() isActive: boolean = false;
  @Input() isSavedUsers: boolean = false;

  buttonLabel$ = new BehaviorSubject<string>('Save user');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.checkIfUserAlreadySaved() === -1) {
      this.buttonLabel$.next('Save user');
    } else {
      this.buttonLabel$.next('Saved');
    }
  }

  saveToLocalStorage() {
    const usersList = localStorage.getItem('savedUsers');

    if (usersList) {
      const parsedUsers = JSON.parse(usersList);
      if (this.checkIfUserAlreadySaved() === -1) {
        parsedUsers.push(this.user);
        const usersString = JSON.stringify(parsedUsers);
        localStorage.setItem('savedUsers', usersString);
      }
    } else {
      const userString = JSON.stringify([this.user]);
      localStorage.setItem('savedUsers', userString);
    }

    this.buttonLabel$.next('Saved');
    this.userService.getSavedUsers();
  }

  checkIfUserAlreadySaved() {
    const usersList = localStorage.getItem('savedUsers');
    if (usersList) {
      const parsedUsers = JSON.parse(usersList);
      return parsedUsers.findIndex(
        (user: User) => user.email === this.user.email
      );
    }

    return -1;
  }
}
