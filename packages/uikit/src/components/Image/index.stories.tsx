import React from "react";
import random from "lodash/random";
import times from "lodash/times";
import styled from "styled-components";
import Box from "../Box/Box";
import Flex from "../Box/Flex";
import Text from "../Text/Text";
import BackgroundImage from "./BackgroundImage";
import Img from "./Image";
import ProfileAvatarComponent from "./ProfileAvatar";
import TokenImage from "./TokenImage";
import TokenPairImage from "./TokenPairImage";
import tokenList from "./tokens";

export default {
  title: "Components/Image",
  argTypes: {},
};

export const Image: React.FC<React.PropsWithChildren> = () => {
  return (
    <div>
      <Img src="https://via.placeholder.com/800x400" width={800} height={400} alt="test" />
      <div>Image</div>
    </div>
  );
};

export const Background: React.FC<React.PropsWithChildren> = () => {
  return (
    <div>
      <BackgroundImage src="https://via.placeholder.com/800x400" width={800} height={400} mr="16px" />
      <div>Background Image</div>
    </div>
  );
};

export const LazyImages: React.FC<React.PropsWithChildren> = () => {
  return (
    <Flex flexWrap="wrap">
      {times(40, (index) => (
        <Img
          key={index}
          src={`https://via.placeholder.com/${150 + index}`}
          width={150}
          height={150}
          mb="16px"
          mr="16px"
        />
      ))}
    </Flex>
  );
};

export const LazyBackgrounds: React.FC<React.PropsWithChildren> = () => {
  return (
    <Flex flexWrap="wrap">
      {times(40, (index) => (
        <BackgroundImage
          key={index}
          src={`https://via.placeholder.com/${150 + index}`}
          width={150}
          height={150}
          mb="16px"
          mr="16px"
        />
      ))}
    </Flex>
  );
};

export const ProfileAvatar: React.FC<React.PropsWithChildren> = () => {
  return (
    <div>
      <Text>Shows Placeholder until image is downloaded</Text>
      <ProfileAvatarComponent src="https://via.placeholder.com/960x960" width={64} height={64} alt="test" mb="16px" />
      <Text>Shows placeholder if the image does not download</Text>
      <ProfileAvatarComponent src="https://via.placeholder.com" width={64} height={64} alt="test" />
    </div>
  );
};
