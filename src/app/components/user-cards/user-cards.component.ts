import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.scss'],
})
export class UserCardsComponent implements OnInit, OnDestroy {
  users$ = new BehaviorSubject<User[]>([]);
  savedUsers$ = new BehaviorSubject<User[]>([]);
  private subscription: Subscription | undefined;
  userToMap$ = new BehaviorSubject<any>({});

  active = 1;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.getUsersData().subscribe(
      (users) => {
        this.users$.next(users);
        this.userToMap$.next(users[0]);
      },
      (error) => {
        console.error('Error fetching users and weather data:', error);
      }
    );
    this.userService.getSavedUsers();

    this.userService.savedUsersList$.subscribe((users: User[]) => {
      this.savedUsers$.next(users);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  userToMap(user: User) {
    this.userToMap$.next(user);
  }

  onNavChange(e: any) {
    if (e.nextId === 2) {
      this.userToMap(this.savedUsers$.getValue()[0] || null);
    }

    if (e.nextId === 1) {
      this.userToMap(this.users$.getValue()[0]);
    }
  }

  // updateSavedUsersList() {
  //   this.userService.getSavedUsers().subscribe((users: User[]) => {
  //     console.log(users);
  //     this.savedUsers$.next(users);
  //   });
  // }
}
