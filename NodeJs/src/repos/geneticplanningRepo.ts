import { Service, Inject } from 'typedi';

import IGeneticPlanningRepo from '../services/IRepos/IGeneticPlanningRepo';
import { GeneticPlanning } from '../domain/geneticplanning';
import { callbackify } from 'util';
import { reject } from 'lodash';
import { GeneticPlanningAnswerMap } from '../mappers/GeneticPlanningAnswerMap';
import { GeneticPlanningAnswer } from '../domain/geneticplanningAnswer';
import { response } from 'express';

@Service()
export default class GeneticPlanningRepo implements IGeneticPlanningRepo {

  constructor() { }
    save(t: GeneticPlanningAnswer): Promise<GeneticPlanningAnswer> {
        throw new Error('Method not implemented.');
    }
  exists(t: GeneticPlanningAnswer): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
 /* save(t: GeneticPlanning): Promise<GeneticPlanning> {
    throw new Error('Method not implemented.');
  }*/

  public async findByDomainId(date: number,nrgeracoes:number,tamanhopop:number,probcruzamento:number,probmutacao:number): Promise<String> {
    let planniing;
    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'http://localhost:5000/geneticplanning',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "date": new Number(date),
        "nrgeracoes": new Number(nrgeracoes),
        "tamanhopop": new Number(tamanhopop),
        "probcruzamento": new Number(probcruzamento),
        "probmutacao": new Number(probmutacao)
      })

    };
    let geneticplanning = null;

    function getPromise(options) {
      return new Promise((resolve, reject) => {
        request(options, function (error, response) {
          if (error) {
            reject(error);
          } else {
            
            console.log("response body is "+JSON.parse(response.body).places);
            planniing=JSON.parse(response.body).places;

            console.log("response body is not");
            var planning = GeneticPlanningAnswerMap.toDomain(JSON.parse(response.body));
            console.log("ai pai " + planning);
            resolve(planniing);
          }
        })
      });
    }
    geneticplanning = getPromise(options);
    return geneticplanning;
    geneticplanning = getPromise(options);
    console.log("geneticc planing is "+geneticplanning);
    return geneticplanning;
  }
}