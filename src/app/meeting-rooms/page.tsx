import type { Metadata } from "next";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import PriceTable from "@/components/PriceTable";
import PricingNote from "@/components/PricingNote";
import Section from "@/components/Section";
import { publishedRooms, formatPeso } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Meeting Rooms in Makati — 104 Paseo de Roxas",
  description:
    "Six bookable meeting and conference rooms on the 5th floor of 104 Paseo de Roxas, Legaspi Village, Makati. Hourly rates published, member rates available.",
};

export default function MeetingRoomsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Meeting rooms"
        headline="Somewhere proper to meet a client, in the middle of Makati."
        intro="Six bookable spaces on our 5th floor, from a four-person room for interviews to a conference room for board meetings and presentations. Book by the hour, with no membership required."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?service=meeting-room">Book a room</Button>
          <Button href="/location" variant="outline">
            How to find us
          </Button>
        </div>
      </PageHeader>

      <Section eyebrow="The rooms" heading="Capacities and rates" tone="bone">
        <div className="flex flex-col gap-5">
          <PriceTable kind="rooms" />
          <PricingNote />
        </div>
      </Section>

      <Section eyebrow="Detail" heading="Each space, individually" tone="surface">
        <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {publishedRooms.map((room) => (
            <div key={room.id} className="flex flex-col gap-2 bg-surface p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-[1.1rem]">{room.name}</h2>
                <span className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-body-faint">
                  {room.capacity}
                </span>
              </div>
              <p className="flex-1 text-[0.89rem] text-body-soft">{room.note}</p>
              {room.rate !== null ? (
                <p className="tnum font-mono text-[0.85rem] text-ink">
                  {formatPeso(room.rate)} / hour
                  {room.memberRate !== null ? (
                    <span className="text-body-faint">
                      {" "}
                      · {formatPeso(room.memberRate)} members
                    </span>
                  ) : null}
                </p>
              ) : (
                <p className="font-mono text-[0.85rem] text-body-faint">
                  Available to members and room bookers
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="The space" heading="What you are booking" tone="bone">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Photo file="meeting-room.jpg" alt="A conference room on the 5th floor" caption="One of three conference rooms." />
          <Photo file="workspace.jpg" alt="Serviced workspace with glass partitions" caption="Rooms open onto the serviced floor." />
          <Photo file="pantry.jpg" alt="The tea room and pantry" caption="The tea room, for shorter conversations." />
        </div>
      </Section>

      <CtaBand
        headline="Tell us the date, the time and how many people."
        body="Send an enquiry or message us on Viber and we will confirm availability. Address and workspace clients book through reception using their monthly allocation."
      />
    </>
  );
}
