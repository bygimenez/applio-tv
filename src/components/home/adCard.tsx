"use client"

export default function AdCard({image, link, text}: {image: {image: string}, link: string, text: string}) {
    return (
        <section className="justify-center items-center flex grid-cols-8 gap-4 md:mx-44 mx-12 mt-12 mb-8">
        <div className="relative col-span-8 w-full aspect-[11/3] rounded-[12px] backdrop-blur-3xl bg-white/10 cursor-pointer" onClick={() => window.open(link, '_blank')}>
            <img src={image.image} className="absolute inset-0 w-full h-full rounded-lg object-cover"/>
            <p className="absolute bottom-0 left-0 p-8 text-3xl flex-wrap max-w-[300px] font-light">{text}</p>
        </div>
        </section>
        )
}