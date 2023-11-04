import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ unique: true, nullable: true })
  phone: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  geo: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field(() => Int)
  @Column()
  roleId: number;

  @Field(() => RoleEntity)
  @ManyToOne(() => RoleEntity, (role) => role.user)
  role: RoleEntity;

  @Field(() => [EventEntity], { nullable: true })
  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];

  @Field(() => [PlaceEntity], { nullable: true })
  @OneToMany(() => PlaceEntity, (place) => place.user)
  places: PlaceEntity[];

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
