import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<User>;
	findAll(): Promise<User[]>;
	isClient(email : string):Promise<boolean>;
	isEmployee(email : string):Promise<boolean>;
	disableEmployee(email: string):Promise<boolean>;
	addFavorite(favorite: string, email: string):Promise<boolean>;
	checkFavorite(favorite: string, email:string):Promise<boolean>;
	getFavorites(email : string):Promise<string[]>;
	removeFavorite(favorite: string, email: string):Promise<boolean>;


}
  