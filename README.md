# Bookmarx

Bookmarx is a Chromium Extension that replaces Chrome's default New Tab page with a Bookmarx page where users can view, edit and delete their bookmarks. They can also be grouped according to the user's preference.

**NOTE**: This extension is in **alpha**, meaning some features or capabilities are subject to change, in addition to unexpected bugs or errors. If you come across problems, it would help greatly to open issues so that I can fix them as quickly as possible.

## Features

- [x] Authentication using email and password
- [x] View all active tabs
- [x] Save active tab as bookmark
- [x] Create, edit, delete a bookmark/bookmark group
- [x] Dark mode

 Coming soon/TBD:

- [ ] Release to Chrome Web Store
- [ ] OAuth integration
- [ ] CI/CD
- [ ] Automated Testing

## Why?

The idea came about while I was using [tabExtend](https://www.tabextend.com), a popular Chrome extension which also replaces the default new tab with a custom one. It has quickly became a constant in my workspace, but my free account allows up to only 30 saves. That's when it hit me: I  can build my own  **free** and **open-source** alternative with unlimited saves.

## Setup

    git clone https://github.com/monstajoe2002/bookmarx.git
    cd bookmarx/
    npm install
    npm run dev  # (run a dev server)
    npm run build # (build the extension)
Afterwards, load the extension into the browser

 1. Open the **Extensions** page
 2. Enable **Developer Mode**
 3. Click **Load unpacked**
 4. Navigate to the `dist` folder in your project
 5. Click **Select Folder**
