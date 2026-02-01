import { forwardRef } from "react";
import { useObsidian } from "./Context";

type Props = {
  children: React.ReactNode;
  isEmbedded: boolean;
  style?: React.CSSProperties;
  embeddedStyle?: React.CSSProperties;
};

export const Container = forwardRef<HTMLDivElement, Props>(
  ({ children, isEmbedded, style, embeddedStyle }, ref) => {
    const { contentRef } = useObsidian();

    return (
      <div
        ref={ref ?? contentRef}
        className="lovely-bases"
        style={{
          height: "100%",
          width: "100%",
          ...(style ?? {}),
          ...(isEmbedded ? { ...embeddedStyle } : {}),
        }}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";
