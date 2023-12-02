import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IUserRepo from "../services/IRepos/IUserRepo";
import { User } from "../domain/user";
import { PoolClient } from 'pg'; // Importe o PoolClient

import { UserId } from "../domain/userId";
import { UserEmail } from "../domain/userEmail";
import { UserMap } from "../mappers/UserMap";

const fs = require('fs');
const config = require('./dbConfig'); // Importe o arquivo de configuração
const { Pool } = require('pg');

@Service()
export default class UserRepo implements IUserRepo {
  private models: any;
  private client: PoolClient;

  constructor(
    @Inject('userSchema') private userSchema: Model<IUserPersistence & Document>) {
  }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(userId: UserId | string): Promise<boolean> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX };
    const userDocument = await this.userSchema.findOne(query);

    return !!userDocument === true;
  }

  public async save(user: User): Promise<User> {
    console.log("saving user")
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('createuserquery.txt', 'utf8');
    const existsUser = await this.findByEmail(user.email);

    console.log("exists user é:" + existsUser)
    if (existsUser != null) { console.log("existsuser != null") }
    else {
      console.log("no email")
      const rawUser: any = UserMap.toPersistence(user);
      try {
        const query = this.replaceQueryParameters(queryFromFile, [rawUser.firstName, rawUser.lastName, rawUser.email, rawUser.phoneNumber, rawUser.role]);
        console.log("Generated SQL Query:", query);
        const result = await client.query(query);
        if (result.rows.length > 0) {
          console.log("alberto")
          // Encontrou um userr com os valores correspondentes
          return UserMap.toDomain(result.rows[0]);
        } else {
          console.log("user pode ser criado")
          // Nenhum userr igual encontrado
          return null;
        }
      } catch (error) {
        console.error('Erro ao executar a consulta SQL:', error);
      } finally {
        client.end();
      }
    }
  }


  public replaceQueryParameters(query, values) {
    // Substitui cada marcador de posição $X pelo valor correspondente
    for (let i = 0; i < values.length; i++) {
      query = query.replace(new RegExp(`\\$${i + 1}`, 'g'), `'${values[i]}'`);
    }
    return query;
  }
  public async isEmployee(email: UserEmail | string): Promise<boolean> {
    console.log("isEmployeeRepo")
    const user = this.findByEmail(email)
    if ((await user) == null) {
      return null
    }
    if ((await user).role == "employee") {
      return true
    }
    else return false
  }
  public async isClient(email: UserEmail | string): Promise<boolean> {
    console.log("entrou no isclient userrepo")
    const user = this.findByEmail(email)
    if ((await user) == null) {
      return null
    }
    if ((await user).role == "client") {
      console.log("user is client")
      return true
    }
    else return false
  }
  public async findByEmail(email: UserEmail | string): Promise<User> {
    console.log("a")
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('findbyemailquery.txt', 'utf8');
    try {
      // Executa a consulta com o email passado como parâmetro
      const query = queryFromFile.replace(/\$1/g, `'${email}'`);
      const result = await client.query(query);

      // Verifica se há resultados
      if (result.rows.length > 0) {
        return UserMap.toDomain(result.rows[0]);
      } else {
        console.log("theres no email")
        // Nenhum email igual encontrado
        return null

      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } finally {
      // Certifique-se de liberar a conexão com o banco de dados
      client.end();
    }
  }

  public async findById(userId: UserId | string): Promise<User> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX };
    const userRecord = await this.userSchema.findOne(query);

    if (userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<User[]> {
    console.log("userrepo findall()");
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });

    // Retorna uma promessa que resolve com o usersArray
    return new Promise<User[]>((resolve, reject) => {
      fs.readFile('getallclientsquery.txt', 'utf8', async (err, data) => {
        if (err) {
          console.error('Erro ao ler a consulta do arquivo:', err);
          reject(err);
          return;
        }

        try {
          // O conteúdo do arquivo se torna a consulta
          const query = data;

          // Executa a consulta
          const userRecord = await client.query(query);
          console.log("return findall()");

          if (userRecord) {
            var usersArray: Array<User> = [];
            for (var i = 0; i < userRecord.rows.length; i++) {
              console.log(userRecord.rows[i])
              console.log("---------")
              console.log(userRecord.rows[i].firstName)
              usersArray.push(UserMap.toDomain(userRecord.rows[i]));
            }
            resolve(usersArray); // Resolva a promessa com o usersArray
          } else {
            resolve(null); // Resolva a promessa com nulo se não houver dados
          }
        } catch (err) {
          reject(err); // Rejeite a promessa em caso de erro
        } finally {
          client.end(); // Certifique-se de encerrar a conexão quando não for mais necessária
        }
      });
    });
  }
  public async disableEmployee(email: string): Promise<boolean> {
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('deleteemployeequery.txt', 'utf8');
    try {
      // Executa a consulta com o email passado como parâmetro
      const query = queryFromFile.replace(/\$1/g, `'${email}'`);
      const result = await client.query(query);
      console.log("utilizador apagado")
      // Verifica se há resultados
      if (!this.findByEmail(email)) {
        return true;
      } else {
        return false;

      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } finally {
      client.end();
    }
  }

  public async addFavorite(favorite: string, email: string): Promise<boolean> {
    console.log("favorite is" + favorite)
    console.log("adding Favorite")
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('addfavoritequery.txt', 'utf8');

    try {
      const query = this.replaceQueryParameters(queryFromFile, [favorite, email]);
      console.log("Generated SQL Query:", query);
      const result = await client.query(query);
      if (result.rows.length > 0) {
        console.log("alberto")
        // Encontrou um userr com os valores correspondentes
        return true;
      } else {
        console.log("user pode ser criado")
        // Nenhum userr igual encontrado
        return false;
      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } finally {
      client.end();
    }
  }

  public async checkFavorite(favorite: string, email: string): Promise<boolean> {
    console.log("favorite is" + favorite)
    console.log("checking Favorite")
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('checkfavoritequery.txt', 'utf8');

    try {
      const query = this.replaceQueryParameters(queryFromFile, [email, favorite]);
      console.log("Generated SQL Query:", query);
      const result = await client.query(query);
      if (result.rows.length > 0) {
        console.log("alberto")
        // Encontrou um userr com os valores correspondentes
        return true;
      } else {
        console.log("nenhum registo encontrado")
        // Nenhum userr igual encontrado
        return false;
      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } finally {
      client.end();
    }
  }

  public async getFavorites(email: string): Promise<string[]> {
    console.log("favorite is" + email);
    console.log("getting Favorite");

    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('getfavoritesquery.txt', 'utf8');

    try {
      const query = this.replaceQueryParameters(queryFromFile, [email]);
      console.log("Generated SQL Query:", query);
      const result = await client.query(query);

      // Verifique se há resultados e se a propriedade rows está presente
      if (result && result.rows && result.rows.length > 0) {
        const favoritesArray = result.rows[0].favorites; // Acessa diretamente o array

        console.log('Array de Favoritos:', favoritesArray);

        if (favoritesArray && favoritesArray.length > 0) {
          console.log("Favoritos encontrados:", favoritesArray);
          return favoritesArray;
        } else {
          console.log("Nenhum favorito encontrado");
          return null;
        }
      } else {
        console.log("Nenhum resultado encontrado");
        return null;
      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } finally {
      client.end();
    }
  }
  public async removeFavorite(favorite: string, email: string): Promise<boolean> {
    console.log("favorite is" + favorite)
    console.log("removing Favorite")
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('removefavoritequery.txt', 'utf8');

    try {
      const query = this.replaceQueryParameters(queryFromFile, [favorite, email]);
      console.log("Generated SQL Query:", query);
      const result = await client.query(query);
      if (result.rows.length > 0) {
        console.log("alberto")
        // Encontrou um userr com os valores correspondentes
        return true;
      } else {
        console.log("user pode ser criado")
        // Nenhum userr igual encontrado
        return false;
      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } finally {
      client.end();
    }
  }


}