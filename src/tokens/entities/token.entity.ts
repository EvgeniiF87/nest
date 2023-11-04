import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('tokens')
export class TokenEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  expire: Date;

  @Field()
  @Column()
  refresh_token: string;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => UserEntity)
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
