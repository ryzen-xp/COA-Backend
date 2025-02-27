import { CreateReviewDto, UpdateReviewDto } from '../dtos/review.dto';
import { ReviewService } from '../services/review.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    try {
      return await this.reviewService.createReview(createReviewDto);
    } catch (error: unknown) {
      return {
        statusCode: 400,
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  @Get(':id')
  async getReviewById(@Param('id') id: number) {
    try {
      const review = await this.reviewService.getReviewById(id);
      if (!review) {
        return {
          statusCode: 404,
          message: 'Review not found',
        };
      }
      return review;
    } catch (error: unknown) {
      return {
        statusCode: 400,
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  @Get('reviewer/:reviewerId')
  async getReviewsByReviewerId(@Param('reviewerId') reviewerId: number) {
    try {
      return await this.reviewService.getReviewsByReviewerId(reviewerId);
    } catch (error: unknown) {
      return {
        statusCode: 400,
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  @Get('reviewed/:reviewedId')
  async getReviewsByReviewedId(@Param('reviewedId') reviewedId: number) {
    try {
      return await this.reviewService.getReviewsByReviewedId(reviewedId);
    } catch (error: unknown) {
      return {
        statusCode: 400,
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  @Put(':id/:reviewerId')
  async updateReview(
    @Param('id') id: number,
    @Param('reviewerId') reviewerId: number,
    @Body() updateDto: UpdateReviewDto,
  ) {
    try {
      return await this.reviewService.updateReview(id, reviewerId, updateDto);
    } catch (error: unknown) {
      return {
        statusCode: 400,
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  @Delete(':id/:reviewerId')
  async deleteReview(
    @Param('id') id: number,
    @Param('reviewerId') reviewerId: number,
  ) {
    try {
      return await this.reviewService.deleteReview(id, reviewerId);
    } catch (error: unknown) {
      return {
        statusCode: 400,
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}
