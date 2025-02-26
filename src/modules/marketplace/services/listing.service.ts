import { getRepository } from 'typeorm';
import { Listing } from '../entities/listing.entity';
import { CreateListingDto, UpdateListingDto } from '../dtos/listing.dto';

class ListingService {
    private listingRepository = getRepository(Listing);

    async create(createListingDto: CreateListingDto): Promise<Listing> {
        const listing = this.listingRepository.create(createListingDto);
        return this.listingRepository.save(listing);
    }

    async findAll(): Promise<Listing[]> {
        return this.listingRepository.find();
    }

    async findOne(id: number): Promise<Listing | null> {
        return this.listingRepository.findOne({ where: { id } });
    }

    async update(id: number, updateListingDto: UpdateListingDto): Promise<void> {
        await this.listingRepository.update(id, updateListingDto);
    }

    async remove(id: number): Promise<void> {
        await this.listingRepository.delete(id);
    }
}

export default new ListingService();