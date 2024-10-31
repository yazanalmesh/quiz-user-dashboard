import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatInputModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dashboardTitle = 'Maids User Dashboard';
  searchTerm : string = '';

  constructor(private searchService: SearchService, private router: Router) {
  }
  
  searchUsers(){
    this.searchService.setSearchTerm(this.searchTerm);
    this.navigateToDashboard();
  }

  navigateToDashboard(){
    this.router.navigate(['/users']);
  }

}
