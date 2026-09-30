/**
 * ConfigurationsKeyboardHelpContent.ts
 *
 * Content for the keyboard-help dialog (the "?" button in the navigation bar).
 * Covers basic actions, the planet combo boxes, the NumberControl sliders, and
 * keyboard-panning the zodiac band (ConfigurationsZodiacStrip). That pan is a
 * left/right RichDragListener. MoveDraggableItemsKeyboardHelpSection also
 * documents up/down and W/S, which the listener does not bind, so the zodiac
 * rows use the left/right key strings KeyboardDragListener actually registers.
 * No second listener is added.
 */

import { HotkeyData } from "scenerystack/scenery";
import {
  BasicActionsKeyboardHelpSection,
  ComboBoxKeyboardHelpSection,
  KeyboardHelpSection,
  KeyboardHelpSectionRow,
  SliderControlsKeyboardHelpSection,
  TwoColumnKeyboardHelpContent,
} from "scenerystack/scenery-phet";
import { StringManager } from "../../i18n/StringManager.js";

const keyboardHelpStrings = StringManager.getInstance().getKeyboardHelpStrings();

// Matches KeyboardDragListener's left/right key strings (shift is an ignored modifier).
const zodiacPanHotkeyData = new HotkeyData({
  keys: ["shift?+arrowLeft", "shift?+arrowRight", "shift?+a", "shift?+d"],
  repoName: "solar-system-models",
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.panStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.panDescriptionStringProperty,
});

// Shift changes the pan step inside that same listener; this row only documents it.
const zodiacPanSlowerHotkeyData = new HotkeyData({
  keys: ["shift+arrowLeft", "shift+arrowRight", "shift+a", "shift+d"],
  repoName: "solar-system-models",
  keyboardHelpDialogLabelStringProperty: keyboardHelpStrings.panSlowerStringProperty,
  keyboardHelpDialogPDOMLabelStringProperty: keyboardHelpStrings.panSlowerDescriptionStringProperty,
});

export class ConfigurationsKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    const zodiac = new KeyboardHelpSection(keyboardHelpStrings.zodiacHeadingStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(zodiacPanHotkeyData),
      KeyboardHelpSectionRow.fromHotkeyData(zodiacPanSlowerHotkeyData),
    ]);

    super(
      [new BasicActionsKeyboardHelpSection(), new ComboBoxKeyboardHelpSection(), zodiac],
      [new SliderControlsKeyboardHelpSection()],
    );
  }
}
