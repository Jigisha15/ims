import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { LoginAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  // register
  async create(createAuthDto: CreateAuthDto) {
    const { name, emailId, phoneNumber, password, role } = createAuthDto

    const existingUser = await this.userRepo.findOne({
      where: { emailId }
    })
    if (existingUser) {
      throw new UnauthorizedException('User with the same emailId already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = this.userRepo.create({
      name,
      emailId,
      phoneNumber,
      password: hashedPassword,
      role
    })

    await this.userRepo.save(user)

    return {
      status: 201,
      user: user,
      message: "User registered successfully!"
    };
  }

  // add one login
  async login(loginDto: LoginAuthDto) {
    const { emailId, password } = loginDto

    const user = await this.userRepo.findOne({
      where: { emailId }
    })

    if (!user) {
      throw new UnauthorizedException("User with provided emailId not found")
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      throw new UnauthorizedException("Passwords dont match")
    }

    const payload = { user_id: user.id, email: user.emailId, role: user.role }
    const token = this.jwtService.sign(payload)

    return {
      status: 200,
      user: user,
      token: token,
      message: "User logged in successfully!"
    };
  }

  async logout(res?: any) {
    if (res) {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }

    return {
      status: 200,
      message: 'User logged out successfully!',
    };
  }
}
