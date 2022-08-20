import Metamask from "../../components/Svg/Icons/Metamask";

import { Config, ConnectorNames } from "./types";

const connectors: Config[] = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: ConnectorNames.MetaMask,
    priority: 1,
    href: "https://metamask.app.link/dapp/pancakeswap.finance/",
  },
];

export default connectors;
export const connectorLocalStorageKey = "connectorIdv2";
export const walletLocalStorageKey = "wallet";

export const walletConnectConfig = connectors.find((c) => c.title === "WalletConnect");
