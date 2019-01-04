import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {ProductService} from "../shared/services/product.service";
import {JwtResponse} from "../shared/response/JwtResponse";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CategoryType} from "../shared/models/CategoryType";
import {ProductStatus} from "../shared/models/ProductStatus";

@Component({
    selector: 'app-product.list',
    templateUrl: './product.list.component.html',
    styleUrls: ['./product.list.component.css']
})
export class ProductListComponent implements OnInit {

    constructor(private userService: UserService,
                private productService: ProductService,
                private route: ActivatedRoute) {
    }

    currentUser: JwtResponse;
    page: any;
    CategoryType = CategoryType;
    ProductStatus = ProductStatus;
    private querySub: Subscription;

    ngOnInit() {
        this.querySub = this.route.queryParams.subscribe(() => {
            this.update();
        });
    }

    ngOnDestroy(): void {
        this.querySub.unsubscribe();
    }

    update() {
        if (this.route.snapshot.queryParamMap.get('page')) {
            const currentPage = +this.route.snapshot.queryParamMap.get('page');
            const size = +this.route.snapshot.queryParamMap.get('size');
            this.getProds(currentPage, size);
        } else {
            this.getProds();
        }
    }

    getProds(page: number = 1, size: number = 5) {
        this.productService.getAllInPage(+page, +size)
            .subscribe(page => {
                this.page = page;
            });

    }

    edit(productInfo) {

    }

    remove(productInfos, productInfo) {

    }


}