import { getLocales } from "expo-localization";
import az from "./locales/az";
import ru from "./locales/ru";
import en from "./locales/en";

export default function t(query) {
  const lan = getLocales()[0].languageCode;

  if (lan === "az") {
    return az[query];
  } else if (lan === "en") {
    return en[query];
  } else if (lan === "ru") {
    return ru[query];
  } else {
    return en[query];
  }
}
