import React from "react";
import { SVGProps } from "react";

// --- Import all custom icons ---
import {
  LotusIcon,
  CherryBlossomIcon,
  HibiscusIcon,
  SunIcon,
  SunriseIcon,
  MoonIcon,
  StarIcon,
  GlowingStarIcon,
  SparkleEmojiIcon,
  FireIcon,
  DoveIcon,
  EvergreenIcon,
  LeafEmojiIcon,
  SeedlingIcon,
  FlutteringLeafIcon,
  WaterIcon,
  ShowerIcon,
  WaveIcon
} from "../icons/NatureIcons";

import {
  WoodenFishIcon,
  WoodLogIcon,
  DrumIcon,
  BooksIcon,
  BookEmojiIcon,
  CandleIcon,
  BeadsIcon,
  BroomIcon,
  SoapIcon,
  RiceIcon,
  BowlIcon,
  SaladIcon,
  TeaIcon,
  AppleIcon,
  PotOfFoodIcon,
  ShrineIcon,
  HeadstoneIcon,
  BellEmojiIcon,
  TempleIcon,
  CoinIcon,
  BatteryIcon,
  TeddyBearIcon,
  NotebookIcon,
  HeadphonesIcon,
  LinkIcon,
  ChainsIcon
} from "../icons/ObjectIcons";

import {
  PrayIcon,
  OpenHandsIcon,
  KneelingIcon,
  MeditationIcon,
  ManMeditatingIcon,
  HeartEmojiIcon,
  YellowHeartIcon,
  OrangeHeartIcon,
  WalkingIcon,
  ChatIcon,
  SpeakingHeadIcon,
  RelievedFaceIcon,
  SmileIcon,
  HandshakeIcon,
  BloodDropIcon,
  NoMobileIcon,
  ZipperFaceIcon,
  OldManIcon,
  NoSmokingIcon,
  ZzzIcon,
  RecycleIcon
} from "../icons/ActionIcons";

export type IconProps = SVGProps<SVGSVGElement>;

// Map emojis directly to their unique components
export const missionIconMap: Record<string, React.ComponentType<IconProps>> = {
  // --- Nature & Spiritual ---
  "🪷": LotusIcon,
  "🌸": CherryBlossomIcon,
  "🌺": HibiscusIcon,
  "☀️": SunIcon,
  "☀": SunIcon,
  "🌅": SunriseIcon,
  "🌙": MoonIcon,
  "⭐": StarIcon,
  "🌟": GlowingStarIcon,
  "✨": SparkleEmojiIcon,
  "🔥": FireIcon,
  "🕊️": DoveIcon,
  "🌲": EvergreenIcon,
  "🌿": LeafEmojiIcon,
  "🌱": SeedlingIcon,
  "🍃": FlutteringLeafIcon,
  "💧": WaterIcon,
  "🚿": ShowerIcon,
  "🌊": WaveIcon,

  // --- Objects ---
  "🐟": WoodenFishIcon,
  "🪵": WoodLogIcon,
  "🥁": DrumIcon,
  "📚": BooksIcon,
  "📖": BookEmojiIcon,
  "🕯": CandleIcon,
  "🕯️": CandleIcon,
  "📿": BeadsIcon,
  "🧹": BroomIcon,
  "🧼": SoapIcon,
  "🍚": RiceIcon,
  "🥣": BowlIcon,
  "🥗": SaladIcon,
  "🍵": TeaIcon,
  "🍎": AppleIcon,
  "🍲": PotOfFoodIcon,
  "⛩️": ShrineIcon,
  "🪦": HeadstoneIcon,
  "🔔": BellEmojiIcon,
  "🛕": TempleIcon,
  "🪙": CoinIcon,
  "🔋": BatteryIcon,
  "🧸": TeddyBearIcon,
  "📓": NotebookIcon,
  "🎧": HeadphonesIcon,
  "🔗": LinkIcon,
  "⛓️": ChainsIcon,

  // --- Emotions & Actions ---
  "🙏": PrayIcon,
  "🤲": OpenHandsIcon,
  "🧎": KneelingIcon,
  "🧘": MeditationIcon,
  "🧘‍♂️": ManMeditatingIcon,
  "❤️": HeartEmojiIcon,
  "❤": HeartEmojiIcon,
  "💛": YellowHeartIcon,
  "🧡": OrangeHeartIcon,
  "🚶": WalkingIcon,
  "💬": ChatIcon,
  "🗣️": SpeakingHeadIcon,
  "😌": RelievedFaceIcon,
  "😊": SmileIcon,
  "🤝": HandshakeIcon,
  "🩸": BloodDropIcon,
  "📵": NoMobileIcon,
  "🤐": ZipperFaceIcon,
  "👴": OldManIcon,
  "🚭": NoSmokingIcon,
  "💤": ZzzIcon,
  "♻️": RecycleIcon,
};

// --- Helper Functions ---

/**
 * Clean gender markers and variation selectors from emojis for fallback matching
 */
function normalizeMissionIcon(icon: string): string {
  return icon
    .replace(/\uFE0F/g, "")
    .replace(/[\u200D\u2642\u2640]/g, "")
    .trim();
}

/**
 * Renders the corresponding custom SVG icon for a given emoji string.
 */
export function MissionIcon({ icon, ...props }: { icon: string } & IconProps) {
  const normalizedIcon = normalizeMissionIcon(icon || "");
  
  // 1. Try exact match
  // 2. Try normalized match
  // 3. Fallback to LotusIcon if totally unknown
  const Icon = missionIconMap[icon || ""] || missionIconMap[normalizedIcon] || LotusIcon;
  
  return <Icon {...props} />;
}

// Export all so they can be individually used elsewhere if needed
export * from "../icons/NatureIcons";
export * from "../icons/ObjectIcons";
export * from "../icons/ActionIcons";
