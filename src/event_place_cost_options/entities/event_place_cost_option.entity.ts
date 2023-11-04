import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { CostOptionEntity } from 'src/cost-options/entities/cost-option.entity';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('event_place_cost_options')
export class EventPlaceCostOptionEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => EventEntity)
  @ManyToOne(() => EventEntity, (event) => event.costOption)
  event: EventEntity;

  @Field(() => Int)
  @Column({ nullable: true })
  eventId?: number;

  @Field(() => PlaceEntity)
  @ManyToOne(() => PlaceEntity, (place) => place.costOption)
  place: PlaceEntity;

  @Field(() => Int)
  @Column({ nullable: true })
  placeId?: number;

  @Field(() => CostOptionEntity)
  @ManyToOne(() => CostOptionEntity, (costOption) => costOption.cost)
  costOption: CostOptionEntity;

  @Field(() => Int)
  @Column()
  costOptionId: number;

  @Field({ defaultValue: 'бесплатно' })
  @Column({ default: 'бесплатно' })
  price: string;
}
