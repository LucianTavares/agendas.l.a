import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

class CreateAgendamentoDto {
  clienteNome: string;
  clienteTelefone: string;
  dataHora: Date;
  negocioId: string;
  colaboradorId: string;
}

class UpdateStatusDto {
  status: string;
}

@ApiTags('agendamentos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('agendamentos')
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo agendamento' })
  @ApiResponse({ status: 201, description: 'Agendamento criado com sucesso' })
  create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return this.agendamentosService.create(createAgendamentoDto);
  }

  @Get('negocio/:id')
  @ApiOperation({ summary: 'Listar agendamentos de um negócio' })
  findAllByNegocio(@Param('id') id: string) {
    return this.agendamentosService.findAllByNegocio(id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Atualizar status do agendamento' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.agendamentosService.updateStatus(id, updateStatusDto.status);
  }
} 