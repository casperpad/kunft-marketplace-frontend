import Casper from "../../components/Svg/Icons/Casper";

import { Config, ConnectorNames } from "./types";

const connectors: Config[] = [
  {
    title: "Casper Signer",
    icon: Casper,
    connectorId: ConnectorNames.CasperSigner,
    priority: 1,
    href: "https://metamask.app.link/dapp/pancakeswap.finance/",
  },
];

export default connectors;
export const connectorLocalStorageKey = "connectorIdv2";
export const walletLocalStorageKey = "wallet";

export const walletConnectConfig = connectors.find((c) => c.title === "WalletConnect");
