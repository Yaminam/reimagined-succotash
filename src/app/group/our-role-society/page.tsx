import ContentPage from "@/components/site/ContentPage";
import { PAGES } from "@/content/pages";

const page = PAGES["group-role-society"];
export const metadata = {
  title: "Our Role in Society",
  description: page?.description?.slice(0, 160),
};

export default function OurRoleSocietyPage() {
  return <ContentPage page={page} index="02 / b" />;
}
