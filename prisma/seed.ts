import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Verificar se já existe um negócio com o email admin
  const existingNegocio = await prisma.negocio.findUnique({
    where: { email: 'admin@exemplo.com' },
  });

  let negocio;
  if (!existingNegocio) {
    // Criar um negócio inicial (usuário admin)
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    negocio = await prisma.negocio.create({
      data: {
        nome: 'Salão Exemplo',
        email: 'admin@exemplo.com',
        senha: hashedPassword,
        telefone: '(11) 99999-9999',
      },
    });
  } else {
    negocio = existingNegocio;
  }

  // Verificar se já existem colaboradores
  const existingColaboradores = await prisma.colaborador.findMany({
    where: { negocioId: negocio.id },
  });

  if (existingColaboradores.length === 0) {
    // Criar alguns colaboradores
    const colaboradores = await Promise.all([
      prisma.colaborador.create({
        data: {
          nome: 'Ana Costa',
          cargo: 'Cabeleireira',
          negocioId: negocio.id,
        },
      }),
      prisma.colaborador.create({
        data: {
          nome: 'Carlos Lima',
          cargo: 'Barbeiro',
          negocioId: negocio.id,
        },
      }),
      prisma.colaborador.create({
        data: {
          nome: 'Dra. Lucia',
          cargo: 'Esteticista',
          negocioId: negocio.id,
        },
      }),
    ]);

    // Criar alguns horários disponíveis
    const hoje = new Date();
    for (const colaborador of colaboradores) {
      for (let i = 0; i < 5; i++) {
        const data = new Date(hoje);
        data.setDate(data.getDate() + i);
        data.setHours(9 + i, 0, 0, 0);

        await prisma.horarioDisponivel.create({
          data: {
            dataHora: data,
            colaboradorId: colaborador.id,
          },
        });
      }
    }
  }

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 