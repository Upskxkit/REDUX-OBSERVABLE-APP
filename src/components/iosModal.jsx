import React from "react";

export const IosModal = ({ onApprove, onReject }) => {
  return (
    <div style={{ position: "fixed", bottom: "20px", left: "0", right: "0" }}>
      Install this webapp on your IPhone: tap [^] and then Add to home screen.
    </div>
  );
};
