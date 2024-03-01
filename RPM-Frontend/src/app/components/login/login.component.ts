import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  errors: any;

  submit(): void {
    this.http
      .post('http://localhost:9999/authenticate', this.form.getRawValue(), {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', JSON.stringify(res.jwttoken));
          localStorage.setItem('customerId', JSON.stringify(res.customerId));
          this.router.navigate(['/products']);
        },
        (error) => {
          this.errors = 'Username or password is incorrect.';
          console.log('issue');
        },
        () => {
          // No errors, route to new page
        }
      );
  }
}
