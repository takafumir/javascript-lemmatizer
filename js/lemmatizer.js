/*
* JavaScript Lemmatizer v0.0.1
* MIT License
*
* by Takafumi Yamano
*/

// extend String and define String#endsWith
String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

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
      ['est', 'e'],
      ['ier', 'y'],
      ['iest', 'y']
    ],
    adv:  [
      ['er',  '' ],
      ['est', '' ],
      ['er',  'e'],
      ['est', 'e'],
      ['ier', 'y'],
      ['iest', 'y']
    ]
  };

  this.wordlists  = {};
  this.exceptions = {};

  // initialize wordlists and exceptions
  for (var key in this.morphological_substitutions) {
    this.wordlists[key] = {};
    this.exceptions[key] = {};
  }

  // store dictionary data to localStorage from wn_files
  for (var pos in this.wn_files) {
    this.load_wordnet_files(pos, this.wn_files[pos][0], this.wn_files[pos][1]);
  }

  // fetch dictionary data from localStorage, then set up wordlists and exceptions
  for (var pos in this.wn_files) {
    this.setup_dic_data(pos);
  }
};

// Lemmatizer properties
Lemmatizer.prototype = {
  form: '',
  idx: '_idx',
  exc: '_exc',
  lems: [], // -> [ [lemma1, "verb"], [lemma2, "noun"]... ]

  // **************************************************
  // public
  // **************************************************
  // reuturn Array of ["lemma", "pos"] pairs
  // like [ ["lemma1", "verb"], ["lemma2", "noun"]... ]
  lemmas: function(form, pos) {
    var self = this;
    this.lems = [];
    this.form = form;

    var parts = ['verb', 'noun', 'adj', 'adv'];
    if ( pos && !_.include( parts, pos ) ) {
      console.log("warning: pos must be 'verb' or 'noun' or 'adj' or 'adv'.");
      return;
    }

    if (!pos) {
      _.each( parts, function(pos) { self.irregular_bases(pos); } );
      _.each( parts, function(pos) { self.regular_bases(pos); } );

      // when lemma not found and the form is included in wordlists.
      if ( this.is_lemma_empty() ) {
        _.chain(parts)
         .select( function(pos) { return self.wordlists[pos][form]; } )
         .each( function(pos) { self.lems.push([ form, pos ]); } );
      }
      // when lemma not found and the form is not included in wordlists.
      if ( this.is_lemma_empty() ) {
        this.lems.push([ form, '' ]);
      }
    } else {
      this.base_forms(pos);
      if ( this.is_lemma_empty() ) {
        this.lems.push([ form, pos ]);
      }
    }

    // sort to verb -> noun -> adv -> adj
    return _.sortBy( this.uniq_lemmas(this.lems), function(val) { return val[1]; } ).reverse();
  },

  // return only uniq lemmas without pos like [ 'high' ] or [ 'leave', 'leaf' ]
  only_lemmas: function(form, pos) {
    var result = _.map( this.lemmas(form, pos), function(val) { return val[0]; } );
    return _.uniq(result);
  },


  // **************************************************
  // private
  // The following properties(methods) are only used by
  // Lemmatizer inside, so don't call them from outside.
  // **************************************************
  is_lemma_empty: function() {
    return this.lems.length == 0;
  },

  // set up dictionary data
  load_wordnet_files: function(pos, list, exc) {
    var key_idx = pos + this.idx;
    this.open_file(key_idx, list);
    var key_exc = pos + this.exc; 
    this.open_file(key_exc, exc);
  },

  setup_dic_data: function(pos) {
    var self = this;
    var key_idx = pos + this.idx;
    _.each( this.fetch_idx_data(key_idx), function(w) {
      self.wordlists[pos][w] = w;
    });
    var key_exc = pos + this.exc; 
    _.each( this.fetch_exc_data(key_exc), function(item) {
      var w = item[0];
      var s = item[1];
      self.exceptions[pos][w] = s;
    });
  },

  open_file: function(key, file) {
    if (!localStorage[key]) {
      var self = this;
      // when using async ajax, localStorage[key] return undefined at first.
      // $.get(file, function(data){
      //   self.store_data(key, data);
      // });

      // so use sync networking only at the first time.
      $.ajax({
        url: file,
        type: 'get',
        async: false,
        success: function(data) {
          self.store_data(key, data);
        }
      });
    }
  },

  store_data: function(key, data) {
    localStorage[key] = data;
  },

  // somehow JSON.parse(localStorage[key]) does not work, so build array data from string.
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

  base_forms: function(pos) {
    this.irregular_bases(pos);
    this.regular_bases(pos);
  },

  // build array lemmas(this.lems) like [ [lemma1, "verb"], [lemma2, "noun"]... ]
  irregular_bases: function(pos) {
    if (this.exceptions[pos][this.form] && this.exceptions[pos][this.form] != this.form) {
      this.lems.push( [this.exceptions[pos][this.form], pos] );
    }
  },

  // build array lemmas(this.lems) like [ [lemma1, "verb"], [lemma2, "noun"]... ]
  regular_bases: function(pos) {
    var bases = null;
    // bases -> [ [lemma1, lemma2, lemma3...], pos ]
    bases = this.possible_bases(pos);
    if (bases) {
      this.check_lemmas(bases);
    }
  },

  // check if possible bases are include in lemma wordlists and push
  check_lemmas: function(bases) {
    var self = this;
    // bases -> [ [lemma1, lemma2, lemma3...], pos ]
    var lemmas = bases[0];
    var pos = bases[1];
    _.each( lemmas, function(lemma) {
      if ( self.wordlists[pos][lemma] && self.wordlists[pos][lemma] == lemma && lemma != self.form ) {
        self.lems.push( [lemma, pos] );
      }
    });
  },

  possible_bases: function(pos) {
    var self = this;
    var form = this.form;
    var lemmas = [];

    _.each(this.morphological_substitutions[pos], function(entry) {
      var morpho = entry[0];
      var origin = entry[1];
      if ( form.endsWith(morpho) ) {
        if ( pos == 'verb' && morpho == 'ing' && self.double_consonant(morpho) ) {
          lemmas.push( form.slice( 0, -(morpho.length + 1) + origin ) );
        }
        if ( (pos == 'adj' || pos == 'adv') && morpho == 'est' && self.double_consonant(morpho) ) {
          lemmas.push( form.slice( 0, -(morpho.length + 1) + origin ) );
        }
        if ( (pos == 'adj' || pos == 'adv') && morpho == 'er' && self.double_consonant(morpho) ) {
          lemmas.push( form.slice( 0, -(morpho.length + 1) + origin ) );
        }
        lemmas.push( form.slice( 0, -(morpho.length) ) + origin );
      }
    });

    if (lemmas.length == 0) {
      lemmas.push(form);
    }

    return [ lemmas, pos ];
  },

  double_consonant: function(suffix) {
    // for like bigger -> big
    var form = this.form;
    // length after removing suffix from form
    var len = form.length - suffix.length;
    return this.is_vowel(form[len - 3]) && !this.is_vowel(form[len - 2]) && form[len - 2] === form[len - 1];
  },

  is_vowel: function(letter) {
    return _.include(["a", "e", "i", "o", "u"], letter);
  },

  // [ ["leave", "verb"], ["leaf", "noun"], ["leave", "verb"], ["leave", "noun"] ];
  // -> [ ["leave", "verb"], ["leaf", "noun"], ["leave", "noun"] ];
  uniq_lemmas: function(lemmas) {
    var u_lemmas = [];
    var len = lemmas.length;
    for (var i = 0; i < len; i++) {
      var val = lemmas[i];
      if (!this.is_include(u_lemmas, val)) {
        u_lemmas.push(val);
      }
    }
    return u_lemmas;
  },

  is_include: function(lemmas, target) {
    var len = lemmas.length;
    for (var i = 0; i < len; i++) {
      if (lemmas[i][0] == target[0] && lemmas[i][1] == target[1]) {
        return true;
      }
    }
    return false;
  },

  // for debug to use like $('#lem-confirm').html( lem.confirm_dic('exc') )
  confirm_dic: function(type) {
    var words = null;
    if (type == 'exc') {
      words = this.exceptions;
    } else if (type == 'idx') {
      words = this.wordlists;
    }
    var html = '*** ' + type + ' ***<br />';
    var parts = ['verb', 'noun', 'adj', 'adv'];
    var len = parts.length;
    for (var i = 0; i < len; i++) {
      var pos = parts[i];
      var pos_comment = '--- ' + pos + ' ---<br />';
      var html = html + pos_comment;
      for (var w in words[pos]) {
        var item = w + ' -> ' + words[pos][w] + '<br />';
        var html = html + item;
      }
    }
    return html;
  }
};
