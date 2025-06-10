import { PrismaClient, HorarioDisponivel } from '@prisma/client';

const prisma = new PrismaClient();

async function createHorarios() {
  try {
    const colaboradorId = '41c87aee-4e99-4deb-85aa-042539c27d95';
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
          colaboradorId: colaboradorId
        }
      });

      horarios.push(horario);
    }

    console.log('Horários disponíveis criados:');
    console.log(JSON.stringify(horarios, null, 2));
  } catch (error) {
    console.error('Erro ao criar horários:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createHorarios(); 