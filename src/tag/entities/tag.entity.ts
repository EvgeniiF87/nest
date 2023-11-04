import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EventPlaceTagEntity } from 'src/event_place_tags/entities/event_place_tag.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('tags')
export class TagEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [EventPlaceTagEntity])
  @OneToMany(() => EventPlaceTagEntity, (eventPlaceTag) => eventPlaceTag.tags)
  tags: EventPlaceTagEntity[];
}
