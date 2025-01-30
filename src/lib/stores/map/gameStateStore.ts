import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

type GameState = 'starting' | 'in progress' | 'won' | 'lost'

export const gameStateStore: Writable<GameState> = localStorageStore('mapGameStateStore', 'starting')

export const setMapGameStateStore = (state: GameState) => {
    gameStateStore.set(state);
}
