import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  routeparam: any;
  product: any;
  products: any;
  productsdesc: any = [];
  errorMs: any = [];
  search: String = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private productData: ProductsDataService,
    private router: Router
  ) {
    productData.products().subscribe((data: any) => {
      console.log('Data', data);
      this.products = data;
    });
  }

  errorHandle(error: HttpErrorResponse) {
    console.log('==========', error);
    return throwError(error.error.message || 'Server Error');
  }

  form = new FormGroup({});

  wishform = new FormGroup({});

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

  url = 'http://localhost:5000/product/searchProductByName/';

  ngOnInit() {
    // subscribe to router event
    this.route.params.subscribe((params: any) => {
      this.routeparam =
        params.searchTerm.charAt(0).toUpperCase() +
        params.searchTerm.substr(1).toLowerCase();
    });

    this.http.get(this.url + this.routeparam).subscribe((data: any) => {
      console.log('searchData', data);

      this.http
        .get('http://localhost:5002/vendor/getBestVendor/' + data.id + '/1')
        .pipe(catchError(this.errorHandle))
        .subscribe(
          (result: any) => {},
          (error) => {
            console.log('+++', data.id);
            this.errorMs.push(data.id);
          }
        );

      let dataToArray = data.description
        .split(',')
        .map((item: string) => item.trim());

      this.productsdesc = dataToArray;
      console.log(this.productsdesc);
      this.product = data;
    });

    // console.log('search local', this.product.toLocalString());
  }

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
  }
}
