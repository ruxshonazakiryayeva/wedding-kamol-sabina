import { createFileRoute } from "@tanstack/react-router";
import Invitation from "@/components/wedding/Invitation";
import { wedding, formatEventDate, t as tr } from "@/config/wedding";

const lang = wedding.language.default;
const couple = `${wedding.couple.nameA} & ${wedding.couple.nameB}`;
const title = `${couple} — ${tr(lang, "invitationLine")}`;
// Localised description: "<greetingEyebrow>, <date> · <venue>, <city>".
const description = `${tr(lang, "greetingEyebrow")} · ${formatEventDate(lang, wedding.date.iso)} · ${wedding.venue.name}, ${wedding.venue.city}`;

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
