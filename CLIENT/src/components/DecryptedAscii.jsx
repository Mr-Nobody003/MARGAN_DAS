import React from "react";
import DecryptedText from "./DecryptedText";

const DecryptedAscii = React.memo(({ asciiArt, isInView }) => {
  const asciiLines = asciiArt.trim().split("\n");
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // 🧠 On mobile: just render static ASCII
  if (isMobile) {
    return (
      <pre
        className="
          font-mono 
          text-[2px] leading-[2px]
          overflow-hidden
          whitespace-pre
          text-teal-500
          h-64 md:h-96
          w-56 md:w-90
          opacity-80
        "
      >
        {asciiArt}
      </pre>
    );
  }

  // 💻 Desktop: render animated version
  return (
    <pre
      className="
        font-mono 
        text-[2px] leading-[2px]
        md:text-[4px] md:leading-[4px]
        overflow-hidden
        whitespace-pre
        text-teal-500
        h-72 md:h-96
        w-60 md:w-90
        hover:text-red-800
        hover:animate-pulse
      "
    >
      {asciiLines.map((line, idx) => (
        <React.Fragment key={idx}>
          <span
            className={`
              inline-block 
              transition-opacity duration-300
              ${isInView ? "opacity-100" : "opacity-0"}
            `}
          >
            <DecryptedText
              text={line}
              animateOn="view"
              revealDirection="start"
              speed={60}
              maxIterations={10}
              characters="█▒░@#%&*+=-"
              sequential={false}
              useOriginalCharsOnly={true}
              delay={idx * 30}
              className="revealed"
            />
          </span>
          {"\n"}
        </React.Fragment>
      ))}
    </pre>
  );
});

export default DecryptedAscii;
