import { WalletData } from 'okto-sdk-react';
import { atom } from 'recoil';

export const authState = atom<any>({
    key: 'authState',
    default: null,
});

export const moneyState = atom<boolean>({
    key: 'moneyState',
    default: false,
});

export const transState = atom<boolean>({
    key: 'transState',
    default: false,
});

export const walletState = atom<WalletData>({
    key: 'walletState',
    default: {
        wallets: [],
    },
});