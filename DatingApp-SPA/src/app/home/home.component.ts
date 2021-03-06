import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isRegisterMode = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onCancelClicked() {
    this.isRegisterMode = false;
  }

  onRegister() {
    this.isRegisterMode = true;
  }
}
