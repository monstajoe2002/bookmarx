import { writable } from "svelte/store";

chrome.tabs.query({ currentWindow: true, highlighted: false }, (tabs) => {
  tabs = tabs.filter(({ url }) => url !== "chrome://newtab/");
  activeTabs.set(tabs.map((tab) => ({ id: tab.id, name: tab.title } as Tab)));
});

export const activeTabs = writable<Tab[]>([]);

chrome.tabs.onCreated.addListener((tab) => {
  activeTabs.update((tabs) => {
    return [...tabs, { id: tab.id, name: tab.title } as Tab];
  });
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  activeTabs.update((tabs) => {
    const index = tabs.findIndex((tab) => tab.id === tabId);
    if (index !== -1) {
      tabs[index].name = tab.title;
    }
    return tabs;
  });
});

chrome.tabs.onRemoved.addListener((tabId) => {
  activeTabs.update((tabs) => {
    return tabs.filter((tab) => tab.id !== tabId);
  });
});


export function switchToTab(tabId: number) {
  chrome.tabs.update(tabId, { active: true });
}