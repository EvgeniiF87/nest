import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../role-types';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
@Entity('roles')
export class RoleEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Roles, { defaultValue: Roles.User })
  @Column({ type: 'enum', enum: Roles, default: Roles.User })
  name: string;

  @Field(() => [UserEntity])
  @OneToMany(() => UserEntity, (user) => user.role)
  user: UserEntity[];
}
