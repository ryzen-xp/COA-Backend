import { Review } from '../entities/review.entity';
import { CreateReviewDto, UpdateReviewDto } from '../dtos/review.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async createReview(dto: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create({
      rating: dto.rating,
      comment: dto.comment ?? null,
      reviewedId: dto.reviewedId,
      reviewerId: dto.reviewerId,
    });
    return await this.reviewRepository.save(review);
  }

  async getReviewById(id: number): Promise<Review | null> {
    return await this.reviewRepository.findOne({ where: { id } });
  }

  async getReviewsByReviewerId(reviewerId: number): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { reviewerId },
      order: { createdAt: 'DESC' },
    });
  }

  async getReviewsByReviewedId(reviewedId: number): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { reviewedId },
      order: { createdAt: 'DESC' },
    });
  }

  async updateReview(
    id: number,
    reviewerId: number,
    dto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review) {
      throw new Error('Review not found');
    }

    if (review.reviewerId !== reviewerId) {
      throw new Error('You are not allowed to update this review');
    }

    if (dto.rating !== undefined) {
      review.rating = dto.rating;
    }

    if (dto.comment !== undefined) {
      review.comment = dto.comment;
    }
    return this.reviewRepository.save(review);
  }

  async deleteReview(id: number, reviewerId: number): Promise<boolean> {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review) {
      throw new Error('Review not found');
    }

    if (review.reviewerId !== reviewerId) {
      throw new Error('You are not allowed to delete this review');
    }

    await this.reviewRepository.remove(review);
    return true;
  }
}
