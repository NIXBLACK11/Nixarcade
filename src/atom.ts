import { WalletData } from 'okto-sdk-react';
import { atom } from 'recoil';

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

export const balanceState = atom<number>({
    key: 'balanceState',
    default: 0,
});

export const errorState = atom({
    key: 'errorState',
    default: {
      show: false,
      message: ''
    }
});

export const loadingState = atom({
    key: 'loadingState',
    default: false,
});