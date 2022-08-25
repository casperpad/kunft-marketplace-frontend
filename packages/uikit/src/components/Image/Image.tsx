import React, { ImgHTMLAttributes } from "react";
import LazyLoad from "react-lazyload";
import styled from "styled-components";
import { SpaceProps } from "styled-system";
import Placeholder from "./Placeholder";

const StyledImage = styled.img`
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  object-fit: cover;
`;

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>, SpaceProps {
  width?: number | string;
  height?: number | string;
  display?: "fixed" | "cover";
}

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
    <Wrapper
      $width={display === "fixed" ? (typeof width === "number" ? `${width}px` : width) : undefined}
      $height={display === "fixed" ? (typeof height === "number" ? `${height}px` : height) : undefined}
    >
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

const Wrapper = styled.div<{ $width?: string; $height?: string }>`
  ${({ $height }) => ($height ? `max-height: ${$height};` : "")};
  ${({ $width }) => ($width ? `max-width: ${$width};` : "")};
  position: relative;
  width: 100%;
  /* object-fit: cover; */
`;

export default Image;
