import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterOutlet,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  user: User | null;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
  ngOnInit(): void {
    this.accountService.user.subscribe((user) =>{
      console.log(user);
      this.user = user;
    });
  }
  
  logout()
  {
    this.accountService.logout();
  }
}
