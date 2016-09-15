# proact

This is an experiment to create a single source of truth to bootstrap, develop, package, and distribute universal and Electron React/Redux apps.

proact is a framework that attempts to make it easy to bootstrap an application, but also to make your application code ultimately more
readable, maintanable, and production-ready.

Some view frameworks like proact as [evil][library-frameworks-evil]. The arguments are legitimate, but [I](http://www.github.com/joshuagross)
grew sick of each of my applications having slightly different, slightly incompatible copies of boilerplate. My feeling is that by restricting
applications to a subset of common dependencies and patterns, complexity over many applications can be reduced.

# Components

* API server - done.
* babel config - done.
* eslint config - done (separate repo).
* Install instructions. TODO
* Upgrade instructions. TODO
* Universal server. TODO
* API Server documentation. TODO
* Fileserver / proxy. TODO
* Pluggable API and server. TODO

# Install

Unfortunately babel plugins, webpack + plugins, and other dependencies (which?) must be installed to the project root:

```
(
  export PKG=proact;
  npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
)
```

webpack and babel really make a lot of assumptions about where plugins are residing, and for the most part
assume that everything is under the project root.

# License

Copyright 2016, Swift Nav, All Rights Reserved.

MIT license.

[library-frameworks-evil]: http://tomasp.net/blog/2015/library-frameworks/
