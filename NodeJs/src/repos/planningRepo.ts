import { Service, Inject } from 'typedi';

import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { Planning } from '../domain/planning';
import { PlanningMap } from '../mappers/PlanningMap';
import { callbackify } from 'util';
import { reject } from 'lodash';

@Service()
export default class PlanningRepo implements IPlanningRepo {

  constructor() { }
  exists(t: Planning): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  save(t: Planning): Promise<Planning> {
    throw new Error('Method not implemented.');
  }

  public async findByDomainId(truckId: string, data: string): Promise<Planning> {

    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'http://localhost:8000/planning',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "truckId": truckId,
        "date": new Number(data)
      })

    };
    let planning = null;

    function getPromise(options) {
      return new Promise((resolve, reject) => {
        request(options, function (error, response) {
          if (error) {
            reject(error);
          } else {
            console.log(response.body);
            
            planning = PlanningMap.toDomain(JSON.parse(response.body));
            resolve(planning);
          }
        })
      });
    }
 
    planning = getPromise(options);
    return planning;
  }
}