import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:postgres@db:5432/marquei?schema=public'
    }
  }
});

async function listNegocios() {
  try {
    const negocios = await prisma.negocio.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        createdAt: true,
      },
    });

    console.log('Negócios cadastrados:');
    console.log(JSON.stringify(negocios, null, 2));
  } catch (error) {
    console.error('Erro ao listar negócios:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listNegocios(); 