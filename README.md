# Resonator web client!

## Table of Contents

- [Folder structure](#folder-structure)
5
## Folder structure
### resonator-react - react application
````
resonator-react/ - React application base folder, the place to run npm!
  README.md
  node_modules/
  public/ -  Contains static data. For not can be untouched.
  src/ - Contains all data for building the final project
  src/components - contains simple enough components.
  src/containers - contains complex components with stateful logic.
  src/config - contains different configuration files in JSON format.
  src/media - contains all the static data that can be used by multiple components.
  src/pages - contains page components.
  src/routers - contains router components.
  src/store - contains REDUX store configuration: reducers.
  src/test - contains all components, media,pages that should be used ONLY during tests and not in production.
  src/styles - contains all styles that are used in multiple components
  src/api - contains all the logic needed to communicate with backend services.
  `````
