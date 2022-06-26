/* Context provides a way to pass data through the component tree without having to pass props down manually at every level. */
import { createContext } from "react";

const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
