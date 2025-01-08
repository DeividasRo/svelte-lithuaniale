declare interface MapGuess {
    name: string;
    distance: number;
}

declare interface HistoryGuess {
    year: number;
    difference: number;
}


declare interface City {
    city: string;
    lat: string;
    lng: string;
    population: string;
    guessed: boolean;
}