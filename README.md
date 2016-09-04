# proakt

This is an experiment to create a single source of truth to bootstrap, develop, package, and distribute universal and Electron React/Redux apps.

# Components

* Install instructions. TODO
* Upgrade instructions. TODO
* Universal server. TODO
* API Server. TODO
* Fileserver / proxy. TODO
* Pluggable API and server. TODO

# Install

Unfortunately babel plugins and other dependencies must be installed to the project root:

```
(
  export PKG=proakt;
  npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
)
```

# License

Copyright 2016, Swift Nav, All Rights Reserved.

MIT license.
