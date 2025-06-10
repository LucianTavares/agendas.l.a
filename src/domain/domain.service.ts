import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class DomainService {
  constructor(private prisma: PrismaService) {}

  async getDomain() {
    const negocio = await this.prisma.negocio.findFirst()

    if (!negocio) {
      throw new NotFoundException('Nenhum negócio encontrado')
    }

    return {
      name: negocio.nome
    }
  }
} 