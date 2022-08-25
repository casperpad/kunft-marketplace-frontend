import React from "react";
import styled from "styled-components";
import KUNFTPlaceholder from "../Svg/Icons/KUNFTPlaceholder";
import BackgroundImage from "./BackgroundImage";
import { ImageProps } from "./types";

const StyledProfileAvatar = styled(BackgroundImage)`
  border-radius: 50%;
`;

const StyledKUNFTPlaceholder = styled(KUNFTPlaceholder)`
  height: 100%;
  width: 100%;
`;

const ProfileAvatar: React.FC<React.PropsWithChildren<ImageProps>> = (props) => (
  <StyledProfileAvatar loadingPlaceholder={<StyledKUNFTPlaceholder />} {...props} />
);

export default ProfileAvatar;
