import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import ITravelsDTO from "../dto/ITravelsDTO";
import { TravelsId } from "./travelsId";

interface TravelsProps {
    date: number;
    travels: [[string]];
}

export class Travels extends AggregateRoot<TravelsProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get travelsId(): TravelsId {
        return new TravelsId(this.travelsId.toValue());
    }

    get date(): number {
        return this.props.date;
    }

    set date(value: number) {
        this.props.date = value;
    }

    get travels(): [[string]] {
        return this.props.travels;
    }

    set travels(value: [[string]]) {
        this.props.travels = value;
    }

    private constructor(props: TravelsProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(travelsDTO: ITravelsDTO, id?: UniqueEntityID): Result<Travels> {
        const date = travelsDTO.date;
        const travels = travelsDTO.travels;

        const travelsObject = new Travels({ date: date, travels: travels }, id);
        return Result.ok<Travels>(travelsObject);
    }

    public static createNew(date: number, travels: [[string]], id?: UniqueEntityID) {
        const travelsObject = new Travels({ date: date, travels: travels }, id);
        return Result.ok<Travels>(travelsObject);
    }
}
