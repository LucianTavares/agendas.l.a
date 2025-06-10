import { PrismaClient, HorarioDisponivel } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:postgres@db:5432/marquei?schema=public'
    }
  }
});

async function createColaborador() {
  try {
    const colaborador = await prisma.colaborador.create({
      data: {
        nome: 'Maria Silva',
        cargo: 'Cabeleireira',
        negocioId: '777e7c01-aaa0-40d4-9eab-350a74d98158',
      }
    });

    console.log('Colaborador criado com sucesso:');
    console.log(JSON.stringify(colaborador, null, 2));

    // Criar horários disponíveis para o colaborador
    const hoje = new Date();
    const horarios: HorarioDisponivel[] = [];
    
    // Criar 5 horários disponíveis para os próximos 5 dias
    for (let i = 0; i < 5; i++) {
      const data = new Date(hoje);
      data.setDate(data.getDate() + i);
      data.setHours(14, 0, 0, 0); // 14:00

      const horario = await prisma.horarioDisponivel.create({
        data: {
          dataHora: data,
          colaboradorId: colaborador.id,
        }
      });

      horarios.push(horario);
    }

    console.log('\nHorários disponíveis criados:');
    console.log(JSON.stringify(horarios, null, 2));
  } catch (error) {
    console.error('Erro ao criar colaborador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createColaborador(); 