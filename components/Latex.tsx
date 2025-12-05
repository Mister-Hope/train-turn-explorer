import React, { useEffect, useRef } from "react";

interface LatexProps {
  children: string;
  className?: string;
}

const Latex: React.FC<LatexProps> = ({ children, className }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise && nodeRef.current) {
      // Reset content to raw latex string before typesetting
      nodeRef.current.innerHTML = children;
      window.MathJax.typesetPromise([nodeRef.current]).catch((err: any) =>
        console.log("MathJax Error:", err),
      );
    }
  }, [children]);

  return (
    <span ref={nodeRef} className={className}>
      {children}
    </span>
  );
};

export default Latex;
