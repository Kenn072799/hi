import React, { useState, useEffect } from "react";
import Bye from "../assets/bye.mp4";

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Salamat sa lahat ng nagawa mo sakin sa tingin ko baka dito nalang din tayo, kung patuloy pa tayo mag uusap ako lang din masasaktan, alam mo hirap na hirap ako maka move on tuwing ginagawa ko mag move on ng tuloy tuloy na bigla ka nalang ulit magpaparamdam at sabay mawawala kaya back to zero na naman. Ikaw i know masaya kana at okay kana, sana ako naman yung pagbigyan mo :)";
  const [showButtons, setShowButtons] = useState(false);
  const [goodbyeMessage, setGoodbyeMessage] = useState("");
  const [buttonStyle, setButtonStyle] = useState({});

  const handleClick = () => {
    setShowVideo(true);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowText(true);
  };

  useEffect(() => {
    if (showText) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
        if (index === fullText.length) {
          clearInterval(interval);
          setShowButtons(true);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showText]);

  const handleGoodbye = () => {
    setGoodbyeMessage("Goodbye!");
  };

  const handleAvoid = () => {
    const randomX = Math.floor(Math.random() * 80) + "%";
    const randomY = Math.floor(Math.random() * 80) + "%";
    setButtonStyle({ position: "absolute", top: randomY, left: randomX });
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-900 h-screen relative">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-white text-center h-screen flex items-center justify-center">
          <div>
            {!showVideo && !showText && (
              <>
                <button
                  onClick={handleClick}
                  className="font-outfit text-3xl border-4 py-4 px-8 uppercase font-semibold border-white
                  rounded-3xl active:bg-white active:text-purple-900"
                >
                  Click me!
                </button>
                <h1 className="text-sm my-4">By: Kenneth Altes</h1>
              </>
            )}
            {showVideo && (
              <video
                src={Bye}
                autoPlay
                controls
                className="rounded-lg mt-4"
                onEnded={handleVideoEnd}
              />
            )}
            {showText && (
              <>
                <p className="font-outfit text-xl text-white mt-4 px-4 text-center">
                  {displayedText}
                </p>
                {showButtons && (
                  <div className="mt-4">
                    <button
                      onClick={handleGoodbye}
                      className="font-outfit text-2xl border-4 py-2 px-6 uppercase font-semibold border-white
                      rounded-3xl active:bg-white active:text-purple-900 mr-4"
                    >
                      Iwan na
                    </button>
                    <button
                      onClick={handleAvoid}
                      className="font-outfit text-2xl border-4 py-2 px-6 uppercase font-semibold border-white
                      rounded-3xl"
                      style={buttonStyle}
                    >
                      Wag muna
                    </button>
                  </div>
                )}
              </>
            )}
            {goodbyeMessage && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-purple-900 bg-opacity-90">
                <p className="font-outfit text-3xl text-white">{goodbyeMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;