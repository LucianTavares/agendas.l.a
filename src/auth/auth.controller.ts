import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

class LoginDto {
  email: string;
  senha: string;
}

class UpdatePasswordDto {
  email: string;
  newPassword: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realizar login do negócio' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.senha);
  }

  @Post('update-password')
  @ApiOperation({ summary: 'Atualizar senha do negócio' })
  @ApiResponse({ status: 200, description: 'Senha atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Negócio não encontrado' })
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(
      updatePasswordDto.email,
      updatePasswordDto.newPassword,
    );
  }

  // Rota temporária para atualizar senha com hash
  @Post('update-senha')
  @ApiOperation({ summary: 'Atualizar senha com hash (temporário)' })
  async updateSenha(@Body() loginDto: LoginDto) {
    return this.authService.updateSenhaComHash(loginDto.email, loginDto.senha);
  }
} 