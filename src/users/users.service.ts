import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HashService } from 'src/hash/hash.service';
import { message } from 'src/helpers/response.message';
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

  async findAll(user: JWTPayload) {
    const isAdmin = user.is_admin;

    if (!isAdmin) throw new ForbiddenException(message.UNAUTHORIZED);

    const users = await this.prisma.user.findMany({});
    return users;
  }

  /**
   *
   * @param id user id
   * @returns User
   */
  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  /**
   * Find user by email
   * @param email  email of the user
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
      console.log(error);
      throw new Error(error);
    }
  }

  /**
   *
   * @param id user id
   * @param updateUserDto contains the data to update
   * @returns User -- with updated data
   */
  update(user: JWTPayload, id: string, updateUserDto: UpdateUserDTO) {
    const isAdmin = user.is_admin;

    if (!isAdmin && user.id !== id)
      throw new ForbiddenException(message.UNAUTHORIZED);

    const updatedUser = this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    return updatedUser;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
