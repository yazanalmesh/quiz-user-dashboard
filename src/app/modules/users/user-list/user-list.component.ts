import { Component } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { UserDetails, UsersData } from '../../../models/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userDetails!: UserDetails;
  snackBarRef: any;
  totalUsers !: number ; 
  pageSize ! : number;
  users !: UserDetails [];

  
  
  constructor(private searchService: SearchService, private userDetailsService : UserService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.initializeSubscriptions();
    this.fetchUsersPage(1);


  }

  initializeSubscriptions() {
    this.searchService.searchTerm$.subscribe(searchTerm => {
      this.searchTheUserDetails(searchTerm);
      console.log("insidengoint" + searchTerm);
    });
  }
  
  fetchUsersPage(pageNumber: number) {
    this.getAllUsersData(pageNumber);
    console.log("does details exist", this.userDetails);
  }
  getAllUsersData(pageNumber: number) {
    this.userDetailsService.getUsers(pageNumber).subscribe({
      next: (users: UsersData) => {
        this.users = users.data;
        this.totalUsers = users.total;
        this.pageSize = users.per_page;
        this.userDetails = {} as UserDetails;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
      complete: () => {
        console.log('User data fetched successfully.');
      }
    });
  }
  

  searchTheUserDetails(searchTerm: string) {
    console.log("Search term: " + searchTerm);
    if (searchTerm.trim() !== '') {
      this.userDetailsService.getUserById(searchTerm).subscribe({
        next: (response) => {
          this.userDetails = response.data;
          this.users = [];  
          if (this.snackBarRef) {
            this.snackBarRef.dismiss();  
          }
          console.log(this.userDetails);
        },
        error: () => {
          this.userDetails = {} as UserDetails;  
          this.users = [];  
          this.showErrorMessage('User ID does not exist. Please enter a valid ID');
        }
      });
    } else {
      this.getAllUsersData(1);
    }
  }
  

  showErrorMessage(message: string) {
    this.snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 0,
    });
    this.snackBarRef
      .onAction()
      .pipe(take(1))
      .subscribe(() => {
        this.snackBarRef.dismiss();
      });
  }

  onPageChange(event: any) {
    console.log(event.pageIndex + 1 + "index");
    this.getAllUsersData(event.pageIndex + 1);
  }

  navigateToUserDetails(userId: number){
    this.router.navigate(['/users/user-details', userId]);
  }

 
}

