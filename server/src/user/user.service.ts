import { FindManyOptions } from './../../node_modules/typeorm/browser/find-options/FindManyOptions.d';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  async findAll() {
    const allUsers = await this.userRepo.find()

    if (allUsers.length > 0) {
      return {
        status: 200,
        users: allUsers,
        message: "No users exist"
      }
    } else {
      return {
        status: 200,
        users: allUsers,
        message: "Users fetched successfully!"
      }
    }
  }

  async findOne(id: string) {
    const existingUser = await this.userRepo.findOne({
      where: { id }
    });

    if (!existingUser) {
      return {
        status: 404,
        message: "User not found"
      }
    } else {
      return {
        status: 404,
        user: existingUser,
        message: "User fetched successfully!"
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepo.findOne({
      where: { id },
    });

    if (!existingUser) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    // Update the user with the new values
    await this.userRepo.update(id, {
      ...updateUserDto,
    });

    // Fetch updated user details to return
    const updatedUser = await this.userRepo.findOne({
      where: { id },
    });

    return {
      status: 200,
      message: "User updated successfully",
      data: updatedUser,
    };
  }

  async remove(id: string) {
    const existingUser = await this.userRepo.findOne({
      where: { id }
    });

    if (!existingUser) {
      return {
        status: 404,
        message: "User not found"
      }
    }
    await this.userRepo.delete(id)

    return {
      status: 200,
      message: "User deleted successfully",
    };
  }
}
