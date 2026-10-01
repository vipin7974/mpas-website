import { createContext, useContext } from 'react';

/** Becomes true once the intro loader has cleared, so the hero can play its entrance. */
export const ReadyContext = createContext(false);

export const useReady = () => useContext(ReadyContext);
