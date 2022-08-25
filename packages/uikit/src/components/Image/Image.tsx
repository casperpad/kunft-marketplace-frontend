import React from "react";
import LazyLoad from "react-lazyload";
import styled from "styled-components";
import Placeholder from "./Placeholder";
import { ImageProps } from "./types";

const StyledImage = styled.img`
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  object-fit: cover;
`;

const Image: React.FC<React.PropsWithChildren<ImageProps>> = ({
  src,
  alt,
  width,
  height,
  display = "fixed",
  ...props
}) => {
  const refPlaceholder = React.useRef<HTMLDivElement>(null);

  const removePlaceholder = () => {
    refPlaceholder.current?.remove();
  };

  return (
    <Wrapper $width={display === "fixed" ? width : undefined} $height={display === "fixed" ? height : undefined}>
      <Placeholder ref={refPlaceholder} />
      <LazyLoad>
        <StyledImage
          src={src}
          alt={alt}
          height={height}
          width={width}
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          {...props}
        />
      </LazyLoad>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $width?: number; $height?: number }>`
  ${({ $height }) => ($height ? `max-height: ${$height}px;` : "")};
  ${({ $width }) => ($width ? `max-width: ${$width}px;` : "")};
  position: relative;
  width: 100%;
  object-fit: cover;
`;

export default Image;
