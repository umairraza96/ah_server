import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

export class SignUpAuthDTO extends CreateUserDTO {}
