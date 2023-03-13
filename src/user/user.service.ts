import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}
  async create(createUserDTO: CreateUserDTO) {
    try {
      // Hash password
      const hashedPassword = await this.hashService.hashPassword(
        createUserDTO.password,
      );

      // Create user
      const user = await this.prisma.user.create({
        data: {
          ...createUserDTO,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  /**
   *
   * @param email  email of user
   * @returns user
   */
  async findByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  update(id: number, updateUserDto: UpdateUserDTO) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
