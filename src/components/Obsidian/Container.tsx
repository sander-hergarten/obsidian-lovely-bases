import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  isEmbedded: boolean;
  style?: React.CSSProperties;
  embeddedStyle?: React.CSSProperties;
};

export const Container = forwardRef<HTMLDivElement, Props>(
  ({ children, isEmbedded, style, embeddedStyle }, ref) => {
    return (
      <div
        ref={ref}
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
