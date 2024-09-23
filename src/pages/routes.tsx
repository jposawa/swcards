import { Routes as Switch, Route } from "react-router-dom";
import { Pazaak } from "./";

export const Routes = () => {
  return(
    <Switch>
      <Route index path="/" element={<Pazaak />} />
    </Switch>
  )
}