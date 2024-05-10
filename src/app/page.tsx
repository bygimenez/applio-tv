import VideoRecommendations from "@/components/home/recommendations";
import Logo from "@/components/navbar/logo";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Logo position="top"/>
      <VideoRecommendations />
    </main>
  );
}
