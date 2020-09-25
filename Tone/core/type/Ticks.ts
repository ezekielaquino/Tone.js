import { getContext } from "../Global";
import { TimeBaseUnit, TimeValue } from "./TimeBase";
import { TransportTimeClass } from "./TransportTime";
import { Seconds, Ticks as TicksType } from "./Units";

/**
 * Ticks is a primitive type for encoding Time values.
 * Ticks can be constructed with or without the `new` keyword. Ticks can be passed
 * into the parameter of any method which takes time as an argument.
 * @example
 * const t = Tone.Ticks("4n"); // a quarter note as ticks
 * @category Unit
 */
export class TicksClass extends TransportTimeClass<TicksType> {

	readonly name: string = "Ticks";

	readonly defaultUnits: TimeBaseUnit = "i";

	/**
	 * Get the current time in the given units
	 */
	protected _now(): TicksType {
		return this.context.transport.ticks;
	}

	/**
	 * Return the value of the beats in the current units
	 */
	protected _beatsToUnits(beats: number): TicksType {
		return this._getPPQ() * beats;
	}

	/**
	 * Returns the value of a second in the current units
	 */
	protected _secondsToUnits(seconds: Seconds): TicksType {
		return Math.floor(seconds / (60 / this._getBpm()) * this._getPPQ());
	}

	/**
	 * Returns the value of a tick in the current time units
	 */
	protected _ticksToUnits(ticks: TicksType): TicksType {
		return ticks;
	}

	/**
	 * Return the time in ticks
	 */
	toTicks(): TicksType {
		return this.valueOf() as TicksType;
	}

	/**
	 * Return the time in seconds
	 */
	toSeconds(): Seconds {
		return (this.valueOf() / this._getPPQ()) * (60 / this._getBpm());
	}
}

/**
 * Convert a time representation to ticks
 * @category Unit
 */
export function Ticks(value?: TimeValue, units?: TimeBaseUnit): TicksClass {
	return new TicksClass(getContext(), value, units);
}
