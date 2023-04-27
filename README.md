# MU 3616 Final Project

How to set up:

1. Download Node.js and npm from here: https://nodejs.org/en/download
2. Download this repository by clicking the green "Code" button and then "Download ZIP".
3. Unzip the file you just downloaded.
4. Open Terminal and drag the unzipped folder into the terminal, and press Return. You should now see the path of the folder in your terminal prompt.
5. Open another Terminal window and repeat step 4.
6. In the first Terminal window, type this command: `cd server && npm i && npm run build && npm run qrcode` and hit Return. Resize the window so that the entire QR code is visible.
7. In the second Terminal window, type this command: `cd app && npm i && npm run dev` and hit Return.
8. Open `Final Project.maxpat` in Max, and click `script start`.
9. Scan the QR code displayed in the first Terminal window to access the game. Make sure your phone and computer are on the same Wi-Fi network!
10. When you're ready to begin the game, click `begin-game` and turn on the `ezdac~`.
11. The game will last for 2 minutes. When the time is up, click on each team and turn on the toggle to play back their rhythm!
12. When you're finished, click `script stop` in Max and close the Terminal windows.
