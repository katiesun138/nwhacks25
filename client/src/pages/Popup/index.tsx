import axios from "axios";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { FaX, FaGear } from "react-icons/fa6";
import ChangeTopic from "../../components/ChangeSetting/Topic";
import ChangeDifficulty from "../../components/ChangeSetting/Difficulty";

function Popup() {
  const [extensionActivated, setExtensionActivated] = useState(
    localStorage.getItem("extensionActivated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("extensionActivated", extensionActivated.toString());
  }, [extensionActivated]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    console.log(response.data.fruits);
  };

  const userStudy = {
    study: "statistics",
  };

  const postAPI = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/verify",
        userStudy
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const optionsPageUrl = chrome.runtime?.getURL
      ? chrome.runtime.getURL("options.html")
      : "options.html";
    const linkElement = document.querySelector("#settings");
    if (linkElement) {
      linkElement.setAttribute("href", optionsPageUrl);
    }
  }, []);

  useEffect(() => {
    fetchAPI();
    postAPI();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 flex flex-col gap-3 rounded-lg border-2 min-w-[350px] md:min-w-[500px] shadow-md">
        <nav className="flex justify-between gap-4">
          <h1 className="font-bold text-4xl">onTrack</h1>
          <div className="flex gap-4 text-2xl">
            <a id="settings" target="_blank" rel="noopener noreferrer">
              <FaGear className="cursor-pointer hover:drop-shadow-md" />
            </a>
            <FaX className="cursor-pointer hover:drop-shadow-md" />
          </div>
        </nav>
        <ChangeTopic />
        <div>
          <ChangeDifficulty />
        </div>
        <div className="w-full justify-end flex">
          <Button
            onClick={() => {
              setExtensionActivated(!extensionActivated);
            }}
          >
            {extensionActivated ? "Pause" : "Resume"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Popup;
