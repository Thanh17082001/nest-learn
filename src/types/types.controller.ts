import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Res, Query } from "@nestjs/common";
import { TypesService } from "./types.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { ApiBody, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@Controller("types")
@ApiTags("types")
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  //create type of product
  @Post("create")
  @ApiBody({
    type: CreateTypeDto,
    examples: {
      data: {
        value: {
          name: "",
          description: "",
        } as CreateTypeDto,
      },
    },
  })
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: false }))
  async create(@Body() data: CreateTypeDto, @Res() res: Response) {
    try {
      const exitsBrand = await this.typesService.findOne({ name: data.name });
      if (!!exitsBrand) {
        return res.status(409).json({ statusCode: 409, mes: "type already exists" });
      }
      const type = await this.typesService.create(data);
      console.log(type);
      return res.status(201).json({
        mes: "Create successfully",
        type,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }


  //get all type of product
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
      const brands = await this.typesService.findAll(pageNumber, limit);
      return res.status(200).json({
        statusCode: 200,
        brands,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }


  // get by id type of product (param /{id})
  @Get(":id")
  @ApiParam({
    name: "id",
    type: "string",
    required: true,
  })
  async findOne(@Param("id") id: string, @Res() res: Response): Promise<Response> {
    try {
      const type = await this.typesService.findOne({ _id: id });
      if (!!!type) {
        return res.status(404).json({
          statusCode: 404,
          mes: "type not found",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        type,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //Update type by id (param /id)
  @Patch("update/:id")
  @ApiParam({
    name: "id",
    type: "string",
    required: true,
  })
  @ApiBody({
    type: UpdateTypeDto,
    examples: {
      data: {
        value: {
          name: "",
          description: "",
        } as UpdateTypeDto,
      },
    },
  })
  @UsePipes(new ValidationPipe({ transform: true, disableErrorMessages: false }))
  async update(@Param("id") id: string, @Body() data: UpdateTypeDto, @Res() res: Response): Promise<Response> {
    try {
      const type = await this.typesService.findOne({ _id: id });
      if (!!!type) {
        return res.status(404).json({
          statusCode: 404,
          mes: "type not found",
        });
      }
      const updated = await this.typesService.update(id, data);
      return res.status(200).json({
        mes: "Update successfully",
        data: updated,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }


  //delete type of product by id (param /{id})
  @Delete("delete/:id")
  @ApiParam({
    name: "id",
    type: "string",
    required: true,
  })
  async remove(@Param("id") id: string, @Res() res: Response): Promise<Response> {
    try {
      const type = await this.typesService.findOne({ _id: id });
      if (!!!type) {
        return res.status(404).json({
          statusCode: 404,
          mes: "type not found",
        });
      }

      await this.typesService.remove(id);
      return res.status(200).json({
        statusCode: 200,
        mes: "Delete successfully",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
