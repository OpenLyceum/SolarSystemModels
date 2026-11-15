/**
 * Memory-leak regression suite (fleet standard): TimeModel is collected after dispose(),
 * survives a double dispose(), and leaves no survivors across repeated cycles
 * (tests/helpers/memoryLeak.ts).
 *
 * ConfigurationsModel and PtolemaicModel have no dispose() of their own (they own their
 * TimeModel and Properties for the whole sim), so they are checked with create/drop +
 * forceGC. CelestialBodyNode is not covered: it Multilinks position + mvt and is not
 * torn down by dispose(), so it lives as long as its screen.
 */

import { describe, expect, it } from "vitest";
import { TimeModel } from "../src/common/TimeModel.js";
import { ConfigurationsModel } from "../src/configurations/model/ConfigurationsModel.js";
import { PtolemaicModel } from "../src/ptolemaic/model/PtolemaicModel.js";
import { describeDisposalLeaks, forceGC } from "./helpers/memoryLeak.js";

type ScreenModel = ConfigurationsModel | PtolemaicModel;

const SCREEN_MODELS: readonly { name: string; create: () => ScreenModel }[] = [
  { name: "ConfigurationsModel", create: () => new ConfigurationsModel() },
  { name: "PtolemaicModel", create: () => new PtolemaicModel() },
];

function createAndDropModel(create: () => ScreenModel): WeakRef<object> {
  const model = create();
  model.timer.isPlayingProperty.value = true;
  for (let i = 0; i < 30; i++) {
    model.step(1 / 60);
  }
  model.reset();
  return new WeakRef<object>(model);
}

describe("Screen models (no dispose(): create/drop)", () => {
  for (const { name, create } of SCREEN_MODELS) {
    it(`${name} is collected after drop`, async () => {
      const ref = createAndDropModel(create);
      await forceGC(ref);
      expect(ref.deref()).toBeUndefined();
    });

    it(`${name}: repeated create/drop cycles leave no survivors`, async () => {
      const refs: WeakRef<object>[] = [];
      for (let i = 0; i < 10; i++) {
        refs.push(createAndDropModel(create));
      }
      await forceGC(refs);
      expect(refs.filter((r) => r.deref() !== undefined).length).toBe(0);
    });
  }
});

describeDisposalLeaks([{ name: "TimeModel", create: () => new TimeModel(), idempotentDispose: true }]);
