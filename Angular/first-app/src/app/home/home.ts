import { Component } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      @for (item of housingLocationList; track $index) {
        <app-housing-location [housingLocation]="item"></app-housing-location>
      } 
    </section>
  `,
  styles: `.results {
  display: grid;
  column-gap: 14px;
  row-gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 400px));
  margin-top: 50px;
  justify-content: space-around;
}
input[type="text"] {
  border: solid 1px var(--primary-color);
  padding: 10px;
  border-radius: 8px;
  margin-right: 4px;
  display: inline-block;
  width: 30%;
}
button {
  padding: 10px;
  border: solid 1px var(--primary-color);
  background: var(--primary-color);
  color: white;
  border-radius: 8px;
}
@media (min-width: 500px) and (max-width: 768px) {
  .results {
      grid-template-columns: repeat(2, 1fr);
  }
  input[type="text"] {
      width: 70%;
  }   
}
@media (max-width: 499px) {
  .results {
      grid-template-columns: 1fr;
  }    
}`
})
export class Home {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  
  housingLocationList: HousingLocationInfo[] = [    {      id: 0,      name: 'Acme Fresh Start Housing',      city: 'Chicago',      state: 'IL',      photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,      availableUnits: 4,      wifi: true,      laundry: true,    },    {      id: 1,      name: 'A113 Transitional Housing',      city: 'Santa Monica',      state: 'CA',      photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,      availableUnits: 0,      wifi: false,      laundry: true,    },    {      id: 2,      name: 'Warm Beds Housing Support',      city: 'Juneau',      state: 'AK',      photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,      availableUnits: 1,      wifi: false,      laundry: false,    },    {      id: 3,      name: 'Homesteady Housing',      city: 'Chicago',      state: 'IL',      photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,      availableUnits: 1,      wifi: true,      laundry: false,    },    {      id: 4,      name: 'Happy Homes Group',      city: 'Gary',      state: 'IN',      photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,      availableUnits: 1,      wifi: true,      laundry: false,    },    {      id: 5,      name: 'Hopeful Apartment Group',      city: 'Oakland',      state: 'CA',      photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,      availableUnits: 2,      wifi: true,      laundry: true,    },    {      id: 6,      name: 'Seriously Safe Towns',      city: 'Oakland',      state: 'CA',      photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,      availableUnits: 5,      wifi: true,      laundry: true,    },    {      id: 7,      name: 'Hopeful Housing Solutions',      city: 'Oakland',      state: 'CA',      photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,      availableUnits: 2,      wifi: true,      laundry: true,    },    {      id: 8,      name: 'Seriously Safe Towns',      city: 'Oakland',      state: 'CA',      photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,      availableUnits: 10,      wifi: false,      laundry: false,    },    {      id: 9,      name: 'Capital Safe Towns',      city: 'Portland',      state: 'OR',      photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,      availableUnits: 6,      wifi: true,      laundry: true,    },  ];
  
  
}
