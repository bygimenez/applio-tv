"use client"
import { supabase, supabaseTV } from "@/utils/database"
import { PostgrestError } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

export default function VideoRecommendations() {
    const [end, setEnd] = useState(15)
    const [data, setData] = useState<any[] | null>(null); 
    const [error, setError] = useState<PostgrestError>()
    const [hasMore, setHasMore] = useState(true)
    
    async function getVideos() {
        const user = await supabase.auth.getUser();
        const full_name = await supabase.from("profiles").select("full_name").eq("auth_id", user.data.user?.id).single();

        const userHistory = await supabaseTV
            .from("history")
            .select("video_styles")
            .eq("see_by", full_name.data?.full_name);

        const allStyles: string[] = userHistory.data?.map((entry: { video_styles: string[] }) => entry.video_styles).flat() || [];

        const styleCounts: { [style: string]: number } = {};
        allStyles.forEach((style: string) => {
            styleCounts[style] = (styleCounts[style] || 0) + 1;
        });

        let mostUsedStyle: string | null = null;
        let maxCount = 0;
        for (const style in styleCounts) {
            if (styleCounts[style] > maxCount) {
                mostUsedStyle = style;
                maxCount = styleCounts[style];
            }
        }


        const {data, error} = await supabaseTV.from("videos").select("*").range(0, end);

        if (data) {
            data.sort((a, b) => {
                const aHasMostUsed = a.styles.includes(mostUsedStyle);
                const bHasMostUsed = b.styles.includes(mostUsedStyle);
                
                if (aHasMostUsed && !bHasMostUsed) {
                    return -1;
                }
                else if (!aHasMostUsed && bHasMostUsed) {
                    return 1;
                }
                else {
                    return 0;
                }
            });

            setData(data)
            const updatedEnd = end
            if (data.length < updatedEnd) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }

        } else {
            setData(null)
        }

        if (error) {
            setError(error)
            console.log(error)
        }
    }

    function loadmore() {
        if (hasMore) {
          setEnd(end + 10)
        }
      }


    useEffect(() => {
        getVideos();
    }, [end]);


  return (
    <section>
    <InfiniteScroll 
    dataLength={data ? data.length : 0}
    hasMore={hasMore} 
    next={loadmore}
    loader={
        <p className="text-center flex justify-center mx-auto text-xs">Loading...</p>
    }
    endMessage={
    <p className="text-center flex justify-center mx-auto text-xs my-8">You reached the end</p>
    }>
    <div className="justify-center lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-4 mx-12 mt-24 mb-24">
    {data && data.map((video: any) => (
        <a key={video.id} href={`watch/${video.id}`}>
            <div className="relative w-full h-[240px] rounded-[2rem] overflow-hidden block border border-black/10">
                <img className="scale-y-[1.4] scale-x-[1.0] w-full h-full" src={`http://img.youtube.com/vi/${video.video_url}/0.jpg`} alt="Miniatura de un video" />
                <div className="absolute inset-x-0 bottom-0 w-full h-3/4 bg-gradient-to-t from-black to-transparent"></div>
                <p className="absolute inset-x-0 bottom-0 text-white text-lg font-bold p-4 truncate">{video.title}</p>
            </div>

        </a>
    ))}
    {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
    </InfiniteScroll>
    </section>
  )
}
