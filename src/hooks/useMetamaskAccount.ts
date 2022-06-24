import { useState, useEffect } from "react"
import { checkConnection, initialize } from "../controllers/ui-helpers";

export const useMetaMaskAccount = () => {
  const [userAddress, setAddress] = useState('');

  useEffect(() => {
    const isMetaMaskInstalled = initialize();

    if (isMetaMaskInstalled) {
      const ethereum = (window as any).ethereum;
      ethereum.on('accountsChanged', (accounts: string[]) => {
        setAddress(accounts[0]);
      })
    }
  }, []);

  useEffect(() => {
    checkConnection().then(setAddress);
    const timer = setInterval(() => {
      checkConnection().then(setAddress);
    }, 1000);

    return () => {
      timer && clearInterval(timer);
    };
  }, [userAddress]);

  return { userAddress, setAddress };
}