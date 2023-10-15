import { Linking, Platform } from "react-native";

const CallNumber = (phone: string) =>
  Linking.openURL(Platform.OS !== "android" ? `tel:${phone}` : `tel:${phone}`);
const StartMail = (receipient: string, subject?: string, body: string = "") =>
  Linking.openURL(
    `mailto:${receipient}${subject ? `?subject=${subject}` : ""}&body=${body}`
  );
const OpenURL = (url: string) => Linking.openURL(url);

export { CallNumber, StartMail, OpenURL };
