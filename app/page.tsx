import { Dashboard } from "./components/Dashboard";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { channel } = await searchParams;
  return {
    title: `KDS(${channel || "everyone"})`,
    description: "Kitten Digital Signage",
    manifest: `/manifest.json?channel=${channel || "everyone"}`,
  };
}

export default function Home() {
  return <Dashboard />;
}
