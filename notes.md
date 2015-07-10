### SSR with data preftch

* server waits for response to be fulfilled
* async fetch data
   * resolve promise
   * call action method to update store
   * use alt-iso to render html
* use html rendering to fulfill response

### Reads
* http://facebook.github.io/react/docs
* http://facebook.github.io/react/docs/addons.html
* http://webpack.github.io/docs/
* http://survivejs.com
* http://blog.namangoel.com/browserify-vs-webpack-js-drama
* http://blog.namangoel.com/css-in-js-in-css
* http://angular-tips.com/blog/2015/06/why-will-angular-2-rock/
* http://facebook.github.io/react/blog/2015/06/12/deprecating-jstransform-and-react-tools.html
* http://stackoverflow.com/questions/28553904/client-routing-using-react-router-and-server-side-routing
* https://github.com/mhart/react-server-example

### General Resources
* Christian Alfoni's webpack setup
   * https://christianalfoni.github.io/react-webpack-cookbook/index.html
   * http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
   * https://github.com/christianalfoni/webpack-express-boilerplate
   * http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
   * http://www.christianalfoni.com/articles/2015_05_18_Cerebral-developer-preview
* https://github.com/webpack/webpack
* https://github.com/rackt/react-router
* https://rackt.github.io/react-router/#HistoryLocation
* https://github.com/goatslacker/alt
* https://github.com/github/fetch
* (react material) 
   * https://github.com/callemall/material-ui
* (vanilla js material) 
   * https://github.com/Dogfalo/materialize
* https://www.npmjs.com/package/color
* https://github.com/FormidableLabs/radium
* https://github.com/FormidableLabs/component-playground
* https://github.com/FormidableLabs/converter-react
* https://github.com/yahoo/react-intl
* http://formatjs.io/react/

* Demo a node server
   * http://code.runnable.com
   
* Use React Components with backbone
   * http://www.thomasboyt.com/2013/12/17/using-reactjs-as-a-backbone-view.html
   * http://blog.mayflower.de/3937-Backbone-React.html
   * https://github.com/clayallsopp/react.backbone
   * http://joelburget.com/backbone-to-react/
   
* Flux 
   * https://github.com/goatslacker/alt
   * https://github.com/goatslacker/alt-tutorial
   
* Flux + react router example   
   * https://github.com/gaearon/flux-react-router-example
   * https://github.com/lostpebble/alt-react-router-example
   * https://github.com/gaearon/redux (revisit)
   
* isomorphic flux
   * https://github.com/goatslacker/iso/tree/d6b854b02864f9fe143dd9e2665d3e949acad912/examples/datetime-flux
   
* more iso examples to try
   * https://github.com/erikras/react-redux-universal-hot-example
   
* ALT
   * The Docs - http://alt.js.org/docs/
   * getting started with ALT - http://alt.js.org/guide/
   
* Webpack docs
  * http://webpack.github.io/docs/
  * https://github.com/webpack/docs/wiki/cli

### Walmart Resources
* https://gecgithub01.walmart.com/react/react-dev-guide
* https://gecgithub01.walmart.com/thor/getting-started
* https://gecgithub01.walmart.com/pages/react/showcase
* https://gecgithub01.walmart.com/react/analytics

* Alt/Iso example with SSR
   * https://gecgithub01.walmart.com/react/item-page
   
   * Ken's example
      * https://gecgithub01.walmart.com/react/flux-example

### Next
* fetch
* mixins (deprecated)
* production mode

### Issues
* able to run app via webpack-hot-loader but not via a simple webserver
* run hot-loader and app node server at the same time
   * (try this) - https://github.com/FormidableLabs/converter-react
* improper to use jquery plugins that modify dom
   * http://stackoverflow.com/questions/25436445/using-jquery-plugins-that-transform-the-dom-in-react-components
* (wormhole pattern for jquery plugins)
   * https://gist.github.com/ryanflorence/7cdaea0af8e334413502
* SSR isomorphism issue with material-ui:
   * https://github.com/callemall/material-ui/issues/748
* list of issues in Quip
   * https://quip.com/YRudAaDW6UXD
* isomorphic data fetching with react router
   * https://github.com/rackt/react-router/issues/57

### Done
* tie a route change to a targeted view update - 6.11.2015
* add css to react components - 6.11.2015
* radium - 6.11.2015
* json tree view
   * (react component)
      * http://react.rocks/example/react-json-inspector
      * https://bitbucket.org/davevedder/react-json-viewer
   * (jquery component)
      * http://blog.yesmeck.com/jquery-jsonview/
* Webpack + Express
   * http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup
   * https://github.com/christianalfoni/webpack-express-boilerplate
* react with addons
* isomorphic server rendering
* propTypes

### Extras / Alternatives
* https://github.com/systemjs/systemjs