import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Res, UseInterceptors, UploadedFile, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiBody, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import {  Types } from "mongoose";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("products")
@ApiTags("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("create")
  @UseInterceptors(FileInterceptor("file"))
  @ApiBody({
    type: CreateProductDto,
    examples: {
      data: {
        value: {
          brandId: "",
          categoryId: "",
          typeId: "",
          name: "",
          image: "",
          description: "",
        } as unknown as CreateProductDto,
      },
    },
  })
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: false }))
  async create(@Body() data: CreateProductDto, @Res() res: Response, @UploadedFile() file: Express.Multer.File) {
    try {
      const exitsProduct = await this.productsService.findOne({ name: data.name });
      if (!!exitsProduct) {
        return res.status(409).json({ statusCode: 409, mes: "product already exists" });
      }
      data.image = {
        file: file.buffer,
        contentType: file.mimetype,
      };
      const product = await this.productsService.create(data);
      return res.status(201).json({
        mes: "Create successfully",
        // product
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  @Get()
  @ApiQuery({
    name: "pageNumber",
    type: "number",
    required: false,
  })
  @ApiQuery({
    name: "limit",
    type: "number",
    required: false,
  })
  async findAll(@Res() res: Response, @Query() query: any): Promise<Response> {
    try {
      const { pageNumber, limit } = query;
      const products = await this.productsService.findAll(pageNumber, limit);
      return res.status(200).json({
        statusCode: 200,
        products,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    type: "string",
    required: true,
  })
  async findOne(@Param("id") id: Types.ObjectId, @Res() res: Response): Promise<Response> {
    try {
      const product = await this.productsService.findOne({ _id: id });
      if (!!!product) {
        return res.status(404).json({
          statusCode: 404,
          mes: "product not found",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        product,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("file"))
  @ApiParam({
    name: "id",
    type: "string",
    required: true,
  })
  async update(@Param("id") id: Types.ObjectId, @Body() data: UpdateProductDto, @Res() res: Response, @UploadedFile() file: Express.Multer.File): Promise<Response> {
    try {
      const type = await this.productsService.findOne({ _id: id });
      if (!!!type) {
        return res.status(404).json({
          statusCode: 404,
          mes: "product not found",
        });
      }
      data.image = {
        file: file.buffer,
        contentType: file.mimetype,
      };
      const updated = await this.productsService.update(id, data);
      return res.status(200).json({
        mes: "Update successfully",
        data: updated,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    type: "string",
    required: true,
  })
  async remove(@Param("id") id: Types.ObjectId, @Res() res: Response): Promise<Response> {
    try {
      const type = await this.productsService.findOne({ _id: id });
      if (!!!type) {
        return res.status(404).json({
          statusCode: 404,
          mes: "product not found",
        });
      }

      await this.productsService.remove(id);
      return res.status(200).json({
        statusCode: 200,
        mes: "Delete successfully",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
