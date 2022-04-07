import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;

  error = '';



  myform: any;
  constructor(private fb: FormBuilder,
    private loginservice: LoginService,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.myform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    })
  }

  get f() {
    return this.myform.controls;
  }



  onSubmit(formDirective: FormGroupDirective): void {
    console.log(this.myform.value)
    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.myform.invalid) {
    //   return;
    // }



    this.loginservice.loginuser(this.myform.value).subscribe
      ({
        next: (result: any) => {
          console.log(result);
          const id = result.user._id;
          // localStorage.setItem('token', result.accessToken)
         this.loginservice.setRoles(result.user.roles)
         this.loginservice.setToken(result.accessToken)
          if (result.user.roles == "admin") {
            this.router.navigate(['/home', id])
          } else {
            this.router.navigate(['/view-product-list', id])
          }
          Swal.fire({
            title: 'Login!',
            text: 'Login successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        },
        error: (e: any) => {
          Swal.fire({
            title: 'Login!',
            text: 'Please enter a valid email ',
          });
        },
        complete: () => { }
      })
  }
}
