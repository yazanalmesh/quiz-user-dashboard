import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  userId!: number;
  userDetails!: UserDetails;
  snackBarRef: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchRouteParams();
  }

  fetchRouteParams() {
    this.route.params.subscribe(params => {
      const userIdParam = params['id'];
      this.userId = typeof userIdParam === 'string' ? +userIdParam : userIdParam;
      this.fetchUserDetails();
    });
  }

  fetchUserDetails() {
    this.userService.getUserById(this.userId.toString()).subscribe(
      (response) => {
        if (response && response.data) {
          this.userDetails = response.data;
        } else {
          this.showErrorMessage('User not found');
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
        this.showErrorMessage('Failed to fetch user details');
      }
    );
  }

  showErrorMessage(message: string) {
    this.snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 0,
    });
    this.snackBarRef.onAction().pipe(take(1)).subscribe(() => {
      this.snackBarRef.dismiss();
    });
  }

  goBackToDashboard() {
    this.router.navigate(['/users']);
  }


}
