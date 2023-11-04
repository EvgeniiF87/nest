import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { ImageEntity } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import RemoveResponse from 'src/response/remove-response';
import { Role } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/role/role-types';

@Resolver(() => ImageEntity)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Mutation(() => ImageEntity)
  createImage(@Args('createImageInput') createImageInput: CreateImageInput) {
    return this.imagesService.create(createImageInput);
  }

  @Query(() => [ImageEntity], { name: 'images' })
  findAll() {
    return this.imagesService.findAll();
  }

  @Query(() => ImageEntity, { name: 'image' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.imagesService.findOne(id);
  }

  @Mutation(() => ImageEntity)
  updateImage(@Args('updateImageInput') updateImageInput: UpdateImageInput) {
    return this.imagesService.update(updateImageInput.id, updateImageInput);
  }

  @Role(Roles.Admin)
  @Mutation(() => RemoveResponse)
  removeImage(@Args('id', { type: () => Int }) id: number) {
    return this.imagesService.remove(id);
  }
}
