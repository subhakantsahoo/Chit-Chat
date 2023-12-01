// user-context.js
import { createContext } from "react";

const authContext = createContext({
  name: "",
  setName: () => {},
});

export default authContext;
