import React from "react";
import { createBoard } from "@wixc3/react-board";
import Whoami from "../../../../components/system32/windows/whoami";

export default createBoard({
  name: "Whoami",
  Board: () => <Whoami />,
  isSnippet: true,
  environmentProps: {
    canvasWidth: 1158,
    canvasHeight: 650,
    windowWidth: 976,
    windowHeight: 665,
  },
});
