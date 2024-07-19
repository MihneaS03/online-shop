import { Injectable } from '@nestjs/common';
import { Product } from '../domain/product.domain';
import { ProductDTO } from '../dto/product.dto';
import { ProductCategory } from '../domain/product-category.domain';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';

@Injectable()
export class ProductMapper {
  mapProductToProductDTO(product: Product): ProductDTO {
    return new ProductDTO(
      product.name,
      product.description,
      product.price,
      product.weight,
      product.supplier,
      product.imageUrl,
      product.category.id,
    );
  }

  mapProductDTOToProduct(
    productDTO: ProductDTO,
    productCategory: ProductCategory,
  ): Product {
    return new Product(
      productDTO.name,
      productDTO.description,
      productDTO.price,
      productDTO.weight,
      productDTO.supplier,
      productDTO.imageUrl,
      productCategory,
    );
  }

  mapProductToCreateProductDTO(product: Product): CreateProductDTO {
    return new CreateProductDTO(
      product.name,
      product.description,
      product.price,
      product.weight,
      product.supplier,
      product.imageUrl,
      product.category.id,
    );
  }

  mapCreateProductDTOToProduct(
    createProductDTO: CreateProductDTO,
    productCategory: ProductCategory,
  ): Product {
    return new Product(
      createProductDTO.name,
      createProductDTO.description,
      createProductDTO.price,
      createProductDTO.weight,
      createProductDTO.supplier,
      createProductDTO.imageUrl,
      productCategory,
    );
  }

  mapProductToUpdateProductDTO(product: Product): UpdateProductDTO {
    return new UpdateProductDTO(
      product.name,
      product.description,
      product.price,
      product.weight,
      product.supplier,
      product.imageUrl,
      product.category.id,
    );
  }

  mapUpdateProductDTOToProduct(
    updateProductDTO: UpdateProductDTO,
    productCategory: ProductCategory,
  ): Product {
    return new Product(
      updateProductDTO.name,
      updateProductDTO.description,
      updateProductDTO.price,
      updateProductDTO.weight,
      updateProductDTO.supplier,
      updateProductDTO.imageUrl,
      productCategory,
    );
  }
}