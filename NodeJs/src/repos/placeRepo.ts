import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IPlaceRepo from "../services/IRepos/IPlaceRepo";
import { PoolClient } from 'pg'; // Importe o PoolClient

import { PlaceMap } from "../mappers/PlaceMap";
import { Place } from '../domain/place';

const fs = require('fs');
const config = require('./dbConfig'); // Importe o arquivo de configuração
const { Pool } = require('pg');

@Service()
export default class PlaceRepo implements IPlaceRepo {
  private models: any;
  private client:PoolClient;

  constructor( 
    ) {
  }
    public async findBarbeiros(): Promise<Place[]> {
    console.log("Placerepo findBarbeiros()");
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });

    // Retorna uma promessa que resolve com o PlacesArray
    return new Promise<Place[]>((resolve, reject) => {
      fs.readFile('getbarbeirosquery.txt', 'utf8', async (err, data) => {
        if (err) {
          console.error('Erro ao ler a consulta do arquivo:', err);
          reject(err);
          return;
        }

        try {
          // O conteúdo do arquivo se torna a consulta
          const query = data;

          // Executa a consulta
          const placeRecord = await client.query(query);
          console.log("return findbarbeiros()");

          if (placeRecord) {
            var placesArray: Array<Place> = [];
            for (var i = 0; i < placeRecord.rows.length; i++) {
              console.log(placeRecord.rows[i])
              console.log("---------------------")
              console.log(placeRecord.rows[i].name)
              placesArray.push(PlaceMap.toDomain(placeRecord.rows[i]));
            }
            resolve(placesArray); // Resolva a promessa com o usersArray
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
    public async findCabeleireiros(): Promise<Place[]> {
        console.log("Placerepo findcabeleireiros()");
        const { connectionString } = config.postgres;
        const client = new Pool({ connectionString });
    
        // Retorna uma promessa que resolve com o PlacesArray
        return new Promise<Place[]>((resolve, reject) => {
          fs.readFile('getcabeleireirosquery.txt', 'utf8', async (err, data) => {
            if (err) {
              console.error('Erro ao ler a consulta do arquivo:', err);
              reject(err);
              return;
            }
    
            try {
              // O conteúdo do arquivo se torna a consulta
              const query = data;
    
              // Executa a consulta
              const placeRecord = await client.query(query);
              console.log("return findcabeleireiros()");
    
              if (placeRecord) {
                var placesArray: Array<Place> = [];
                for (var i = 0; i < placeRecord.rows.length; i++) {
                  console.log(placeRecord.rows[i])
                  console.log("---------------------")
                  console.log(placeRecord.rows[i].name)
                  placesArray.push(PlaceMap.toDomain(placeRecord.rows[i]));
                }
                resolve(placesArray); // Resolva a promessa com o usersArray
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
    public async findEsteticistas(): Promise<Place[]> {
        console.log("Placerepo findesteticistas()");
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });

    // Retorna uma promessa que resolve com o PlacesArray
    return new Promise<Place[]>((resolve, reject) => {
      fs.readFile('getesteticistasquery.txt', 'utf8', async (err, data) => {
        if (err) {
          console.error('Erro ao ler a consulta do arquivo:', err);
          reject(err);
          return;
        }

        try {
          // O conteúdo do arquivo se torna a consulta
          const query = data;

          // Executa a consulta
          const placeRecord = await client.query(query);
          console.log("return findesteticistas()");

          if (placeRecord) {
            var placesArray: Array<Place> = [];
            for (var i = 0; i < placeRecord.rows.length; i++) {
              console.log(placeRecord.rows[i])
              console.log("---------------------")
              console.log(placeRecord.rows[i].name)
              placesArray.push(PlaceMap.toDomain(placeRecord.rows[i]));
            }
            resolve(placesArray); // Resolva a promessa com o usersArray
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
    public async findSolarios(): Promise<Place[]> {
    console.log("Placerepo findsolarios()");
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });

    // Retorna uma promessa que resolve com o PlacesArray
    return new Promise<Place[]>((resolve, reject) => {
      fs.readFile('getsolariosquery.txt', 'utf8', async (err, data) => {
        if (err) {
          console.error('Erro ao ler a consulta do arquivo:', err);
          reject(err);
          return;
        }

        try {
          // O conteúdo do arquivo se torna a consulta
          const query = data;

          // Executa a consulta
          const placeRecord = await client.query(query);
          console.log("return findsolarios()");

          if (placeRecord) {
            var placesArray: Array<Place> = [];
            for (var i = 0; i < placeRecord.rows.length; i++) {
              console.log(placeRecord.rows[i])
              console.log("---------------------")
              console.log(placeRecord.rows[i].name)
              placesArray.push(PlaceMap.toDomain(placeRecord.rows[i]));
            }
            resolve(placesArray); // Resolva a promessa com o usersArray
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
    public async exists(t: Place): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

  
  public async save (place: Place): Promise<Place> {
    console.log("place to be saved is "+place.type)
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('createplacequery.txt', 'utf8');
  
      const rawPlace: any = PlaceMap.toPersistence(place);
      try {
      const query = this.replaceQueryParameters(queryFromFile, [rawPlace.name, rawPlace.address, rawPlace.image, rawPlace.type]);
      console.log("Generated SQL Query:", query);
      const result = await client.query(query);
      if (result.rows.length > 0) {
        console.log("alberto")
        // Encontrou um place com os valores correspondentes
        return PlaceMap.toDomain(result.rows[0]);
      } else {
        console.log("Place pode ser criado")
        // Nenhum user igual encontrado
        return null;
      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } finally {
      client.end();
    }
  
}


public replaceQueryParameters(query, values) {
  // Substitui cada marcador de posição $X pelo valor correspondente
  for (let i = 0; i < values.length; i++) {
    query = query.replace(new RegExp(`\\$${i + 1}`, 'g'), `'${values[i]}'`);
  }
  return query;
}

  public async existsPlace (address: string): Promise<Boolean> {
    console.log("this.existsPlace")
    console.log("address é "+address)
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('existsplacequery.txt', 'utf8');
    try {
      // Executa a consulta com o email passado como parâmetro
      const query = queryFromFile
      .replace(/\$1/g, `'${address}'`);
        const result = await client.query(query);
        console.log("query é "+query)
      // Verifica se há resultados
      if (result.rows.length > 0) {
        console.log("ja existe place")
        return true;
      } else {
        console.log("nada encontrado ")
       return false
        
      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } finally {
      // Certifique-se de liberar a conexão com o banco de dados
      client.end();
    }
  }




  public async getPlace (name: string): Promise<Place> {
    console.log("this.getPlace")
    console.log("address é "+name)
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('getplacequery.txt', 'utf8');
    try {
      // Executa a consulta com o email passado como parâmetro
      const query = queryFromFile
      .replace(/\$1/g, `'${name}'`);
        const result = await client.query(query);
        console.log("query é "+query)
      // Verifica se há resultados
      if (result.rows.length > 0) {
        console.log("place encontrado")
        return PlaceMap.toDomain(result.rows[0]);
      } else {
        console.log("nada encontrado ")
       return null
        
      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } finally {
      // Certifique-se de liberar a conexão com o banco de dados
      client.end();
    }
  }

  

  public async findAll(): Promise<Place[]> {
    console.log("Placerepo findall()");
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });

    // Retorna uma promessa que resolve com o PlacesArray
    return new Promise<Place[]>((resolve, reject) => {
      fs.readFile('getallplacesquery.txt', 'utf8', async (err, data) => {
        if (err) {
          console.error('Erro ao ler a consulta do arquivo:', err);
          reject(err);
          return;
        }

        try {
          // O conteúdo do arquivo se torna a consulta
          const query = data;

          // Executa a consulta
          const placeRecord = await client.query(query);
          console.log("return findall()");

          if (placeRecord) {
            var placesArray: Array<Place> = [];
            for (var i = 0; i < placeRecord.rows.length; i++) {
              console.log(placeRecord.rows[i])
              console.log("---------------------")
              console.log(placeRecord.rows[i].name)
              placesArray.push(PlaceMap.toDomain(placeRecord.rows[i]));
            }
            resolve(placesArray); // Resolva a promessa com o usersArray
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
}  