import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from "express";

@Controller("categories")
@ApiTags("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //create category of product
  @Post("create")
  @ApiBody({
    type: CreateCategoryDto,
    examples: {
      data: {
        value: {
          name: "",
          description: "",
        } as CreateCategoryDto,
      },
    },
  })
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: false }))
  async create(@Body() data: CreateCategoryDto, @Res() res: Response) {
    try {
      const exitsBrand = await this.categoriesService.findOne({ name: data.name });
      if (!!exitsBrand) {
        return res.status(409).json({ statusCode: 409, mes: "category already exists" });
      }
      const category = await this.categoriesService.create(data);
      return res.status(201).json({
        mes: "Create successfully",
        category,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //get all category of product
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
  async getAll(@Res() res: Response, @Query() query: any): Promise<Response> {
    try {
      const { pageNumber, limit } = query;
      const brands = await this.categoriesService.findAll(pageNumber, limit);
      return res.status(200).json({
        statusCode: 200,
        brands,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // get by id category of product (param /{id})
  @Get(":id")
  @ApiParam({
    name: "id",
    type: "string",
    required: true,
  })
  async findOne(@Param("id") id: string, @Res() res: Response): Promise<Response> {
    try {
      const category = await this.categoriesService.findOne({ _id: id });
      if (!!!category) {
        return res.status(404).json({
          statusCode: 404,
          mes: "category not found",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        category,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //Update category by id (param /id)
  @Patch("update/:id")
  @ApiParam({
    name: "id",
    type: "string",
    required: true,
  })
  @ApiBody({
    type: UpdateCategoryDto,
    examples: {
      data: {
        value: {
          name: "",
          description: "",
        } as UpdateCategoryDto,
      },
    },
  })
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: false }))
  async update(@Param("id") id: string, @Body() data: UpdateCategoryDto, @Res() res: Response): Promise<Response> {
    try {
      const category = await this.categoriesService.findOne({ _id: id });
      if (!!!category) {
        return res.status(404).json({
          statusCode: 404,
          mes: "category not found",
        });
      }
      const updated = await this.categoriesService.update(id, data);
      return res.status(200).json({
        mes: "Update successfully",
        data: updated,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //delete category of product by id (param /{id})
  @Delete("delete/:id")
  @ApiParam({
    name: "id",
    type: "string",
    required: true,
  })
  async remove(@Param("id") id: string, @Res() res: Response): Promise<Response> {
    try {
      const category = await this.categoriesService.findOne({ _id: id });
      if (!!!category) {
        return res.status(404).json({
          statusCode: 404,
          mes: "category not found",
        });
      }

      await this.categoriesService.remove(id);
      return res.status(200).json({
        statusCode: 200,
        mes: "Delete successfully",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
