import { Service, Inject } from 'typedi';

import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { Planning } from '../domain/planning';
import { PlanningMap } from '../mappers/PlanningMap';
import { callbackify } from 'util';
import { reject } from 'lodash';
import { Travels } from '../domain/travels';
import ITravelsRepo from '../services/IRepos/ITravelsRepo';
import { TravelsMap } from '../mappers/TravelsMap';
import { ITravelsPersistence } from '../dataschema/ITravelsPersistence';
import { Document, FilterQuery, Model } from 'mongoose';

@Service()
export default class TravelsRepo implements ITravelsRepo {

  constructor(
    @Inject('travelsSchema') private travelsSchema: Model<ITravelsPersistence & Document>,) { }
  exists(t: Travels): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async findAll(): Promise<Travels[]> {
    const travelsRecord = await this.travelsSchema.find();

    if (travelsRecord != null) {
      var travelsArray: Array<Travels> = [];
      for (var i = 0; i < travelsRecord.length; i++) {
        travelsArray.push(TravelsMap.toDomain(travelsRecord[i]));
      }
      return travelsArray;  
    }
    else
      return null;
  }

  public async generateTravels(data: string): Promise<Travels> {

    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'http://localhost:8000/travels',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "date": new Number(data)
      })

    };
    let travels = null;

    function getPromise(data, options) {
      return new Promise((resolve, reject) => {
        request(options, function (error, response) {
          if (error) {
            reject(error);
          } else {
            var viagens = JSON.parse(response.body).viagens;

            travels = TravelsMap.toDomainFromPlanning(data, viagens);
            resolve(travels);
          }
        })
      });
    }

    travels = getPromise(data, options);
    return travels;
  }

  public async getTravelsByDate(date: string): Promise<Travels> {
    const query = { date: date };

    const travelsRecord = await this.travelsSchema.findOne(query as FilterQuery<ITravelsPersistence & Document>);

    if (travelsRecord != null) {
      return TravelsMap.toDomain(travelsRecord);
    }
    else
      return null;
  }

  public async save(travels: Travels): Promise<Travels> {
    const query = { domainId: travels.id.toString() };

    const travelsDocument = await this.travelsSchema.findOne(query);

    try {
      if (travelsDocument === null) {
        const rawTravels: any = TravelsMap.toPersistence(travels);

        console.log(rawTravels);
        const travelsCreated = await this.travelsSchema.create(rawTravels);

        return TravelsMap.toDomain(travelsCreated);
      } else {
        travelsDocument.date = travels.date;
        travelsDocument.travels = travels.travels;
        await travelsDocument.save();

        return travels;
      }
    } catch (err) {
      throw err;
    }
  }
}