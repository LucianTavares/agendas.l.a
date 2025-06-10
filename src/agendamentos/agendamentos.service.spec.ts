import { Test, TestingModule } from '@nestjs/testing';
import { AgendamentosService } from './agendamentos.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('AgendamentosService', () => {
  let service: AgendamentosService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    horarioDisponivel: {
      findFirst: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendamentosService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AgendamentosService>(AgendamentosService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const mockAgendamento = {
      clienteNome: 'Test Client',
      clienteTelefone: '123456789',
      dataHora: new Date(),
      negocioId: '1',
      colaboradorId: '1',
    };

    it('should throw BadRequestException when horário is not available', async () => {
      mockPrismaService.horarioDisponivel.findFirst.mockResolvedValue(null);

      await expect(service.create(mockAgendamento)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create agendamento when horário is available', async () => {
      const mockHorario = {
        id: '1',
        dataHora: new Date(),
        disponivel: true,
        colaboradorId: '1',
      };

      const mockCreatedAgendamento = {
        id: '1',
        ...mockAgendamento,
        status: 'pendente',
      };

      mockPrismaService.horarioDisponivel.findFirst.mockResolvedValue(mockHorario);
      mockPrismaService.$transaction.mockImplementation((callback) =>
        callback(mockPrismaService),
      );

      mockPrismaService.$transaction.mockResolvedValue(mockCreatedAgendamento);

      const result = await service.create(mockAgendamento);
      expect(result).toEqual(mockCreatedAgendamento);
    });
  });
}); 