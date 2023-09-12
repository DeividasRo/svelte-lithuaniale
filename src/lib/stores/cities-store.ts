import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import citiesJson from '$lib/assets/lt.json';

export const citiesStore: Writable<City[]> = localStorageStore('citiesStore', [])


export const getCityData = (cityName: string) => {
    let cities = get(citiesStore);
    const cityPosition = cities.findIndex((city) => {
        return city.city.toLowerCase() == cityName.toLowerCase();
    });
    return cities[cityPosition];
}

export const getCityNames = () => {
    let cities = get(citiesStore);
    return cities.map((value) => value.city).sort();
}

export const removeFromCityStore = (cityName: string) => {
    let cities = get(citiesStore);
    const cityPosition = cities.findIndex((city) => {
        return city.city.toLowerCase() == cityName.toLowerCase();
    });
    citiesStore.update(() => {
        cities.splice(cityPosition, 1)
        return cities;
    });
}

export const resetCitiesStore = () => {
    const cities: City[] = citiesJson.map(({ country, iso2, admin_name, capital, population, population_proper, ...keepAttrs }) => keepAttrs);
    citiesStore.set(cities);
}