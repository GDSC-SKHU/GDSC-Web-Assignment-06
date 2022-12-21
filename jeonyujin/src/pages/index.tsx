import { Inter } from "@next/font/google";
import { useEffect } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });
// nods.js 새로 깔면서 생김

export default function Home() {
  useEffect(() => {
    axios.get("https://api.airtable.com/v0/appyNQQ67gaRME4kZ/todos?", {
      headers: { Authorization: "Bearer keyRXmGbTnpHyCyHb" },
    });
  }, []);
  return (
    <>
      <div>hi</div>
    </>
  );
}
