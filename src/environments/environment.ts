// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://dummyjson.com',

  countries: [
    {
      name: 'India',
      code: '101',
      state: [{name:'UP',code:''}, 'MP', 'Bihar', 'Maharastra', 'Delhi'],
    },
    {
      name: 'France',
      code: '102',
      state: ['Paris Region', 'Hauts-de-France', 'Grand Est', 'Corsica', 'Centre-Val de Loire'],
    },
    {
      name: 'China',
      code: '103',
      state: ['Henan', 'Fujian', 'Zhejiang', 'Hainan', 'Sichuan'],
    },
    {
      name: 'Colombia',
      code: '104',
      state: ['Antioquia', 'Bolívar', 'Boyacá', 'Cauca', 'Cundinamarca'],
    },
    {
      name: 'Japan',
      code: '105',
      state: ['Kagoshima', 'Kagawa', 'Ehime', 'Northern', 'Saga'],
    },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
