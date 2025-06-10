import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgendamentosService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    clienteNome: string;
    clienteTelefone: string;
    dataHora: Date;
    negocioId: string;
    colaboradorId: string;
  }) {
    // Verificar se o horário está disponível
    const horarioExistente = await this.prisma.horarioDisponivel.findFirst({
      where: {
        colaboradorId: data.colaboradorId,
        dataHora: data.dataHora,
        disponivel: true,
      },
    });

    if (!horarioExistente) {
      throw new BadRequestException('Horário não disponível');
    }

    // Criar o agendamento em uma transação
    return this.prisma.$transaction(async (tx) => {
      // Marcar horário como indisponível
      await tx.horarioDisponivel.update({
        where: { id: horarioExistente.id },
        data: { disponivel: false },
      });

      // Criar o agendamento
      return tx.agendamento.create({
        data: {
          ...data,
          status: 'pendente',
        },
        include: {
          negocio: true,
          colaborador: true,
        },
      });
    });
  }

  async findAllByNegocio(negocioId: string) {
    return this.prisma.agendamento.findMany({
      where: { negocioId },
      include: {
        colaborador: true,
      },
      orderBy: {
        dataHora: 'asc',
      },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.agendamento.update({
      where: { id },
      data: { status },
      include: {
        colaborador: true,
        negocio: true,
      },
    });
  }
} 