import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import citiesJson from '$lib/assets/lt.json';

export const citiesStore: Writable<City[]> = localStorageStore('citiesStore', [])
export const cityNamesStore: Writable<string[]> = localStorageStore('cityNamesStore', [])

export const getCityData = (cityName: string) => {
    const cities = get(citiesStore);
    const cityPosition = cities.findIndex((city) => {
        return city.city.toLowerCase() == cityName.toLowerCase();
    });
    return cities[cityPosition];
}

export const setCityGuessStatus = (cityName: string, status: boolean) => {
    const cities = get(citiesStore);
    const cityPosition = cities.findIndex((city) => {
        return city.city.toLowerCase() == cityName.toLowerCase();
    });
    citiesStore.update(() => {
        cities[cityPosition].guessed = status;
        return cities;
    });
}

export const removeCityStoreName = (cityNameToDelete: string) => {
    const cities = get(cityNamesStore);
    const cityPosition = cities.findIndex((cityName) => {
        return cityName.toLowerCase() == cityNameToDelete.toLowerCase();
    });
    cityNamesStore.update(() => {
        cities.splice(cityPosition, 1)
        return cities;
    });
}

export const resetCitiesStore = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cities: City[] = citiesJson.map(({ country, iso2, admin_name, capital, population_proper, ...keepAttrs }) => ({ ...keepAttrs, guessed: false }))
    const cityNames: string[] = cities.map((city) => city.city)

    cityNamesStore.set(cityNames.sort((a, b) => a.localeCompare(b, 'lt')));
    citiesStore.set(cities);
}