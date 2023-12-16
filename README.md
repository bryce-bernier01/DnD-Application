# DnD-Application

To get Environment setup:
Environment Creation: 
1) Install Node JS and Git
2) Create a folder called Repo (or something else it doesn't really matter)
3) Open Visual Studio Code and open the Repo folder
4) Open a new terminal in VS Code and type in “node -v” to check that node is correctly installed (should return something like “v18.1.1” or something similar
5) Now, create a new Git Bash terminal in VS Code (see image)
6) Enter in “git init”
7) Enter “git clone https://github.com/bryce-bernier01/DnD-Application.git”
8) Now in VS Code go to: File > Open Folder and then open DnD-Application folder
9) Now open a new terminal and make sure it’s in the DnD-Application directory
10) If on Windows, enter “npm i -g expo-cli” or if on Mac, “sudo npm i -g expo-cli”
11) Next do “npm install” At this point you should be all setup!
12) Type “npm start” to get the app running and able to be connected to the Expo app on your phone
13) Get the QR code provided by VS Code's terminal and scan it with your Expo Go app.

Good Extensions for VS Code: React Native Tools, React-Native/React/Redux snippets, Prettier - Code Formatter 
Resources for building React Native Apps: https://www.youtube.com/watch?v=0-S5a0eXPoc 

Known Bugs and Issues:
1) Character Creation will most likely need a restart of the app to display the newly created character.
2) When using spells catalog, the spells will show the previous clicked classes spells instead of the ones the user just clicked. To look for Cleric spells, click Cleric, hit close, and hit cleric again to see the catalog.
3) Clicking on some Cards from spells catalog will provide an error.
4) Clicking on Creatures and Weapons buttons will provide an error.

To Do:
1) Figma Designs for Navigation Bar and Banner
2) Create Banner, Navigation Components and create new views for each components (Spells, Character Creator, etc.)
3) Finish other Figma Designs for each view to get ready to implement items 4-8
4) Database research, learning and implementation. Local instances of databases should be important here
5) Create card component to be used in Spell page, weapon catalog and monster wiki (Pass important props and let display all important information)
6) Spell Page (Requiring database access of some sort? Filter by classes?)
7) Weapon Catalog (Uses database also)
8) Monster Wiki (Use database to insert enemies? Maybe let DM's create custom monsters that they can add?)
9) Character Creation (Intuitive Character Creation. Use database to determine what spells and skills that character can learn?)

Features to implement if we have time:
1) Sign in/Account creation
2) Let Users connect with each other for sessions and groups
3) Session views: Let DM give out exp. points to players characters in a session, implement mapping?, implement scenario creation where DM can add creatures/enemies to scenarios and can keep track of creature's experience, armor rating, weapons, health, etc. all in one place.

DONE:
1) Figma Designs for Navigation Bar and Banner
2) Create Banner, Navigation Components and create new views for each components (Spells, Character Creator, etc.)
3) Finish other Figma Designs for each view to get ready to implement items 4-8
4) Database research, learning and implementation. Local instances of databases should be important here
5) Create card component to be used in Spell page, weapon catalog and monster wiki 
6) Spell Page 
7) Character Creation
