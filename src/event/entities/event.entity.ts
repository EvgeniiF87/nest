import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventPlaceCostOptionEntity } from 'src/event_place_cost_options/entities/event_place_cost_option.entity';
import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { ImageEntity } from 'src/images/entities/image.entity';
import { InfoEntity } from 'src/info/entities/info.entity';
import { InterestingCollectionSelectionEntity } from 'src/interesting_collection_selections/entities/interesting_collection_selections.entity';
import { EventDirections } from '../directions';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { DefaultFieldsEntity } from 'src/default-fields-entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CityEntity } from 'src/cities/entities/city.entity';

@ObjectType()
@Entity('events')
export class EventEntity extends DefaultFieldsEntity {
  @Field({ defaultValue: false })
  @Column({ type: 'boolean', default: false })
  recommendation: boolean;

  @Field({ defaultValue: 'events' })
  @Column({ default: 'events' })
  categry: string;

  @Field(() => EventDirections)
  @Column({ type: 'enum', enum: EventDirections })
  direction: EventDirections;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.events)
  user: UserEntity;

  @Field(() => Int)
  @Column()
  cityId: number;

  @Field(() => CityEntity)
  @ManyToOne(() => CityEntity, (city) => city.events)
  city: CityEntity;

  @Field(() => [ImageEntity])
  @OneToMany(() => ImageEntity, (image) => image.event, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: Promise<ImageEntity[]>;

  @Field(() => InfoEntity)
  @OneToOne(() => InfoEntity, (info) => info.event, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  info: Promise<InfoEntity>;

  @Field(() => [EventPlaceTagEntity])
  @OneToMany(() => EventPlaceTagEntity, (eventTag) => eventTag.event)
  tags: Promise<EventPlaceTagEntity[]>;

  @Field(() => [EventPlaceCostOptionEntity])
  @OneToMany(() => EventPlaceCostOptionEntity, (costOption) => costOption.event)
  costOption: Promise<EventPlaceCostOptionEntity[]>;

  @Field(() => [InterestingCollectionSelectionEntity])
  @OneToMany(
    () => InterestingCollectionSelectionEntity,
    (interesting) => interesting.event,
  )
  interesting: InterestingCollectionSelectionEntity[];

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
