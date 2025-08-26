"use client";

import SubmitTicketCard from "./SubmitTicketCard";

const SupportPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <SubmitTicketCard
        icon="/icons/submit_ticket.svg"
        title="Submit a Ticket"
        subtitle="Frequenly Asked Questions"
      />
    </div>
  );
};

export default SupportPage;
