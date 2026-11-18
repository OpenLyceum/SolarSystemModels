/**
 * ConfigurationsKeyboardHelpContent.ts
 *
 * Content for the keyboard-help dialog (the "?" button in the navigation bar).
 * Covers basic actions, the planet combo boxes, the NumberControl sliders, the
 * TimeControlNode (Alt+K play/pause), and the three keyboard drags:
 *
 * - the observer and target planets (ConfigurationsScreenView) — left/right
 *   moves the planet along its orbit, which sets the time;
 * - the synodic timeline (ConfigurationsTimeline) — up/down scrubs time;
 * - the zodiac band (ConfigurationsZodiacStrip) — left/right pans the band.
 *
 * Each is a single-axis RichDragListener. MoveDraggableItemsKeyboardHelpSection
 * documents all four directions, which none of these listeners binds, so the
 * rows use the key strings KeyboardDragListener actually registers for
 * "leftRight" / "upDown". No second listener is added. In every drag Shift
 * selects the listener's smaller shiftDragDelta.
 */

import { HotkeyData, type OneKeyStroke } from "scenerystack/scenery";
import {
  BasicActionsKeyboardHelpSection,
  ComboBoxKeyboardHelpSection,
  KeyboardHelpSection,
  KeyboardHelpSectionRow,
  SliderControlsKeyboardHelpSection,
  TimeControlsKeyboardHelpSection,
  TwoColumnKeyboardHelpContent,
} from "scenerystack/scenery-phet";
import { StringManager } from "../../i18n/StringManager.js";

const keyboardHelpStrings = StringManager.getInstance().getKeyboardHelpStrings();

// KeyboardDragListener's "leftRight" / "upDown" key strings (shift is an ignored modifier).
const LEFT_RIGHT_KEYS: OneKeyStroke[] = ["shift?+arrowLeft", "shift?+arrowRight", "shift?+a", "shift?+d"];
const LEFT_RIGHT_SHIFT_KEYS: OneKeyStroke[] = ["shift+arrowLeft", "shift+arrowRight", "shift+a", "shift+d"];
const UP_DOWN_KEYS: OneKeyStroke[] = ["shift?+arrowUp", "shift?+arrowDown", "shift?+w", "shift?+s"];
const UP_DOWN_SHIFT_KEYS: OneKeyStroke[] = ["shift+arrowUp", "shift+arrowDown", "shift+w", "shift+s"];

const planetMoveHotkeyData = new HotkeyData({
  keys: LEFT_RIGHT_KEYS,
  repoName: "solar-system-models",
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.movePlanetStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.movePlanetDescriptionStringProperty,
});

// Shift changes the step inside the same listener; this row only documents it.
const planetMoveSlowerHotkeyData = new HotkeyData({
  keys: LEFT_RIGHT_SHIFT_KEYS,
  repoName: "solar-system-models",
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.movePlanetSlowerStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.movePlanetSlowerDescriptionStringProperty,
});

const timelineScrubHotkeyData = new HotkeyData({
  keys: UP_DOWN_KEYS,
  repoName: "solar-system-models",
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.scrubTimelineStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.scrubTimelineDescriptionStringProperty,
});

const timelineScrubSlowerHotkeyData = new HotkeyData({
  keys: UP_DOWN_SHIFT_KEYS,
  repoName: "solar-system-models",
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.scrubTimelineSlowerStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.scrubTimelineSlowerDescriptionStringProperty,
});

const zodiacPanHotkeyData = new HotkeyData({
  keys: LEFT_RIGHT_KEYS,
  repoName: "solar-system-models",
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.panStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.panDescriptionStringProperty,
});

const zodiacPanSlowerHotkeyData = new HotkeyData({
  keys: LEFT_RIGHT_SHIFT_KEYS,
  repoName: "solar-system-models",
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.panSlowerStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.panSlowerDescriptionStringProperty,
});

export class ConfigurationsKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    const planets = new KeyboardHelpSection(keyboardHelpStrings.planetsHeadingStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(planetMoveHotkeyData),
      KeyboardHelpSectionRow.fromHotkeyData(planetMoveSlowerHotkeyData),
    ]);
    const timeline = new KeyboardHelpSection(keyboardHelpStrings.timelineHeadingStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(timelineScrubHotkeyData),
      KeyboardHelpSectionRow.fromHotkeyData(timelineScrubSlowerHotkeyData),
    ]);
    const zodiac = new KeyboardHelpSection(keyboardHelpStrings.zodiacHeadingStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(zodiacPanHotkeyData),
      KeyboardHelpSectionRow.fromHotkeyData(zodiacPanSlowerHotkeyData),
    ]);

    super(
      [planets, timeline, zodiac, new BasicActionsKeyboardHelpSection()],
      [
        new SliderControlsKeyboardHelpSection(),
        new ComboBoxKeyboardHelpSection(),
        new TimeControlsKeyboardHelpSection(),
      ],
    );
  }
}
