import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private formModule: FormsModule) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('/dashboard');
  }


}
