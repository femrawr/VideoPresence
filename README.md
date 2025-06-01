# VideoPresence

Discord rich presence for HuraWatch, HiAnime. more sites coming soon!

Heavily inspired by [anime discord persence](https://github.com/doniel-t/anime-discord-presence)

## Sites Supported:
- [HuraWatch](https://hurawatch.cc/)
- [HiAnime](https://hianimez.to/)

## How to use
1. Install [Node JS](https://nodejs.org/en)
2. Clone the repo: `git clone https://github.com/femrawr/VideoPresence`
    you can alternatively download the project manually:
    - go to the top right of the repo
    - click the green `<> Code v` button
    - click on `Download ZIP`
    - extract the file
3. go into `rpc-server/index.js` and change `CLIENT_ID` to your own bot id
4. run `node index.js` to start the server
5. copy the code from `userscript/build/script.user.js` and put it into [tampermonkey](https://www.tampermonkey.net/) or any userscript manager
6. save and you're ready to go