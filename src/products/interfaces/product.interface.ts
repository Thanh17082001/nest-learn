import { Document } from 'mongoose';

export interface ProductInterface extends Document {
    BrandId: string;
    categoryId: string,
    typeId: string,
    name: string,
    images: Array<string>,
    description: string,
    priceImport: number,
    priceSale: number,
    quantityImport: number,
    quantitySale:number
}
