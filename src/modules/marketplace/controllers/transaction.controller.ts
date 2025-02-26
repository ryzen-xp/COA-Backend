import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTransactionDto, TransactionFilterDto } from '../dtos/transaction.dto';
import { TransactionService } from '../services/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(@Body() dto: CreateTransactionDto) {
    try {
      return await this.transactionService.createTransaction(dto);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        statusCode: 400,
        message: message
      };
    }
  }

  @Get()
  async getTransactions(@Query() filter: TransactionFilterDto) {
    try {
      return await this.transactionService.getTransactions(filter);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve transactions';
      return {
        statusCode: 400,
        message: message
      };
    }
  }

  @Get('latest')
  async getLatestTransactions(@Query('limit') limit: number = 10) {
    try {
      return await this.transactionService.getLatestTransactions(limit);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve latest transactions';
      return {
        statusCode: 400,
        message: message
      };
    }
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: string) {
    try {
      const transaction = await this.transactionService.getTransactionById(Number(id));
      if (!transaction) {
        return {
          statusCode: 404,
          message: 'Transaction not found'
        };
      }
      return transaction;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to retrieve transaction';
      return {
        statusCode: 400,
        message: message
      };
    }
  }
}
