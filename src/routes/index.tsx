import { createFileRoute } from "@tanstack/react-router";
import Invitation from "@/components/wedding/Invitation";
import { wedding } from "@/config/wedding";

const title = `${wedding.couple.nameA} & ${wedding.couple.nameB} — Wedding Invitation`;
const description = `Join ${wedding.couple.nameA} & ${wedding.couple.nameB} on ${wedding.date.displayDate} at ${wedding.venue.name}, ${wedding.venue.city}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: wedding.photos.ogImage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: wedding.photos.ogImage },
    ],
  }),
  component: Invitation,
});
