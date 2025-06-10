import { Module } from '@nestjs/common'
import { DomainController } from './domain.controller'
import { DomainService } from './domain.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainModule {} 