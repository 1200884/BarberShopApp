import { AggregateRoot } from "../core/domain/AggregateRoot";

import { Result } from "../core/logic/Result";

import IGeneticPlanningDTO from "../dto/IGeneticPlanningDTO";

interface GeneticPlanningProps {
    //places: [string];
    date:number,
    nrgeracoes:number,
    tamanhopop:number,
    probcruzamento:number,
    probmutacao:number,
}

export class GeneticPlanning extends AggregateRoot<GeneticPlanningProps> {

 /*get places (): [string] {
    return this.props.places;
  }

  set places ( value: [string]) {
    this.props.places = value;
  }*/
  
  get date():number{
    return this.props.date;
  }
  get nrgeracoes():number{
    return this.props.nrgeracoes;
  }
  get tamanhopop():number{
    return this.props.tamanhopop;
  }
  get probcruzamento():number{
    return this.props.probcruzamento;
  }
  get probmutacao():number{
    return this.props.probmutacao;
  }

  set date ( value: number) {
    this.props.date = value;
  }
  set nrgeracoes ( value: number) {
    this.props.nrgeracoes = value;
  }
  set tamanhopop ( value: number) {
    this.props.tamanhopop = value;
  }
  set probcruzamento ( value: number) {
    this.props.probcruzamento = value;
  }
  set probmutacao ( value:number) {
    this.props.probmutacao = value;
  }
  

  private constructor (props: GeneticPlanningProps) {
    super(props);
  }

  public static create (geneticplanningDTO: IGeneticPlanningDTO): Result<GeneticPlanning> {
    
    const date = geneticplanningDTO.date;
    const geracoes = geneticplanningDTO.nrgeracoes;
    const populacao = geneticplanningDTO.tamanhopop;
    const cruzamento = geneticplanningDTO.probcruzamento;
    const mutacao = geneticplanningDTO.probmutacao;
      const geneticplanning = new GeneticPlanning({date: date,nrgeracoes: geracoes,tamanhopop: populacao,probcruzamento: cruzamento, probmutacao: mutacao});
      return Result.ok<GeneticPlanning>( geneticplanning )
    }
  }

