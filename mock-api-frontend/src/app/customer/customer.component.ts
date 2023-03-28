import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  backendUrl = 'http://localhost:3000/customer';
  customers = [];

  firstName: String = '';
  lastName: String = '';
  address: String = '';
  pinCode: String = '';
  numberOfOrders: Number = 0;

  constructor(private http: HttpClient) {
    this.getCustomers();
  }
  getCustomers() {
    this.http
      .get<any>(this.backendUrl)
      .toPromise()
      .then((response) => {
        this.customers = response['customers'];
        console.log(this.customers);
      });
  }
  onSubmit() {
    let body = {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      pinCode: this.pinCode,
      numberOfOrders: this.numberOfOrders,
    };
    this.http
      .post(this.backendUrl, body)
      .toPromise()
      .then((response) => {
        this.getCustomers()
      });
  }

  ngOnInit(): void {}
}
