yarn init -y:

What It Does: Initializes a new Yarn project in the current directory.
Result: Creates a package.json file with default values for the project.
Purpose: It's the starting point for any Yarn-based project, setting up the groundwork to manage the project's dependencies.
Relation to yarn add: After initializing a project with yarn init, you can use yarn add to install dependencies that will be listed in the package.json.


....

yarn add express:

What It Does: Adds the Express.js library to your project.
Result: Updates the package.json and yarn.lock files to include Express.js and installs the library's files in the node_modules directory.
Purpose: Installs the Express.js framework so you can use it in your project to create web applications.
Relation to yarn init -y: It assumes that a project has already been initialized with yarn init -y. You add dependencies like Express to the initialized project structure.


....

Nodemon keeps your server running and sychronize any live changes
to install nodemon globalley, we use, yarn global add nodemon

....

if nodemon does not work for some reason, you can use npx nodemon filename.js

....

Get-Command nodemon
This command will check if PowerShell can locate nodemon. If it's successful, it will display the path to nodemon.

....

Find Yarn Global Bin Path, yarn global bin

....

This will show you a list of all global packages installed via Yarn, yarn global list


....

