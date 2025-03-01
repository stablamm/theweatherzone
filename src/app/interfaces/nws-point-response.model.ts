export interface NWSPointResponse {
    "@context": (string | {
      "@version": string;
      wx: string;
      s: string;
      geo: string;
      unit: string;
      "@vocab": string;
      geometry: {
        "@id": string;
        "@type": string;
      };
      city: string;
      state: string;
      distance: {
        "@id": string;
        "@type": string;
      };
      bearing: {
        "@type": string;
      };
      value: {
        "@id": string;
      };
      unitCode: {
        "@id": string;
        "@type": string;
      };
      forecastOffice: {
        "@type": string;
      };
      forecastGridData: {
        "@type": string;
      };
      publicZone: {
        "@type": string;
      };
      county: {
        "@type": string;
      };
    })[];
    id: string;
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: {
      "@id": string;
      "@type": string;
      cwa: string;
      forecastOffice: string;
      gridId: string;
      gridX: number;
      gridY: number;
      forecast: string;
      forecastHourly: string;
      forecastGridData: string;
      observationStations: string;
      relativeLocation: {
        type: string;
        geometry: {
          type: string;
          coordinates: number[];
        };
        properties: {
          city: string;
          state: string;
          distance: {
            unitCode: string;
            value: number;
          };
          bearing: {
            unitCode: string;
            value: number;
          };
        };
      };
      forecastZone: string;
      county: string;
      fireWeatherZone: string;
      timeZone: string;
      radarStation: string;
    };
  }