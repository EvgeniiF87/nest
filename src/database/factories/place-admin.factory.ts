import { faker } from '@faker-js/faker';
import { setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { define } from 'typeorm-seeding';

define(PlaceEntity, () => {
  const start = faker.date.between({
    from: new Date('2023-10-01'),
    to: new Date('2023-12-31'),
  });

  const timeStart = setHours(
    new Date(
      setMinutes(
        new Date(setSeconds(new Date(setMilliseconds(new Date(start), 0)), 0)),
        0,
      ),
    ),
    0,
  );

  const end = faker.date.soon({
    days: 90,
    refDate: new Date(start),
  });

  const timeEnd = setHours(
    new Date(
      setMinutes(
        new Date(setSeconds(new Date(setMilliseconds(new Date(end), 0)), 0)),
        0,
      ),
    ),
    0,
  );

  const show = faker.date.soon({
    days: 4,
    refDate: new Date(start),
  });

  const timeShow = setHours(
    new Date(
      setMinutes(
        new Date(setSeconds(new Date(setMilliseconds(new Date(show), 0)), 0)),
        0,
      ),
    ),
    0,
  );

  const place = new PlaceEntity();
  place.title = faker.word.words({ count: { min: 5, max: 10 } });
  place.desc = faker.lorem.sentences(6);
  place.preview =
    'http://78.24.180.193:7777/uploads/8ab16680-5a38-4473-9ddd-b9de3a3ec593.jpg';
  place.existTimeStart = timeStart;
  place.existTimeEnd = timeEnd;
  place.whenStartToShow = timeShow;
  return place;
});
