import { Component, OnInit, Provider } from '@angular/core';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any;
  errorMs: any = [];
  public vendorList: any;

  constructor(
    private productData: ProductsDataService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    productData.products().subscribe((data: any) => {
      console.log('products', data);
      this.products = data;

      for (let i = 0; i < data.length; i++) {
        this.http
          .get(
            'http://localhost:5002/vendor/getBestVendor/' + data[i].id + '/1'
          )
          .pipe(catchError(this.errorHandle))
          .subscribe(
            (result: any) => {},
            (error) => {
              console.log('+++', data[i].id);
              this.errorMs.push(data[i].id);
            }
          );
      }
    });
  }

  errorHandle(error: HttpErrorResponse) {
    console.log('==========', error);
    return throwError(error.error.message || 'Server Error');
  }

  form = new FormGroup({});

  wishform = new FormGroup({});

  ngOnInit(): void {}

  getData(data: any) {
    this.form = this.formBuilder.group({
      productId: data.productId,
      customerId: localStorage.getItem('customerId'),
      zipcode: data.zipcode,
      quantity: data.quantity,
    });
    this.http
      .post(
        'http://localhost:5001/cart/addProductToCart',
        this.form.getRawValue(),
        {
          withCredentials: true,
        }
      )
      .subscribe((res: any) => {
        this.router.navigate(['/cart']);
        alert(res.message);
      });
    console.log(this.errorMs);
  }

  wishData(data: any) {
    this.wishform = this.formBuilder.group({
      productId: data.productId,
      customerId: localStorage.getItem('customerId'),
      quantity: data.quantity,
    });
    console.log(this.wishform);
    this.http
      .post(
        'http://localhost:5001/cart/addToCustomerWishlist',
        this.wishform.getRawValue(),
        {
          withCredentials: true,
        }
      )
      .subscribe((res: any) => {
        this.router.navigate(['/wishlist']);
        alert(res.message);
      });
  }
}
