// Lemmatizer constructor
var Lemmatizer = function() {
  this.wn_files = {
    noun: [
      '../dict/index.noun.json',
      '../dict/noun.exc.json'
    ],
    verb: [
      '../dict/index.verb.json',
      '../dict/verb.exc.json'
    ],
    adj:  [
      '../dict/index.adj.json',
      '../dict/adj.exc.json'
    ],
    adv:  [
      '../dict/index.adv.json',
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

  // public
  lemma: function(form, pos) {
    var result = null;

    if (typeof pos === 'undefined') {
      pos = null;
    }

    if (!pos) {
      var parts = ["verb", "noun", "adj", "adv"];
      var len = parts.length;
      for (var i = 0; i < len; i++) {
        var p = parts[i];
        if (result = this.base_form(form, p)) {
          return result;
        }
      }
      return form;
    }

    if (result = this.base_form(form, pos)) {
      return result;
    }

    return form;
  },

  // private
  // The following methods are only used by Lemmatizer inside, so don't call them from outside.
  // set up dictionary data
  load_wordnet_files: function(pos, list, exc) {
    // process wordlists (list)
    var key_idx = pos + "_idx";
    this.open_file(key_idx, list);
    var idx_data = this.fetch_idx_data(key_idx);
    var idx_len  = idx_data.length;
    for (var i = 0; i < idx_len; i++) {
      var w = idx_data[i];
      this.wordlists[pos][w] = w;
    }

    // process exceptions (exc)
    var key_exc = pos + "_exc"; 
    this.open_file(key_exc, exc);
    var exc_data = this.fetch_exc_data(key_exc);
    var exc_len  = exc_data.length;
    for (var i = 0; i < exc_len; i++) {
      var w = exc_data[i][0];
      var s = exc_data[i][1];
      //console.log(pos + " : " + w + " : " + s);
      this.exceptions[pos][w] = s;
    }
  },

  open_file: function(key, file) {
    var self = this;
    $.get(file, function(data){
      self.store_data(key, data);
    });
  },

  store_data: function(key, data) {
    localStorage[key] = data;
  },

  fetch_idx_data: function(key) {
    arr = localStorage[key].split(',');
    return arr;
  },

  fetch_exc_data: function(key) {
    data = localStorage[key].split(',');
    var len = data.length;
    var index = 0;
    var arr = [];
    for (var i = 0; i < len; i++) {
      if (i % 2 != 0) {
        continue;
      }
      arr[index] = [];
      arr[index][0] = data[i];
      arr[index][1] = data[i+1];
      index++;
    }
    return arr;
  },
  // end of set up dictionary data


  // change implements not to use yield

  base_form: function(form, pos) {
    var result = null;
    result = this.irregular_base(form, pos)
    if (result) {
      return result;
    }
    result = this.regular_base(form, pos);
    if (result != form) {
      return result;
    }
    return null;
  },

  irregular_base: function(form, pos) {
    if (this.exceptions[pos][form]) {
      return this.exceptions[pos][form];
    }
    return null;
  },

  regular_base: function(form, pos) {
    // implement later
    var result = null;
    switch (pos){
      case 'verb':
        result = this.verb_base(form);
        break;
      case 'noun':
        result = this.noun_base(form);
        break;
      case 'adj':
        result = this.adj_base(form);
        break;
      case 'adv':
        result = this.adv_base(form);
        break;
      default:
        break;
    }
    if (result) {
      return result;
    }
    return form;
  },

  verb_base: function(form) {
  },

  noun_base: function(form) {
    // scoreless -> score
    if (form.endsWith('less')) {
      return form.slice(0, -4);
    }
    // dishes -> dish
    if ( form.endsWith('ses') || form.endsWith('xes') || form.endsWith('zes') || form.endsWith('shes') || form.endsWith('ches') ) {
      return form.slice(0, -2);
    }
    // dogs -> dog
    return form.slice(0, -1);
  },

  adj_base: function(form) {
  },

  adv_base: function(form) {
  },

  console_log: function(form, pos) {
    var lemma = this.lemma(form, pos);
    console.log(form + "'s base form is " + lemma);
  }
};

var lem = new Lemmatizer();
var form_word = "computers";
var part_of_speech = "noun";

console.log("--- with pos ----");
lem.console_log(form_word, part_of_speech);

console.log("--- without pos ----");
lem.console_log(form_word);
