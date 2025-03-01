export interface NWSForecastResponse {
    "@context": (string | { [key: string]: any })[];
    type: string;
    geometry: {
      type: string;
      coordinates: number[][][];
    };
    properties: {
      units: string;
      forecastGenerator: string;
      generatedAt: string;
      updateTime: string;
      validTimes: string;
      elevation: {
        unitCode: string;
        value: number;
      };
      periods: Period[];
    };
  }
  
  export interface Period {
    number: number;
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    temperatureTrend: string;
    probabilityOfPrecipitation: {
      unitCode: string;
      value: number | null;
    };
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
  }
  