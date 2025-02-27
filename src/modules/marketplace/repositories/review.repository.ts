import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewRepository {
  private repo: Repository<Review>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Review);
  }

  async create(reviewData: Partial<Review>): Promise<Review> {
    const review = this.repo.create(reviewData);
    return await this.repo.save(review);
  }

  async findAll(): Promise<Review[]> {
    return await this.repo.find();
  }

  async findById(id: number): Promise<Review | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async update(
    id: number,
    reviewData: Partial<Review>,
  ): Promise<Review | null> {
    await this.repo.update(id, reviewData);
    return await this.repo.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByReviewer(reviewerId: number): Promise<Review[]> {
    return await this.repo.find({ where: { reviewerId } });
  }

  async findByReviewed(reviewedId: number): Promise<Review[]> {
    return await this.repo.find({ where: { reviewedId } });
  }
}
