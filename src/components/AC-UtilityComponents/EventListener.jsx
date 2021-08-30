import { useEffect } from "react";

export default function EventListener({ eventName, eventFunc }) {
  useEffect(() => {
    console.info("event listener mounted", eventName, eventFunc);
    document.addEventListener(eventName, eventFunc);
    return () => {
      console.info("event listener UNMOUNT-", eventName, eventFunc);

      document.removeEventListener(eventName, eventFunc);
    };
  }, []);
  return null;
}
