import { FC } from "react";
import { SvgProps } from "../../components/Svg/types";

export enum ConnectorNames {
  CasperSigner = "casperSigner",
  Ledger = "ledger",
  TorusWallet = "torusWallet",
}

export type Login = (connectorId: ConnectorNames) => void;

export interface Config {
  title: string;
  icon: FC<React.PropsWithChildren<SvgProps>>;
  connectorId: ConnectorNames;
  priority: number | (() => number);
  href?: string;
  installed?: boolean;
}
