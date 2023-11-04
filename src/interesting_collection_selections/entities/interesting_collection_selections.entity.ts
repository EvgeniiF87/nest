import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { InterestingCollectionEntity } from 'src/interesting_collection/entities/interesting_collection.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('interesting_collection_selections')
export class InterestingCollectionSelectionEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => InterestingCollectionEntity)
  @ManyToOne(
    () => InterestingCollectionEntity,
    (interesting) => interesting.collection,
  )
  interesting?: InterestingCollectionEntity;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  interestingId: number;

  @Field(() => EventEntity, { nullable: true })
  @ManyToOne(() => EventEntity, (event) => event.interesting)
  event?: EventEntity;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  eventId?: number;

  @Field(() => PlaceEntity, { nullable: true })
  @ManyToOne(() => PlaceEntity, (place) => place.interesting)
  place?: PlaceEntity;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  placeId?: number;
}
