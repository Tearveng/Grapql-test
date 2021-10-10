import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field } from "type-graphql";

@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  _id: number;

  @Field()
  @Column({unique: true})
  username: string;

  @Field()
  @Column({unique: true})
  email: string;

  @Column()
  password: string;
}
