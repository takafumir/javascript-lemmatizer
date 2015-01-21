var db;

var dictionary = new (function () {
  var self = this;

  function init() {
    // Setup indexedDB (database).
    var request = indexedDB.open("iknowDictionary", 23);
    request.onerror = function (event) {
      console.log("Error opening database.");
    };

    request.onsuccess = function (event) {
      console.log("Database successfully opened.");
      db = event.target.result;

      // Setup helpers
      self.audioPlayer = new AudioPlayer(db);
      self.lemmatiser = new Lemmatiser(db);
      self.lookupManager = new LookupManager(db);

      checkDatabaseContents();
    };

    request.onupgradeneeded = upgradeDatabase;
  }





  init();

})();
