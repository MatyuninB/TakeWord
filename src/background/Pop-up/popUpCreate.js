export const createPopUp = async() => {
  const currTab = await chrome.windows.getCurrent()
  chrome.windows.create({
    focused: true,
    width: 400,
    height: 600,
    type: 'popup',
    url: 'popup.html',
    top: currTab.height,
    left: currTab.width - 400,
  },
  () => {});
}