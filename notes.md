### SSR with data preftch

* server waits for response to be fulfilled
* async fetch data
   * resolve promise
   * call action method to update store
   * use alt-iso to render html
* use html rendering to fulfill response