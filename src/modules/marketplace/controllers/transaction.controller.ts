import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto, GetTransactionsDto } from '../dtos/transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionService.createTransaction(dto);
  }

  @Get()
  findAll(@Query() filter: GetTransactionsDto) {
    return this.transactionService.getTransactions(filter);
  }
}