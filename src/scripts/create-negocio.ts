import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:postgres@db:5432/marquei?schema=public'
    }
  }
});

async function createNegocio() {
  try {
    const senha = '123456';
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(senha, salt);

    const negocio = await prisma.negocio.create({
      data: {
        nome: 'Negócio Teste',
        email: 'teste@email.com',
        senha: hash,
        telefone: '11999999999'
      }
    });

    console.log('Negócio criado com sucesso:');
    const { senha: _, ...negocioSemSenha } = negocio;
    console.log(JSON.stringify(negocioSemSenha, null, 2));
    console.log('\nCredenciais para login:');
    console.log('Email:', negocio.email);
    console.log('Senha:', senha);
  } catch (error) {
    console.error('Erro ao criar negócio:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createNegocio(); 