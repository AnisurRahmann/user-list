import React, { useContext, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { LAYOUT_OPTIONS } from "../constants";

interface ComponentWithChildrenProps {
  children: (React.ReactNode & { type: { name: string } })[];
}
interface ComponentOptionsProps {
  children: React.ReactNode & { type: { name: string } };
}
interface LayoutSwitchProps extends ComponentWithChildrenProps {
  defaultLayout: string;
}

interface LayoutContextState {
  activeLayout: string;
  setActiveLayout: (prevLayout: string) => void;
}

const LayoutContext = React.createContext<LayoutContextState | null>(null);

function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      `LayoutSwitch compound components cannot be rendered outside the LayoutSwitch component`
    );
  }
  return context;
}

function ToggleButton() {
  const { activeLayout, setActiveLayout } = useLayoutContext();
  return (
    <label className="switch">
      <span className="switch-label"> Tile view</span>
      <input
        type="checkbox"
        checked={activeLayout === LAYOUT_OPTIONS.table}
        onChange={(e) => {
          const isChecked = e.target.checked;
          if (isChecked) {
            setActiveLayout(LAYOUT_OPTIONS.table);
          } else {
            setActiveLayout(LAYOUT_OPTIONS.tile);
          }
        }}
      />
      <span className="slider round">
        <BsCheck
          color="grey"
          style={{
            width: "35px",
            height: "35px",
            textAlign: "center",
            zIndex: "10000",
            position: "absolute",
          }}
        />
      </span>
    </label>
  );
}

function Options({ children }: ComponentOptionsProps) {
  return <div className="layout-switch-container">{children}</div>;
}

function Content({ children }: ComponentWithChildrenProps) {
  const { activeLayout } = useLayoutContext();
  return (
    <React.Fragment>
      {children.map((child) => {
        if (!React.isValidElement(child)) return null;
        if (child.props.activeLayout !== activeLayout) return null;

        return child;
      })}
    </React.Fragment>
  );
}

function LayoutSwitch({ children, defaultLayout }: LayoutSwitchProps) {
  const [activeLayout, setActiveLayout] = useState(defaultLayout);
  const value: LayoutContextState = {
    activeLayout,
    setActiveLayout,
  };
  return (
    <LayoutContext.Provider value={value}>
      {children.map((child) => {
        if (!React.isValidElement(child)) return null;
        if (![Options.name, Content.name].includes(child.type.name)) {
          throw new Error(
            `${
              child.type.name || child.type
            } cannot be rendered inside LayoutSwitch
            Valid Components are [${Options.name}, ${Content.name}]`
          );
        }

        return child;
      })}
    </LayoutContext.Provider>
  );
}

LayoutSwitch.Options = Options;
LayoutSwitch.Content = Content;
LayoutSwitch.ToggleButton = ToggleButton;

export default LayoutSwitch;
