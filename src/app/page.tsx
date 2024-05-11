import AdCard from "@/components/home/adCard";
import VideoRecommendations from "@/components/home/recommendations";
import TopViews from "@/components/home/topViews";
import Logo from "@/components/navbar/logo";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Logo position="top"/>
      <TopViews />
      <VideoRecommendations />
      <AdCard />
    </main>
  );
}
