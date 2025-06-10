import { Controller, Get, UseGuards } from '@nestjs/common'
import { DomainService } from './domain.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('domain')
@UseGuards(JwtAuthGuard)
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Get()
  async getDomain() {
    return this.domainService.getDomain()
  }
} 