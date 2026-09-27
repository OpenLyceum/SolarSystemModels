import { Multilink } from "scenerystack/axon";
import { toFixed } from "scenerystack/dot";
import { StringUtils } from "scenerystack/phetcommon";
import { Text, VBox } from "scenerystack/scenery";
import { PhetFont } from "scenerystack/scenery-phet";
import { SolarSystemModelsPanel } from "../../common/SolarSystemModelsPanel.js";
import { StringManager } from "../../i18n/StringManager.js";
import SolarSystemModelsColors from "../../SolarSystemModelsColors.js";
import { DISPLAY_DAYS_PER_YEAR } from "../../SolarSystemModelsConstants.js";
import type { ConfigurationsModel } from "../model/ConfigurationsModel.js";
import { eventNameLabel } from "./eventNameLabel.js";

const READOUT_FONT = new PhetFont(12);
/** The readout sits in the top-left corner of the orbit area, clear of the zodiac ring. */
const READOUT_MAX_WIDTH = 200;
const FONT_OPTS = {
  font: READOUT_FONT,
  fill: SolarSystemModelsColors.textColorProperty,
  maxWidth: READOUT_MAX_WIDTH,
} as const;

export class ConfigurationsTimeReadout extends SolarSystemModelsPanel {
  public constructor(model: ConfigurationsModel) {
    const s = StringManager.getInstance().getConfigurationsStrings();

    const timeText = new Text("", FONT_OPTS);
    const synodicText = new Text("", FONT_OPTS);
    const configText = new Text("", FONT_OPTS);
    const countdownText = new Text("", FONT_OPTS);

    Multilink.multilink(
      [
        model.timeProperty,
        model.timelineTimeOffsetProperty,
        model.synodicPeriodProperty,
        s.synodicPeriodStringProperty,
        s.elapsedTimePatternStringProperty,
        s.yearsValuePatternStringProperty,
      ] as const,
      (time, offset, synodic, synodicLabel, elapsedPattern, yearsPattern) => {
        const displayTime = time + offset;
        const absTime = Math.abs(displayTime);
        const totalDays = absTime * DISPLAY_DAYS_PER_YEAR;
        const yrs = Math.floor(absTime);
        const days = totalDays - yrs * DISPLAY_DAYS_PER_YEAR;
        const sign = displayTime < 0 ? "-" : "";
        timeText.string = StringUtils.fillIn(elapsedPattern, {
          total: `${sign}${toFixed(absTime, 3)}`,
          years: `${sign}${yrs}`,
          days: `${sign}${toFixed(days, 1)}`,
        });
        synodicText.string = `${synodicLabel} ${StringUtils.fillIn(yearsPattern, { value: toFixed(synodic, 3) })}`;
      },
    );

    Multilink.multilink(
      [
        model.currentConfigurationProperty,
        s.oppositionStringProperty,
        s.quadratureEasternStringProperty,
        s.conjunctionStringProperty,
        s.quadratureWesternStringProperty,
        s.inferiorConjunctionStringProperty,
        s.greatestElongationWesternStringProperty,
        s.superiorConjunctionStringProperty,
        s.greatestElongationEasternStringProperty,
      ] as const,
      (cfg) => {
        configText.string = eventNameLabel(cfg);
        // Hidden when empty so the panel does not reserve a blank row.
        configText.visible = configText.string !== "";
      },
    );

    Multilink.multilink(
      [
        model.countdownRemainingProperty,
        s.pausedForStringProperty,
        s.secondStringProperty,
        s.secondsStringProperty,
      ] as const,
      (remaining, pausedFor, second, seconds) => {
        if (remaining > 0) {
          const secs = Math.ceil(remaining);
          const unit = secs === 1 ? second : seconds;
          countdownText.string = StringUtils.fillIn(pausedFor, { seconds: String(secs), unit });
        } else {
          countdownText.string = "";
        }
        countdownText.visible = countdownText.string !== "";
      },
    );

    const content = new VBox({
      children: [timeText, synodicText, configText, countdownText],
      spacing: 4,
      align: "left",
    });

    super(content);
  }
}
