import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {
  product: any;
  bigImage:any;
  errMsg: string = '';
  getId: string = '';
  quantity: number = 0;
  slides = [
    { img: 'https://via.placeholder.com/600.png/09f/fff' },
    { img: 'https://via.placeholder.com/600.png/021/fff' },
    { img: 'https://via.placeholder.com/600.png/321/fff' },
    { img: 'https://via.placeholder.com/600.png/422/fff' },
    { img: 'https://via.placeholder.com/600.png/654/fff' },
  ];
  slideConfig2 = { 
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          // // dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // dots: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // dots: true,
        },
      },
    ],
    arrows:false, // 2 cái nút previous và next!
    vertical:true,
   };
   addSlide() {
    this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }
  constructor(private _service: ProductsService, private _activatedRoute: ActivatedRoute, private cartService : CartService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      (param) => {
        let id = param.get('id');
        if (id != null) {
          this.getId = id;
        }
      }
    )
    this.getProduct(this.getId)
  }
  getProduct(id: any) {
    this._service.getProductsById(id).subscribe(
      {
        next: (data) => this.product = data,
        error: (err) => this.errMsg = err.message
      })



  }
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
  showImg(itemx:any){
    this.bigImage=itemx;
  }

  plus()
  {
   this.quantity = this.quantity+1;
  }
  minus()
  {
    if(this.quantity != 0)
  {
   this.quantity = this.quantity-1;
  }
}
}
