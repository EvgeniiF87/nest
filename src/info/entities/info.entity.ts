import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('info')
export class InfoEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  adress?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  metro?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  time_from?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  time_to?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ defaultValue: false, nullable: true })
  @Column({ type: 'boolean', default: false })
  call_back?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  site?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  social?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  longitude?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  latitude?: string;

  @Field(() => PlaceEntity)
  @OneToOne(() => PlaceEntity, (place) => place.info, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  place: PlaceEntity;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  placeId?: number;

  @Field(() => EventEntity)
  @OneToOne(() => EventEntity, (event) => event.info, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  event: EventEntity;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  eventId?: number;
}
