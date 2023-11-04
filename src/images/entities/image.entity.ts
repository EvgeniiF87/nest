import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('images')
export class ImageEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  path?: string;

  @Field(() => PlaceEntity)
  @ManyToOne(() => PlaceEntity, (place) => place.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  place: PlaceEntity;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  placeId: number;

  @Field(() => EventEntity)
  @ManyToOne(() => EventEntity, (event) => event.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  event: EventEntity;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  eventId: number;
}
