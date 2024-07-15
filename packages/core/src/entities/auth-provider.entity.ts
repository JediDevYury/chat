import {Entity, Index, ManyToOne, PrimaryColumn } from "typeorm";
import {User} from "./user.entity";

@Entity()
@Index(["userId", "provider"], { unique: true })
@Index(["provider", "providerId"], { unique: true })
export class AuthProvider {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, user => user.authProviders)
  user: User;

  @PrimaryColumn()
  provider: string;

  @PrimaryColumn()
  providerId: string;
}
