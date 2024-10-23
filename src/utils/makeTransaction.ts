import { OktoContextType, TransferTokens, TransferTokensData } from "okto-sdk-react";

const recipientPublicKey = 'FhNZ5dafuzZLQXixkvRd2FP4XsDvmPyzaHnQwEtA1mPT';

export const makeTransaction = async (okto: OktoContextType | null, amount: string) => {
    if (!okto) {
        console.error("Okto context is not available");
        return;
    }

    const transferData: TransferTokens = {
        network_name: 'SOLANA_DEVNET',
        token_address: '',
        recipient_address: recipientPublicKey,
        quantity: amount,
    };
    console.log(transferData);
    try {
        const result: TransferTokensData = await okto.transferTokens(transferData);
        console.log(`Transfer of 0.01 SOL on Solana devnet initiated. Order ID: ${result.orderId}`);
        return true;
    } catch (error) {
        console.error("Error transferring SOL on devnet:", error);
        return false;
    }
}