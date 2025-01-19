import React, { useEffect, useState } from "react";
import Section from "../../Section";
const GradientPosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default function GradientSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      style={{
        backgroundImage: `radial-gradient( circle at ${
          GradientPosition().x
        }px ${GradientPosition().y}px, #E7F9FC 5% , white )`,
      }}
      className={className}
      id="home"
    >
      <Section className="mt-48">{children}</Section>
    </div>
  );
}
