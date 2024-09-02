import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Product } from '../models/Product';

@Injectable({ providedIn: 'root' })
export class ProductService implements OnInit {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }
    ngOnInit(): void {
    }
    
    getAll() {
        return this.http.get<Product[]>(`${environment.apiUrl}/products`);

    }

}