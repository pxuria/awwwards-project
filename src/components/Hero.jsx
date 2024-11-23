import { useRef, useState } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(10);

    const totalVideos = 3;
    const nextVideoRef = useRef(null);

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1

    const handleMiniVidClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex)
    }

    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#nect-video', { visibility: "visible" })
            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: "100%",
                height: "100%",
                ease: 'power1.inOut',
                onStart: () => nextVideoRef.current.play()
            })
            gsap.from("#current-video", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: "power1.inOut",
            })
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true })

    const getVideoSource = (index) => `videos/hero-${index}.mp4`

    const handleVideoLoad = () => {
        setLoadedVideos(prev => prev + 1)
    }

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            <div id="video-frame"
                className="relative z-10 h-dvh overflow-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div
                            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                            onClick={handleMiniVidClick}>
                            <video
                                ref={nextVideoRef}
                                src={getVideoSource(upcomingVideoIndex)}
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                                loop
                            />
                        </div>
                    </div>

                    <video
                        ref={nextVideoRef}
                        src={getVideoSource(currentIndex)}
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                        id="next-video"
                        loop
                        muted
                    />
                    <video
                        ref={nextVideoRef}
                        src={getVideoSource(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        autoPlay
                        className="left-0 top-0 size-full absolute object-cover object-center"
                        onLoadedData={handleVideoLoad}
                        id="next-video"
                        loop
                        muted
                    />
                </div>

                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G <b>a</b>ming
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>

                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter the metagame Layer
                            <br />Unleash the Play Economy
                        </p>

                        <Button id='whatch-trailer' title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="flex-center gap-1 !bg-yellow-300" />
                    </div>
                </div>
            </div>

            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                G <b>a</b>ming
            </h1>
        </div>
    )
}

export default Hero