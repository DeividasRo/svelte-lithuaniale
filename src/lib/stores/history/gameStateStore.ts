import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

type GameState = 'starting' | 'in progress' | 'won' | 'lost'

export const gameStateStore: Writable<GameState> = localStorageStore('historyGameStateStore', 'starting')

export const setHistoryGameStateStore = (state: GameState) => {
    gameStateStore.set(state);
}
