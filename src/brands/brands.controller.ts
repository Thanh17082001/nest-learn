import { Brand } from './entities/brand.entity';
import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res, Query, UseGuards } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BrandInterface } from './interfaces/brands.interface';
import { Roles } from 'src/guard/role.decorator';
import { RoleGuard } from 'src/guard/role.guard';
import { AuthGuard } from 'src/guard/auth';

@Controller('brands')
@ApiTags('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post('create')
  @ApiBody({
    type: CreateBrandDto,
    examples: {
      data: {
        value: {
          name: '',
          logo: '',
          description: '',
        } as CreateBrandDto,
      },
    },
  })
  @UsePipes(
    new ValidationPipe({ transform: true, disableErrorMessages: false }),
  )
  async create(@Body() data: CreateBrandDto, @Res() res: Response) {
    try {
      const exitsBrand = await this.brandsService.findOne({ name: data.name });
      console.log(exitsBrand);
      if (!!exitsBrand) {
        return res
          .status(409)
          .json({ statusCode: 409, mes: 'brand already exists' });
      }
      const brand = await this.brandsService.create(data);
      return res.status(201).json({
        mes: 'Create successfully',
        brand,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  @Get()
  @Roles('staff')
  @ApiBearerAuth()
  @UseGuards(RoleGuard) //2
  @UseGuards(AuthGuard) //1
  @ApiQuery({
    name: 'pageNumber',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
  })
  async getAll(@Res() res: Response, @Query() query: any): Promise<Response> {
    try {
      const { pageNumber, litmit } = query;
      console.log(pageNumber);
      const brands = await this.brandsService.findAll();
      return res.status(200).json({
        statusCode: 200,
        brands,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const brand = await this.brandsService.findOne({ _id: id });
      if (!!!brand) {
        return res.status(404).json({
          statusCode: 404,
          mes: 'Brand not found',
        });
      }
      return res.status(200).json({
        statusCode: 200,
        brand,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  @Patch('update/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
  })
  @ApiBody({
    type: UpdateBrandDto,
    examples: {
      data: {
        value: {
          name: '',
          logo: '',
          description: '',
        } as UpdateBrandDto,
      },
    },
  })
  @UsePipes(
    new ValidationPipe({ transform: true, disableErrorMessages: false }),
  )
  async update(
    @Param('id') id: string,
    @Body() data: UpdateBrandDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const brand = await this.brandsService.findOne({ _id: id });
      if (!!!brand) {
        return res.status(404).json({
          statusCode: 404,
          mes: 'Brand not found',
        });
      }
      const updated = await this.brandsService.update(id, data);
      return res.status(200).json({
        mes: 'Update successfully',
        data: updated,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string, @Res() res: Response):Promise<Response> {
    try {
       const brand = await this.brandsService.findOne({ _id: id });
       if (!!!brand) {
         return res.status(404).json({
           statusCode: 404,
           mes: 'Brand not found',
         });
      }

       await this.brandsService.remove(id)
      return res.status(200).json({
        statusCode: 200,
        mes:'Delete successfully'
      })
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
