// let search = document.getElementById("search") as HTMLInputElement;
// let currentLocation = document.querySelector(
//   ".currentLocation"
// ) as HTMLButtonElement;

// interface Weather {
//   baseUrl: string;
//   today: object[];
//   pastDays: object[];
//   forcastDays: object[];
//   search: string;
//   _key: string;
// }

// class Weather {
//   constructor() {
//     this.baseUrl = "http://api.weatherapi.com/v1/";
//     this._key = "58d16ebc01b6449bae5143135230110";
//     this.today = [];
//     this.pastDays = [];
//     this.forcastDays = [];
//     this.search = "Cairo";
//   }
//   async getToday() {
//     const response = await fetch(
//       `${this.baseUrl}current.json?q=${this.search}`,
//       {
//         method: "GET",
//         headers: {
//           key: this._key,
//         },
//       }
//     );
//     this.today = await response.json().then((data) => {
//       // console.log(data);
//       return data;
//     });
//   }
//   getPast() {}
//   getForcast() {}
// }

// let myWe = new Weather();
// myWe.getToday();
