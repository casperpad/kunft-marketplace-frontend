import React from "react";
import styled from "styled-components";
import { MotionBox } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import { IconButton } from "../../components/Button";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { ModalProps } from "./types";

export const mobileFooterHeight = 73;

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  padding: 12px 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    background: ${({ background }) => background || "transparent"};
  }
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(90vh - ${mobileFooterHeight}px);
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    max-height: 90vh;
  }
`;

export const ModalCloseButton: React.FC<React.PropsWithChildren<{ onDismiss: ModalProps["onDismiss"] }>> = ({
  onDismiss,
}) => {
  return (
    <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="primary" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<React.PropsWithChildren<{ onBack: ModalProps["onBack"] }>> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="primary" />
    </IconButton>
  );
};

export const ModalContainer = styled(MotionBox)<{ $minWidth: string }>`
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px 16px 0px 0px;
  width: 100%;
  max-height: calc(var(--vh, 1vh) * 100);
  z-index: ${({ theme }) => theme.zIndices.modal};
  position: absolute;
  min-width: ${({ $minWidth }) => $minWidth};
  bottom: 0;
  max-width: none !important;

  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
    position: auto;
    bottom: auto;
    border-radius: 16px;
    max-width: 100%;
    max-height: 100vh;
  }
`;
