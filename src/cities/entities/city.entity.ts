import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EventEntity } from 'src/event/entities/event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('cities')
export class CityEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'Федеральный округ' })
  @Column()
  district: string;

  @Field({ description: 'Регион' })
  @Column()
  subject: string;

  @Field({ description: 'Название города' })
  @Column()
  name: string;

  @Field({ description: 'Долгота' })
  @Column()
  longitude: string;

  @Field({ description: 'Широта' })
  @Column()
  latitude: string;

  @Field(() => [EventEntity])
  @OneToMany(() => EventEntity, (event) => event.city)
  events: EventEntity[];

  @Field(() => [PlaceEntity])
  @OneToMany(() => PlaceEntity, (place) => place.city)
  places: PlaceEntity[];
}
