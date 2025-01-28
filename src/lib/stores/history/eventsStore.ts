import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import eventsJson from '$lib/assets/historical_events.json';

export const eventsStore: Writable<HistoryEvent[]> = localStorageStore('eventsStore', [])
export const eventYearsStore: Writable<number[]> = localStorageStore('eventYearsStore', [])

export const getEventData = (eventYear: number) => {
    const events = get(eventsStore);
    const eventPosition = events.findIndex((event) => {
        return event.year == eventYear;
    });
    return events[eventPosition];
}


export const removeEventStoreYear = (eventYearToDelete: number) => {
    const events = get(eventYearsStore);
    const eventPosition = events.findIndex((eventYear) => {
        return eventYear == eventYearToDelete;
    });
    eventYearsStore.update(() => {
        events.splice(eventPosition, 1)
        return events;
    });
}

export const resetEventsStore = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const events: HistoryEvent[] = eventsJson;
    const eventYears: number[] = events.map((event) => event.year);

    eventYearsStore.set(eventYears);
    eventsStore.set(events);
}