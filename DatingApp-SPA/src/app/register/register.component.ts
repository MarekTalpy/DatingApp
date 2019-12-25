import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Output() cancelClicked = new EventEmitter<void>();

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  onRegister() {
    this.authService.register(this.model).subscribe(resp => {
      this.alertify.success('user was successfully registered');
    }, error => {
      this.alertify.error(error);
    });
  }

  onCancel() {
    this.cancelClicked.emit();
  }

}
