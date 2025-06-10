import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateNegocio(email: string, senha: string) {
    const negocio = await this.prisma.negocio.findUnique({
      where: { email },
    });

    if (negocio && (await bcrypt.compare(senha, negocio.senha))) {
      const { senha: _, ...result } = negocio;
      return result;
    }

    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(email: string, senha: string) {
    const negocio = await this.validateNegocio(email, senha);
    const payload = { sub: negocio.id, email: negocio.email };

    return {
      access_token: this.jwtService.sign(payload),
      negocio,
    };
  }

  // Método auxiliar para atualizar senha com hash
  async updateSenhaComHash(email: string, senha: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(senha, salt);
    
    return this.prisma.negocio.update({
      where: { email },
      data: { senha: hash },
    });
  }

  async updatePassword(email: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const updatedNegocio = await this.prisma.negocio.update({
      where: { email },
      data: { senha: hashedPassword },
    });

    const { senha: _, ...result } = updatedNegocio;
    return result;
  }
} 