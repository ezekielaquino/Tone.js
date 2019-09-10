import { expect } from "chai";
import { connectFrom } from "test/helper/Connect";
import { Offline } from "test/helper/Offline";

// tslint:disable-next-line
export function OscillatorTests(Constr, args?): void {

	context("Oscillator Tests", () => {

		it("can be created with an options object", () => {
			const instance = new Constr({
				detune : -20,
				frequency : 200,
			});
			expect(instance.frequency.value).to.equal(200);
			expect(instance.detune.value).to.equal(-20);
			instance.dispose();
		});

		it("can set/set the frequency", () => {
			const instance = new Constr(args);
			instance.frequency.value = 110;
			expect(instance.frequency.value).to.equal(110);
			instance.start();
			instance.frequency.value = 220;
			expect(instance.frequency.value).to.equal(220);
			instance.dispose();
		});

		it("can set/set the detune", () => {
			const instance = new Constr(args);
			instance.detune.value = -50;
			expect(instance.detune.value).to.equal(-50);
			instance.start();
			instance.detune.value = 92;
			expect(instance.detune.value).to.equal(92);
			instance.dispose();
		});

		it("can connect to detune and frequency", () => {
			const instance = new Constr(args);
			connectFrom().connect(instance.frequency);
			connectFrom().connect(instance.detune);
			instance.dispose();
		});

		it("can get/set the phase", () => {
			const osc = new Constr({
				phase : 180,
			});
			expect(osc.phase).to.be.closeTo(180, 0.001);
			osc.phase = 270;
			expect(osc.phase).to.be.closeTo(270, 0.001);
			osc.dispose();
		});

		it("does not clip in volume", () => {
			return Offline(() => {
				new Constr(args).toDestination().start(0);
			}).then((buffer) => {
				expect(buffer.max()).to.be.at.most(1);
			});
		});

	});

}