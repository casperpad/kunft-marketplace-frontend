/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from "react";
import { SunIcon, MoonIcon } from "../Svg";
import Toggle from "./Toggle";

export default {
  title: "Components/Toggle",
  component: Toggle,
};

export const Default: React.FC<React.PropsWithChildren> = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = () => setIsChecked(!isChecked);

  return (
    <>
      <div style={{ marginBottom: "32px" }}>
        <Toggle checked={isChecked} onChange={toggle} />
      </div>
      <div style={{ marginBottom: "32px" }}>
        <Toggle checked={isChecked} onChange={toggle} scale="md" />
      </div>
      <div style={{ marginBottom: "32px" }}>
        <Toggle
          checked={isChecked}
          defaultColor="textDisabled"
          checkedColor="textDisabled"
          onChange={toggle}
          scale="md"
          startIcon={(isActive = false) => <SunIcon color={isActive ? "warning" : "backgroundSecondary"} />}
          endIcon={(isActive = false) => <MoonIcon color={isActive ? "secondary" : "backgroundSecondary"} />}
        />
      </div>
      <div>
        <Toggle checked={isChecked} onChange={toggle} scale="sm" />
      </div>
    </>
  );
};
