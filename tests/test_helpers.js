export default function withWrapperArray(wrapperArray) {
  return {
    childSelectorHasText: (selector, str) => wrapperArray.filter((i) => i.find(selector).text().match(str)),
    hasText: (str) => wrapperArray.filter((i) => i.text().match(str)),
    areVisible: () => wrapperArray.wrappers.filter((w) => w.isVisible()).length,
    areHidden: () => wrapperArray.wrappers.filter((w) => !w.isVisible()).length,
    areAllVisible: () => wrapperArray.wrappers.every((w) => w.isVisible()),
    areAllHidden: () => wrapperArray.wrappers.every((w) => !w.isVisible()),
  };
}
