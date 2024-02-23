import ReactCardFlip from "react-card-flip";

export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <ReactCardFlip
          flipDirection="horizontal"
          isFlipped={state === "flipped" ? true : false}
        >
          <Back
            className={`flex justify-center h-14 sm:h-20 w-14 sm:w-20 bg-indigo-400 text-center rounded-lg ${
              state === "start"
                ? "[transform:rotateY(180deg)]"
                : "[transform:rotateY(0deg)]"
            }`}
            flip={flip}
          />
          <Front
            className={`flex justify-center items-center h-14 sm:h-20 w-14 sm:w-20 bg-indigo-500 rounded-lg ${
              state === "flipped"
                ? "[transform:rotateY(0deg)]"
                : "[transform:rotateY(180deg)]"
            }`}
          >
            <Content className="bg-indigo-500 text-white h-12 sm:h-16 w-12 sm:w-16 rounded-lg [transform:rotateY(180deg)]" />
          </Front>
        </ReactCardFlip>
      );
    case "flipped":
      return (
        <ReactCardFlip
          flipDirection="horizontal"
          isFlipped={state === "flipped" ? true : false}
        >
          <Front
            className={`flex justify-center items-center h-14 sm:h-20 w-14 sm:w-20 bg-indigo-500 rounded-lg ${
              state === "flipped"
                ? "[transform:rotateY(0deg)]"
                : "[transform:rotateY(180deg)]"
            }`}
          >
            <Content className="bg-indigo-500 text-white h-12 sm:h-16 w-12 sm:w-16 rounded-lg [transform:rotateY(180deg)]" />
          </Front>
          <Back
            className={`flex h-14 sm:h-20 w-14 sm:w-20 bg-indigo-400 text-center rounded-lg ${
              state === "start"
                ? "[transform:rotateY(180deg)]"
                : "[transform:rotateY(0deg)]"
            }`}
            flip={flip}
          />
        </ReactCardFlip>
      );
    case "matched":
      return (
        <Matched className="flex justify-center items-center h-14 sm:h-20 w-14 sm:w-20 text-indigo-300">
          <Content className="h-12 sm:h-16 w-12 sm:w-16 text-indigo-200" />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip }) {
  return <div onClick={flip} className={className}></div>;
}

function Front({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Matched({ className, children }) {
  return <div className={className}>{children}</div>;
}
