export enum OperatingSystem {
  ANDROID = 'android',
  IOS = 'ios',
}

export interface Device {
  id: string;
  name: string;
  os: OperatingSystem;
  isAvailable: boolean;
}

export interface Session {
  id: string;
  deviceId: string;
  startTime: Date;
  endTime?: Date;
}
