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
    if (typeof pos === 'undefined') {
      pos = null;
    }

    if (!pos) {
      var parts = ["verb", "noun", "adj", "adv"];
      var len = parts.length;
      for (var i = 0; i < len; i++) {
        var p = parts[i];
        var result = this.lemma(form, p);
        if (result != form) {
          return result;
        }
      }
      return form;
    }

    if (exc_lemma = this.exceptions[pos][form]) {
      return exc_lemma;
    }

    this.each_lemma(form, pos, this.return_x);

    return form;
  },

  return_x: function(x) {
    return x;
  },
  
  // private
  // The following methods are only used by Lemmatizer inside, so don't call them from outside.
  load_wordnet_files: function(pos, list, exc) {
    // process wordlists (list)
    this.open_file(pos, list);
    var idx_data = this.fetch_idx_data(pos);
    var idx_len  = idx_data.length;
    for (var i = 0; i < idx_len; i++) {
      var w = idx_data[i];
      this.wordlists[pos][w] = w;
    }

    // process exceptions (exc)
    this.open_file(pos, exc);
    var exc_data = this.fetch_exc_data(pos);
    var exc_len  = exc_data.length;
    for (var i = 0; i < exc_len; i++) {
      var w = exc_data[i][0];
      var s = exc_data[i][1];
      this.exceptions[pos][w] = s;
    }
  },

  open_file: function(pos, file) {
    var self = this;
    $.get(file, function(data){
      self.store_exc_data(pos, data);
    });
  },

  store_idx_data: function(key, data) {
    localStorage[key] = data;
  },

  fetch_idx_data: function(key) {
    arr = localStorage[key].split(',');
    return arr;
  },

  store_exc_data: function(key, data) {
    localStorage[key] = data;
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

  each_lemma: function(form, pos, func) {
    if (pos == "noun" && form.endsWith('ful')) {
      each_lemma(form.slice(0, form.length-3), pos, this.ful_yield(func));
    } else {
      this.each_substitutions(form, pos, this.sub_yield);
    }
  },

  ful_yield: function(x) {
    /*
    each_lemma(form[0, form.length-3], pos) do |x|
      yield x + 'ful'
    end

    yield x + 'ful' should run each_lemma's block
    */
    this.return_x(x + 'ful');
  },

  sub_yield: function(x) {
    this.sub_yield(x);
  },

  each_substitutions: function(form, pos, sub_yield) {
    if (lemma = this.wordlists[pos][form]) {
      this.sub_yield(lemma);
    }

    for (var key in this.morphological_substitutions) {
      var old_w = this.morphological_substitutions[key][0];
      var new_w = this.morphological_substitutions[key][1];
      if (form.endsWith(old_w)) {
        this.each_substitutions(form.slice(0, form.length - old_w.length) + new_w, pos, this.sub_yield);
      }
    }
  },

  console_log: function(form, pos) {
  }
};

var lem = new Lemmatizer();
var word = "talked";
var word_lemma = lem.lemma(word);
console.log(word + "'s base form is " + word_lemma);
