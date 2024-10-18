import { useEffect, useRef } from "react";

interface TwitchEmbedProps {
  channel: string;
}

const TwitchEmbed: React.FC<TwitchEmbedProps> = ({ channel }) => {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.twitch.tv/embed/v1.js";
    script.async = true;

    script.onload = () => {
      if (embedRef.current) {
        //@ts-ignore
        new window.Twitch.Embed(embedRef.current, {
          width: "100%",
          height: "100%",
          channel: channel,
          layout: "video",
          autoplay: false,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [channel]);

  return <div ref={embedRef} style={{ height: "500px", width: "100%" }} />;
};

export default TwitchEmbed;
