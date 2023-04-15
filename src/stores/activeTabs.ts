import { writable } from "svelte/store";

chrome.tabs.query({ currentWindow: true, highlighted: false }, (tabs) => {
  activeTabs.set(tabs.map((tab) => ({ id: tab.id, name: tab.title } as Tab)));
});

export const activeTabs = writable<Tab[]>([]);

chrome.tabs.onCreated.addListener((tab) => {
  activeTabs.update((tabs) => {
    return [...tabs, { id: tab.id, name: tab.title } as Tab];
  });
});
