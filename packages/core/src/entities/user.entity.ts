import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import * as GraphQLTypes from '../graphql';
import {AuthProvider} from "./auth-provider.entity";

@Entity()
@Index(['email'], { unique: true })
export class User implements GraphQLTypes.User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fullName: string;

  @Column()
  email: string;

  @OneToMany(() => AuthProvider, authProvider => authProvider.user)
  authProviders: AuthProvider[];

  constructor(createUserInput: Partial<GraphQLTypes.CreateUserInput>) {
    Object.assign(this, createUserInput);
  }
}
