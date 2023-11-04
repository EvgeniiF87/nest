import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1699055031081 implements MigrationInterface {
  name = 'Init1699055031081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "images" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "placeId" integer, "eventId" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "info" ("id" SERIAL NOT NULL, "adress" character varying, "metro" character varying, "time_from" character varying, "time_to" character varying, "phone" character varying, "call_back" boolean NOT NULL DEFAULT false, "site" character varying, "social" character varying, "longitude" character varying, "latitude" character varying, "placeId" integer, "eventId" integer, CONSTRAINT "REL_5c2ac9f4e14f4ae4255e340474" UNIQUE ("placeId"), CONSTRAINT "REL_4af2db6db1ae08828edbd4e111" UNIQUE ("eventId"), CONSTRAINT "PK_687dc5e25f4f1ee093a45b68bb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "interesting_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_fe686ca7c686ed5cd6b0d1f2940" UNIQUE ("name"), CONSTRAINT "PK_55aa7d069400e92e37036887337" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "interesting_category_select" ("id" SERIAL NOT NULL, "interestingId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_2498d43bcf5fc9b102fcfbd1bd1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "interesting_collections" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "img" character varying, "views" integer NOT NULL DEFAULT '0', "priorities" integer NOT NULL DEFAULT '0', "existTimeStart" TIMESTAMP, "existTimeEnd" TIMESTAMP, "whenStartToShow" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a4249f6e1e060143a76bb79f025" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "interesting_collection_selections" ("id" SERIAL NOT NULL, "interestingId" integer, "eventId" integer, "placeId" integer, CONSTRAINT "PK_6a1a1c9f5c0abf1cc51fc6f7810" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" "public"."roles_name_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, "password" character varying NOT NULL, "geo" character varying, "avatar" character varying, "roleId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cities" ("id" SERIAL NOT NULL, "district" character varying NOT NULL, "subject" character varying NOT NULL, "name" character varying NOT NULL, "longitude" character varying NOT NULL, "latitude" character varying NOT NULL, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "places" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "desc" character varying NOT NULL, "views" integer DEFAULT '0', "preview" character varying, "publish" boolean NOT NULL DEFAULT true, "existTimeStart" TIMESTAMP, "existTimeEnd" TIMESTAMP, "whenStartToShow" TIMESTAMP, "categry" character varying NOT NULL DEFAULT 'places', "direction" "public"."places_direction_enum" NOT NULL, "userId" integer NOT NULL, "cityId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_place_tags" ("id" SERIAL NOT NULL, "eventId" integer, "placeId" integer, "tagsId" integer NOT NULL, CONSTRAINT "PK_d87d6ffda74f013d492043d06b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "events" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "desc" character varying NOT NULL, "views" integer DEFAULT '0', "preview" character varying, "publish" boolean NOT NULL DEFAULT true, "existTimeStart" TIMESTAMP, "existTimeEnd" TIMESTAMP, "whenStartToShow" TIMESTAMP, "recommendation" boolean NOT NULL DEFAULT false, "categry" character varying NOT NULL DEFAULT 'events', "direction" "public"."events_direction_enum" NOT NULL, "userId" integer NOT NULL, "cityId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_place_cost_options" ("id" SERIAL NOT NULL, "eventId" integer, "placeId" integer, "costOptionId" integer NOT NULL, "price" character varying NOT NULL DEFAULT 'бесплатно', CONSTRAINT "PK_057ed8ded8e59087fbfc87c074b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cost_options" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_4cb3833238b922bc3ff72dd295d" UNIQUE ("name"), CONSTRAINT "PK_fe5a43015776ec4d3c1ef68d85d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "expire" TIMESTAMP NOT NULL, "refresh_token" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_d417e5d35f2434afc4bd48cb4d" UNIQUE ("userId"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_3c42a2cf494dbc553dceb2db656" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_6a583d8235697646ab49f93fd54" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" ADD CONSTRAINT "FK_5c2ac9f4e14f4ae4255e340474a" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" ADD CONSTRAINT "FK_4af2db6db1ae08828edbd4e111d" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "interesting_category_select" ADD CONSTRAINT "FK_c91e8e5465ced0b86f3554fa90f" FOREIGN KEY ("interestingId") REFERENCES "interesting_collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "interesting_category_select" ADD CONSTRAINT "FK_dbe4e2c2b7f2ffacf3324e7e698" FOREIGN KEY ("categoryId") REFERENCES "interesting_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "interesting_collection_selections" ADD CONSTRAINT "FK_37335da4cb29913221f442c00c2" FOREIGN KEY ("interestingId") REFERENCES "interesting_collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "interesting_collection_selections" ADD CONSTRAINT "FK_5378f5b77101572535757fb96f1" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "interesting_collection_selections" ADD CONSTRAINT "FK_49a03e7f4c3c040a19e9ae42760" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "places" ADD CONSTRAINT "FK_41f795cb1cf769256b87e548aa2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "places" ADD CONSTRAINT "FK_f548129f350a5ed88401d583c8b" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" ADD CONSTRAINT "FK_0c478cc17483f806181ae99d037" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" ADD CONSTRAINT "FK_4d66b9f8cb2b5bc160fb0cb8408" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" ADD CONSTRAINT "FK_6829b2187a29d64c27387bf43b1" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_712790b5c3b1e6d859c0987c4f5" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" ADD CONSTRAINT "FK_cac3dc66dbf33d47d9978a4e04a" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" ADD CONSTRAINT "FK_4d8f9136743763b47a06a589c93" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" ADD CONSTRAINT "FK_c2c2572431731fbc30270753da7" FOREIGN KEY ("costOptionId") REFERENCES "cost_options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" DROP CONSTRAINT "FK_c2c2572431731fbc30270753da7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" DROP CONSTRAINT "FK_4d8f9136743763b47a06a589c93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_cost_options" DROP CONSTRAINT "FK_cac3dc66dbf33d47d9978a4e04a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_712790b5c3b1e6d859c0987c4f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" DROP CONSTRAINT "FK_6829b2187a29d64c27387bf43b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" DROP CONSTRAINT "FK_4d66b9f8cb2b5bc160fb0cb8408"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_place_tags" DROP CONSTRAINT "FK_0c478cc17483f806181ae99d037"`,
    );
    await queryRunner.query(
      `ALTER TABLE "places" DROP CONSTRAINT "FK_f548129f350a5ed88401d583c8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "places" DROP CONSTRAINT "FK_41f795cb1cf769256b87e548aa2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "interesting_collection_selections" DROP CONSTRAINT "FK_49a03e7f4c3c040a19e9ae42760"`,
    );
    await queryRunner.query(
      `ALTER TABLE "interesting_collection_selections" DROP CONSTRAINT "FK_5378f5b77101572535757fb96f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "interesting_collection_selections" DROP CONSTRAINT "FK_37335da4cb29913221f442c00c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "interesting_category_select" DROP CONSTRAINT "FK_dbe4e2c2b7f2ffacf3324e7e698"`,
    );
    await queryRunner.query(
      `ALTER TABLE "interesting_category_select" DROP CONSTRAINT "FK_c91e8e5465ced0b86f3554fa90f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" DROP CONSTRAINT "FK_4af2db6db1ae08828edbd4e111d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "info" DROP CONSTRAINT "FK_5c2ac9f4e14f4ae4255e340474a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_6a583d8235697646ab49f93fd54"`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_3c42a2cf494dbc553dceb2db656"`,
    );
    await queryRunner.query(`DROP TABLE "tokens"`);
    await queryRunner.query(`DROP TABLE "cost_options"`);
    await queryRunner.query(`DROP TABLE "event_place_cost_options"`);
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`DROP TABLE "event_place_tags"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "places"`);
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "interesting_collection_selections"`);
    await queryRunner.query(`DROP TABLE "interesting_collections"`);
    await queryRunner.query(`DROP TABLE "interesting_category_select"`);
    await queryRunner.query(`DROP TABLE "interesting_categories"`);
    await queryRunner.query(`DROP TABLE "info"`);
    await queryRunner.query(`DROP TABLE "images"`);
  }
}
