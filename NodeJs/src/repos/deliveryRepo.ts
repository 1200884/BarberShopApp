import { Service, Inject } from 'typedi';

import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { Planning } from '../domain/planning';
import { PlanningMap } from '../mappers/PlanningMap';
import { callbackify } from 'util';
import { reject } from 'lodash';
import { Delivery } from '../domain/delivery';
import IDeliveryRepo from '../services/IRepos/IDeliveryRepo';
import { DeliveryMap } from '../mappers/DeliveryMap';

@Service()
export default class DeliveryRepo implements IDeliveryRepo {

    constructor() { }
    exists(t: Delivery): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    save(t: Delivery): Promise<Delivery> {
        throw new Error('Method not implemented.');
    }

    public async findByDomainId(deliveryId: string): Promise<Delivery> {

        var request = require('request');
        var options = {
            'method': 'GET',
            'url': 'https://localhost:5001/api/Deliveries/' + deliveryId,
            'headers': {
            }
        };
        let delivery = null;

        function getPromise(options) {
            return new Promise((resolve, reject) => {
                request(options, function (error, response) {
                    if (error) {
                        reject(error);
                    } else {
                        delivery = DeliveryMap.toDomain(JSON.parse(response.body));
                        resolve(delivery);
                    }
                })
            });
        }

        delivery = getPromise(options);
        return delivery;
    }

    findAll(): Promise<Delivery[]> {
        var request = require('request');
        var options = {
            'method': 'GET',
            'url': 'https://localhost:5001/api/Deliveries/',
            'headers': {
            }
        };
        let delivery = null;

        function getPromise(options) {
            return new Promise((resolve, reject) => {
                request(options, function (error, response) {
                    if (error) {
                        reject(error);
                    } else {
                        console.log(response.body);
                        delivery = DeliveryMap.toDomain(JSON.parse(response.body));
                        resolve(delivery);
                    }
                })
            });
        }

        delivery = getPromise(options);
        return delivery;
    }
}