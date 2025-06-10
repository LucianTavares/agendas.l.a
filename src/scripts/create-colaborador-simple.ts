import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  } catch (error) {
    console.error('Erro ao criar colaborador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createColaborador(); 