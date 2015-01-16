// Lemmatizer constructor
var Lemmatizer = function() {
  this.wn_files = {
    noun: [
      '../dict/index.noun.word.json',
      '../dict/noun.exc.json'
    ],
    verb: [
      '../dict/index.verb.word.json',
      '../dict/verb.exc.json'
    ],
    adj:  [
      '../dict/index.adj.word.json',
      '../dict/adj.exc.json'
    ],
    adv:  [
      '../dict/index.adv.word.json',
      '../dict/adv.exc.json'
    ]
  };

  this.morphological_substitutions = {
    noun: [
      ['s',    ''   ],
      ['ses',  's'  ],
      ['ves',  'f'  ],
      ['xes',  'x'  ],
      ['zes',  'z'  ],
      ['ches', 'ch' ],
      ['shes', 'sh' ],
      ['men',  'man'],
      ['ies',  'y'  ]
    ],
    verb: [
      ['s',   '' ],
      ['ies', 'y'],
      ['es',  'e'],
      ['es',  '' ],
      ['ed',  'e'],
      ['ed',  '' ],
      ['ing', 'e'],
      ['ing', '' ]
    ],
    adj:  [
      ['er',  '' ],
      ['est', '' ],
      ['er',  'e'],
      ['est', 'e']
    ],
    adv:  [
    ]
  };

  this.wordlists  = {};
  this.exceptions = {};

  for (var key in this.morphological_substitutions) {
    this.wordlists[key] = {};
    this.exceptions[key] = {};
  }

  for (var pos in this.wn_files) {
    this.load_wordnet_files(pos, this.wn_files[pos][0], this.wn_files[pos][1]);
  }
};

// Lemmatizer properties
Lemmatizer.prototype = {

  dict: "",

  // public
  load_wordnet_files: function(pos, list, exc) {
    //this.open_file(list);
    this.dict = this.open_file("../dict/adv.exc.json");

    /*
    var arr = ["hoge", "fuga", "unko"];
    var len = arr.length;
    for ( var i = 0; i < len; i++) {
      alert(pos + " : " + arr[i]);
    }
    */
  },

  open_file: function(file) {
    var self = this;
    $.get(file, function(data){
      self.set_wordlists(data[4][0]);
    });
  },

  set_wordlists: function(data) {
    this.dict = data
    alert(this.dict);
  },

  test: function() {
    alert(this.dict);
  },

  // private
  // The following methods are only used by Lemmatizer inside, so don't call them from outside
  _private_method: function() {
  }

};


var lem = new Lemmatizer();
lem.test();
