import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createHorarioDisponivel() {
  try {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    amanha.setHours(14, 0, 0, 0);

    const horario = await prisma.horarioDisponivel.create({
      data: {
        dataHora: amanha,
        colaboradorId: '41c87aee-4e99-4deb-85aa-042539c27d95',
        disponivel: true
      }
    });

    console.log('Horário disponível criado:');
    console.log(JSON.stringify(horario, null, 2));
  } catch (error) {
    console.error('Erro ao criar horário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createHorarioDisponivel(); 