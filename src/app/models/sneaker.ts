export class Sneaker {
  name: string;
  price: string;
  link: string;
  imgSrc: string;
  brand: string;
  sizes: string[];

  constructor(
    name: string,
    price: string,
    link: string,
    imgSrc: string,
    brand: string,
    sizes: string[]
  ) {
    this.name = name;
    this.price = price;
    this.link = link;
    this.imgSrc = imgSrc;
    this.brand = brand;
    this.sizes = sizes;
  }
}
