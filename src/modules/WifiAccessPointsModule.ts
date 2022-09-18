import { NativeModules, Platform } from "react-native";

const { WiFiAccessPointsModule } = NativeModules;

export type NearbyAccessPoint = {
  macAddress: string;
  signalStrength: number;
  age: number;
  channel: number;
  signalToNoiseRatio: number;
};

export const getNearbyAccessPoints = (): Promise<NearbyAccessPoint[]> => {
  if (Platform.OS === "android") {
    return WiFiAccessPointsModule.getNearbyAccessPoints();
  }
  // Android以外はまだ対応していない
  return Promise.resolve([]);
};
