import manifest from "../../../manifest.json";

let WINDOW_ID;

export const createPopUp = async () => {
  let onScreen = false;
  const currTab = await chrome.windows.getCurrent();
  const tabs = await chrome.tabs.query({});
  console.log(
    onScreen,
    tabs,
    "ya"
  );

  (function (tabs) {
    const extention = tabs.find((e) => {
      return e.windowId === WINDOW_ID
    });
    if (extention) onScreen = true;
  })(tabs);

  if (onScreen) return;

  chrome.windows.create(
    {
      focused: true,
      width: 400,
      height: 600,
      type: "popup",
      url: "popup.html",
      top: currTab.top + 90,
      left: currTab.left + currTab.width - 400,
    },
    (window) => { WINDOW_ID = window.id }
  );
};
