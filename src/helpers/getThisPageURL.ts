export const getThisPageURL = (url?: string | undefined) => {
  const URL = url && !window.location.href.includes(url) ? window.location.href + "/" + url : window.location.href;
  navigator.clipboard.writeText(URL);
};
