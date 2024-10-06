import { atom } from 'recoil';

export const authState = atom<any>({
    key: 'authState',
    default: null,
});