// import React from "react";
import { useAddress } from "@thirdweb-dev/react";
import { DollarSign } from "lucide-react";
import { Coins } from "lucide-react";
import { useEffect, useState } from "react";

//todo :fetch the account balanve of userd form the blockchain...
const OtherPlayers = ({
  name,
  address,
  avatar,
  isFolded,
  cards,
  theExpectedPlayer
}) => {
  //TODO: make sure you addd the cards when the address of the userAddress matches..

  const currentAddress = useAddress();
  const [cardImages, setCardImages] = useState();

  const currentUser = address === currentAddress;

  useEffect(() => {
    if (cards && Array.isArray(cards) && cards.length > 0) {
      const newCardImages = cards.map(
        (cardCode) => `/assets/cards/${cardCode}.png`
      );
      setCardImages(newCardImages);
    }
  }, [cards]);

  return (
    <div
      className={`relative max-w-[175px] max-h-[180px] z-0 py-2 px-4 ${
        isFolded ? " backdrop-filter grayscale" :
        true && 'max-w-[190px] border-[4px] rounded-md border-[#1f1c1c] max-h-max '
      } 
      ${currentUser? "border-[#5e1f5b]": ""}
      ${(theExpectedPlayer && theExpectedPlayer === address)? " border-[#52f973]" : ""}`}
    >
      {/* for blurry effect */}
      <div className="absolute inset-0 w-full h-full -z-10 backdrop-blr-sm"></div>{" "}
      {/* Added "top-0 left-0" to position the blurred div behind the main content */}
      <main className="flex flex-col z-10 items-center">
        {cards && 
          <>
            {currentUser ? (
              <div className="absolute xl:top-16 top-8 flex -space-x-10">
                {cardImages &&
                  cardImages.map((imagePath, index) => (
                    <img
                      key={index}
                      className="w-12 xl:w-16"
                      src={imagePath}
                      alt={`Card ${imagePath}`}
                    />
                  ))}
              </div>
            ) : (
              <div className="absolute top-10 left-14 xl:left-14">
                <img
                  src={"/assets/pairofcards.png"}
                  className="w-12 xl:w-14"
                  alt={`pair of cards`}
                />
              </div>
            )}
          </>
        }
        <img className="w-1/2" src={avatar} alt="pairofcards" />
        <div className="w-full  py-1 font-semibold text-center rounded-md ">
          <p className="text-xl">{currentUser? "You": name}</p>
          <p className="text.md truncate bg-[#c197c8] p-1 rounded">{address}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          {/* <h3 className="flex items-center text-[0.9rem]">
            <DollarSign className="mr-1" />
            {balance}
          </h3> */}
          {/* <h3 className="flex items-center text-[1.2rem]">
            <Coins className="mr-1" />
            Bet : <span className="font-medium ml-1 text-green-400"></span>
          </h3> */}
        </div>
      </main>
    </div>
  );
};

export default OtherPlayers;
