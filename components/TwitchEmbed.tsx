import { useEffect } from "react";

interface TwitchEmbedProps {
  width?: number;
  height?: string;
  channel?: string;
  video?: string;
  collection?: string;
  parent?: string[];
}

const TwitchEmbed: React.FC<TwitchEmbedProps> = ({
  width = "[100%]",
  height = "[20vh]",
  channel,
  video,
  collection,
  parent = ["embed.example.com", "othersite.example.com"],
}) => {
  useEffect(() => {
    const existingScript = document.getElementById("twitch-embed-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://player.twitch.tv/js/embed/v1.js";
      script.async = true;
      script.id = "twitch-embed-script";


      script.onload = () => {
        if (typeof (window as any).Twitch !== "undefined" && (window as any).Twitch.Player) {
          const options = {
            width,
            height,
            channel,
            video,
            collection,
            parent,
            autoplay: true,
            muted: true,
          };
          const player = new (window as any).Twitch.Player("twitch-embed", options);
          player.setVolume(0.5);
        }
      };

      document.body.appendChild(script);
    }

    return () => {
      const playerDiv = document.getElementById("twitch-embed");
      if (playerDiv) {
        playerDiv.innerHTML = ""; // Clear existing embed
      }
    };
  }, [width, height, channel, video, collection, parent]);

  return <div id="twitch-embed"></div>;
};

export default TwitchEmbed;
