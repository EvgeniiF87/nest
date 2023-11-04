import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EventPlaceCostOptionEntity } from 'src/event_place_cost_options/entities/event_place_cost_option.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('cost_options')
export class CostOptionEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [EventPlaceCostOptionEntity])
  @OneToMany(
    () => EventPlaceCostOptionEntity,
    (eventPlaceCostOption) => eventPlaceCostOption.costOption,
  )
  cost: EventPlaceCostOptionEntity[];
}
