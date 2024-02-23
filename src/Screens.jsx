import { useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start, theme, handleSwitchTheme }) {
  console.log(theme, handleSwitchTheme);
  return (
    <div className="bg-white dark:bg-black w-full min-h-screen py-8 flex flex-col justify-center items-center">
      <Switcher
        style={{
          width: "100%",
          height: "100%",
        }}
        theme={theme}
        handleSwitchTheme={handleSwitchTheme}
      />

      <div
        className="flex flex-col justify-center items-center w-[calc(100%_-_16px)] max-w-sm mx-auto space-y-8 pt-24 px-4 pb-32 bg-pink-500/10 rounded-lg"
        data-aos="zoom-in"
      >
        <h1
          className="font-bold text-pink-500 text-4xl"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          Memory
        </h1>
        <p
          className="text-pink-500 font-medium text-center"
          data-aos="fade-up"
          data-aos-delay={400}
        >
          Flip over tiles looking for pairs
        </p>
        <button
          onClick={start}
          className="bg-gradient bg-gradient-to-b hover:bg-gradient-to-t transition duration-200 from-pink-400 via-pink-500 via-50% to-pink-600 to-100% text-white px-12 py-2 rounded-full mx-auto shadow-lg text-lg"
          data-aos="fade-up"
          data-aos-delay={600}
        >
          Play
        </button>
      </div>
    </div>
  );
}

export function PlayScreen({ end, theme, handleSwitchTheme }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 100,
        });
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full px-4 mx-auto min-h-screen bg-white dark:bg-black">
        <Switcher theme={theme} handleSwitchTheme={handleSwitchTheme} />

        <div className="w-full mx-auto flex flex-col justify-center items-center space-y-8">
          <h1
            className="font-medium text-indigo-500 text-center"
            data-aos="fade-up"
          >
            Tries{" "}
            <span className="bg-indigo-300 px-2 rounded ml-1">{tryCount}</span>
          </h1>
          <div
            className="grid grid-cols-4 gap-2.5 sm:gap-4 p-2.5 sm:p-4 rounded-lg bg-indigo-300/20"
            data-aos="zoom-in"
          >
            {getTiles(16).map((tile, i) => (
              <Tile key={i} flip={() => flip(i)} {...tile} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export const Switcher = ({ theme, handleSwitchTheme }) => {
  return (
    <div
      className="flex justify-end w-[calc(100%_-_16px)] max-w-sm mx-auto mb-8"
      data-aos="fade-left"
    >
      <div className="flex items-center w-12 h-6 bg-black dark:bg-white rounded-full border shadow transition duration-200">
        <span
          className={`flex justify-center items-center bg-white dark:bg-black h-5 w-5 mx-0.5 rounded-full text-sm cursor-pointer transition duration-200 ${
            theme === "dark" ? "translate-x-full" : "translate-x-0"
          }`}
          onClick={() => {
            handleSwitchTheme();
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </span>
      </div>
    </div>
  );
};
