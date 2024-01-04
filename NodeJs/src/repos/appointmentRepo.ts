import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IAppointmentRepo from "../services/IRepos/IAppointmentRepo";
import { PoolClient } from 'pg'; // Importe o PoolClient

import { AppointmentMap } from "../mappers/AppointmentMap";
import { Appointment } from '../domain/appointment';

const fs = require('fs');
const config = require('./dbConfig'); // Importe o arquivo de configuração
const { Pool } = require('pg');

@Service()
export default class AppointmentRepo implements IAppointmentRepo {
  private models: any;
  private client: PoolClient;

  constructor(
  ) {
  }
  exists(t: Appointment): Promise<boolean> {
    throw new Error('Method not implemented.');
  }


  public async save(appointment: Appointment): Promise<Appointment> {
    console.log("appointment to be saved is " + appointment.type)
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('createappointmentquery.txt', 'utf8');

    const rawAppointment: any = AppointmentMap.toPersistence(appointment);
    try {
      const query = this.replaceQueryParameters(queryFromFile, [rawAppointment.name, rawAppointment.place, rawAppointment.day, rawAppointment.accountable, rawAppointment.type, rawAppointment.email]);
      console.log("Generated SQL Query:", query);
      const result = await client.query(query);
      if (result.rows.length > 0) {
        console.log("alberto")
        // Encontrou um appointment com os valores correspondentes
        return AppointmentMap.toDomain(result.rows[0]);
      } else {
        console.log("appointment pode ser criado")
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

  public async existsAppointment(place: string, day: string, accountable: string, type: string): Promise<Boolean> {
    console.log("this.existsAppointment")
    console.log("type é " + type)
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('existsappointmentquery.txt', 'utf8');
    try {
      // Executa a consulta com o email passado como parâmetro
      const query = queryFromFile
        .replace(/\$1/g, `'${place}'`)
        .replace(/\$2/g, `'${day}'`)
        .replace(/\$3/g, `'${accountable}'`)
        .replace(/\$4/g, `'${type}'`);
      const result = await client.query(query);
      console.log("query é " + query)
      // Verifica se há resultados
      if (result.rows.length > 0) {
        console.log("ja existe appointment")
        return true;
      } else {
        console.log("nada encontrado ")
        // Nenhum email igual entheres no emailcontrado
        return false

      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } finally {
      // Certifique-se de liberar a conexão com o banco de dados
      client.end();
    }
  }



  public async findAll(): Promise<Appointment[]> {
    console.log("Appointmentrepo findall()");
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });

    // Retorna uma promessa que resolve com o AppointmentsArray
    return new Promise<Appointment[]>((resolve, reject) => {
      fs.readFile('getallappointmentsquery.txt', 'utf8', async (err, data) => {
        if (err) {
          console.error('Erro ao ler a consulta do arquivo:', err);
          reject(err);
          return;
        }

        try {
          // O conteúdo do arquivo se torna a consulta
          const query = data;

          // Executa a consulta
          const appointmentRecord = await client.query(query);
          console.log("return findall()");

          if (appointmentRecord) {
            var appointmentsArray: Array<Appointment> = [];
            for (var i = 0; i < appointmentRecord.rows.length; i++) {
              console.log(appointmentRecord.rows[i])
              console.log("---------")
              console.log(appointmentRecord.rows[i].name)
              appointmentsArray.push(AppointmentMap.toDomain(appointmentRecord.rows[i]));
            }
            resolve(appointmentsArray); // Resolva a promessa com o usersArray
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

  public async getAppointmentFromPlace(place: string): Promise<Appointment[]> {
    console.log("Appointmentrepo getAppointmentFromPlace()");
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });

    return new Promise<Appointment[]>((resolve, reject) => {
      fs.readFile('getappointmentfromplacequery.txt', 'utf8', async (err, data) => {
        if (err) {
          console.error('Erro ao ler a consulta do arquivo:', err);
          reject(err);
          return;
        }

        try {
          const query = data.replace(/\$1/g, `'${place}'`);
          console.log("query ->" + query)
          const appointmentRecord = await client.query(query);
          console.log("return appointmentfromplace()");

          if (appointmentRecord) {
            var appointmentsArray: Array<Appointment> = [];
            for (var i = 0; i < appointmentRecord.rows.length; i++) {
              console.log(appointmentRecord.rows[i])
              console.log("---------")
              console.log(appointmentRecord.rows[i].name)
              appointmentsArray.push(AppointmentMap.toDomain(appointmentRecord.rows[i]));
            }
            resolve(appointmentsArray);
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        } finally {
          client.end();
        }
      });
    });
  }


  public async deleteAppointment(day: string, place: string, email:string, accountable: string): Promise<Boolean> {
    console.log("this.existsAppointment")
    console.log("accountable é " + accountable)
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });
    const queryFromFile = fs.readFileSync('deleteappointmentquery.txt', 'utf8');
    try {
      // Executa a consulta com o email passado como parâmetro
      const query = queryFromFile
        .replace(/\$1/g, `'${day}'`)
        .replace(/\$2/g, `'${place}'`)
        .replace(/\$3/g, `'${email}'`)
        .replace(/\$4/g, `'${accountable}'`);
      const result = await client.query(query);
      console.log("query é " + query)
      // Verifica se há resultados
      if (result.rows.length > 0) {
        console.log("ja existe appointment")
        return true;
      } else {
        console.log("nada encontrado ")
        // Nenhum email igual entheres no emailcontrado
        return false

      }
    } catch (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } finally {
      // Certifique-se de liberar a conexão com o banco de dados
      client.end();
    }
  }

  public async getAppointmentFromClient(email: string): Promise<Appointment[]> {
    console.log("Appointmentrepo getAppointmentFromClient()");
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });

    return new Promise<Appointment[]>((resolve, reject) => {
      fs.readFile('getappointmentfromclientquery.txt', 'utf8', async (err, data) => {
        if (err) {
          console.error('Erro ao ler a consulta do arquivo:', err);
          reject(err);
          return;
        }

        try {
          const query = data.replace(/\$1/g, `'${email}'`);
          console.log("query ->" + query)
          const appointmentRecord = await client.query(query);
          console.log("return appointmentfromplace()");

          if (appointmentRecord) {
            const appointmentsArray: Array<Appointment> = appointmentRecord.rows
              .map(row => AppointmentMap.toDomain(row))
              .sort((a, b) => {
                const dateA = new Date(a.day);
                const dateB = new Date(b.day);
                return dateA.getTime() - dateB.getTime();
              });

            resolve(appointmentsArray);
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        } finally {
          client.end();
        }
      });
    });
  }


  public async getAppointmentFromPlaceAndAccountable(place: string, accountable: string): Promise<Appointment[]> {
    console.log("Appointmentrepo getAppointmentFromPlaceAndAccountable()");
    const { connectionString } = config.postgres;
    const client = new Pool({ connectionString });

    return new Promise<Appointment[]>((resolve, reject) => {
      fs.readFile('getappointmentfromplaceandaccountablequery.txt', 'utf8', async (err, data) => {
        if (err) {
          console.error('Erro ao ler a consulta do arquivo:', err);
          reject(err);
          return;
        }

        try {
          const query = data.replace(/\$1/g, `'${place}'`).replace(/\$2/g, `'${accountable}'`)

          console.log("query ->" + query)
          const appointmentRecord = await client.query(query);
          console.log("return appointmentfromplaceandaccountable()");

          if (appointmentRecord) {
            var appointmentsArray: Array<Appointment> = [];
            for (var i = 0; i < appointmentRecord.rows.length; i++) {
              console.log(appointmentRecord.rows[i])
              console.log("---------")
              console.log(appointmentRecord.rows[i].name)
              appointmentsArray.push(AppointmentMap.toDomain(appointmentRecord.rows[i]));
            }
            resolve(appointmentsArray);
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        } finally {
          client.end();
        }
      });
    });
  }

}  