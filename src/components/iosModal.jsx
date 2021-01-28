import React, { useEffect, useState } from "react";

export const IosModal = ({ time }) => {
  const [isHide, setHide] = useState(false);

  useEffect(() => {
    let timer = setTimeout(setHide, time || 5000, true);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isHide ? null : (
    <div style={{ position: "fixed", bottom: "20px", left: "0", right: "0" }}>
      Install this webapp on your IPhone: tap [^] and then Add to home screen.
    </div>
  );
};
