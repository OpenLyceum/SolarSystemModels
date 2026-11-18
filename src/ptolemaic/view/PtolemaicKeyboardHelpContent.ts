/**
 * PtolemaicKeyboardHelpContent.ts
 *
 * Content for the keyboard-help dialog (the "?" button in the navigation bar).
 * Covers the screen's keyboard-accessible interactions: basic actions (Tab,
 * Reset All), the planet preset combo box, the NumberControl sliders
 * (epicycle size, eccentricity, motion rate, apogee angle, animation rate,
 * path duration), the TimeControlNode (Alt+K play/pause), and the draggable
 * Sun (PtolemaicScreenView). The Sun's RichDragListener is "leftRight" only —
 * left/right moves it around Earth, Shift in smaller steps — so its rows use
 * the key strings KeyboardDragListener registers for that direction rather than
 * MoveDraggableItemsKeyboardHelpSection, which also lists up/down.
 */

import { HotkeyData } from "scenerystack/scenery";
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

// Matches KeyboardDragListener's left/right key strings (shift is an ignored modifier).
const sunMoveHotkeyData = new HotkeyData({
  keys: ["shift?+arrowLeft", "shift?+arrowRight", "shift?+a", "shift?+d"],
  repoName: "solar-system-models",
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.moveSunStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.moveSunDescriptionStringProperty,
});

// Shift changes the step inside that same listener; this row only documents it.
const sunMoveSlowerHotkeyData = new HotkeyData({
  keys: ["shift+arrowLeft", "shift+arrowRight", "shift+a", "shift+d"],
  repoName: "solar-system-models",
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.moveSunSlowerStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.moveSunSlowerDescriptionStringProperty,
});

export class PtolemaicKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    const sun = new KeyboardHelpSection(keyboardHelpStrings.sunHeadingStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(sunMoveHotkeyData),
      KeyboardHelpSectionRow.fromHotkeyData(sunMoveSlowerHotkeyData),
    ]);

    super(
      [sun, new BasicActionsKeyboardHelpSection(), new ComboBoxKeyboardHelpSection()],
      [new SliderControlsKeyboardHelpSection(), new TimeControlsKeyboardHelpSection()],
    );
  }
}
