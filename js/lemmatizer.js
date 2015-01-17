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

  // not use these parts' pairs
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
  form: '',

  // public
  lemma: function(form, pos) {
    this.form = form;
    var result = null;

    if (typeof pos === 'undefined') {
      pos = null;
    }

    if (!pos) {
      var parts = ['verb', 'noun', 'adj', 'adv'];
      var len = parts.length;
      // search irregular base
      for (var i = 0; i < len; i++) {
        if (result = this.irregular_base(parts[i])) {
          return result;
        }
      }
      /* acts like ruby-lemmatizer when comment out
      // when form is lemma
      for (var i = 0; i < len; i++) {
        if (result = this.wordlists[parts[i]][this.form]) {
          return result;
        }
      }
      */
      // search regular base
      for (var i = 0; i < len; i++) {
        if (result = this.regular_base(parts[i])) {
          if ( result != this.form ) {
            return result;
          }
        }
      }
      return form;
    }

    if (result = this.base_form(pos)) {
      return result;
    }

    return form;
  },

  // private
  // The following methods are only used by Lemmatizer inside, so don't call them from outside.
  // set up dictionary data
  load_wordnet_files: function(pos, list, exc) {
    // process wordlists (list)
    var key_idx = pos + '_idx';
    this.open_file(key_idx, list);
    var idx_data = this.fetch_idx_data(key_idx);
    var idx_len  = idx_data.length;
    for (var i = 0; i < idx_len; i++) {
      var w = idx_data[i];
      this.wordlists[pos][w] = w;
    }

    // process exceptions (exc)
    var key_exc = pos + '_exc'; 
    this.open_file(key_exc, exc);
    var exc_data = this.fetch_exc_data(key_exc);
    var exc_len  = exc_data.length;
    for (var i = 0; i < exc_len; i++) {
      var w = exc_data[i][0];
      var s = exc_data[i][1];
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

  base_form: function(pos) {
    var result = null;
    result = this.irregular_base(pos)
    if (result) {
      return result;
    }
    /* acts like ruby-lemmatizer when comment out
    if (result = this.wordlists[pos][this.form]) {
      return result;
    }
    */
    result = this.regular_base(pos);
    if ( result && (result != this.form) ) {
      return result;
    }
    return null;
  },

  irregular_base: function(pos) {
    if (this.exceptions[pos][this.form]) {
      return this.exceptions[pos][this.form];
    }
    return null;
  },

  regular_base: function(pos) {
    var bases = null;
    // bases -> [ [lemma1, lemma2, lemma3...], pos ]
    switch (pos){
      case 'verb':
        bases = this.verb_bases();
        break;
      case 'noun':
        bases = this.noun_bases();
        break;
      case 'adj':
        bases = this.adj_adv_bases('adj');
        break;
      case 'adv':
        bases = this.adj_adv_bases('adv');
        break;
      default:
        break;
    }
    if (bases) {
      var result = this.get_lemma(bases);
    }
    if (result) {
      return result;
    }
    return null;
  },

  get_lemma(bases) {
    // bases -> [ [lemma1, lemma2, lemma3...], pos ]
    var pos = bases[1];
    var lemmas_len = bases[0].length;
    for (var i = 0; i < lemmas_len; i++) {
      var lemma = bases[0][i];
      if ( this.wordlists[pos][lemma] && (this.wordlists[pos][lemma] == lemma) ) {
        return lemma;
      }
    }
    return null;
  },

  verb_bases: function() {
    var form = this.form;
    var lemmas = [];

    if (form.endsWith('s')) {
      // starts -> start
      lemmas.push(form.slice(0, -1));
      if ( this.is_end_with_es() ) {
        // teaches -> teach
        lemmas.push(form.slice(0, -2));
      } else if (form.endsWith('es')) {
        // goes -> go
        lemmas.push(form.slice(0, -2));
      }
    } else if (form.endsWith('ed')) {
      // talked -> talk
      lemmas.push(form.slice(0, -2));
      // taked -> take
      lemmas.push(form.slice(0, -1));
    } else if (form.endsWith('ing')) {
      if (this.double_consonant('ing')) {
        // sitting -> sit
        lemmas.push(form.slice(0, -4));
      }
      // having -> have
      lemmas.push(form.slice(0, -3) + 'e');
      // talking -> talk
      lemmas.push(form.slice(0, -3));
    }
    /* acts like ruby-lemmatizer when comment out
    else if (form.endsWith('er')) {
      if (form.endsWith('ier')) {
        // heavier -> heavy
        lemmas.push(form.slice(0, -3) + 'y');
      } else if (this.double_consonant('er')) {
        // bigger -> big
        lemmas.push(form.slice(0, -3));
      }
      // huger -> huge
      lemmas.push(form.slice(0, -1));
      // lower -> low
      lemmas.push(form.slice(0, -2));
    }
    else if (form.endsWith('able')) {
      // writable -> write
      lemmas.push(form.slice(0, -4) + 'e');
      // readable -> read
      lemmas.push(form.slice(0, -4));
    } else if (form.endsWith('ability')) {
      if (this.double_consonant('ability')) {
        // resettability -> reset
        lemmas.push(form.slice(0, -8));
      }
      // readability -> read
      lemmas.push(form.slice(0, -7));
      // writability -> write
      lemmas.push(form.slice(0, -7) + 'e');
    }
    */
    return [ lemmas, 'verb' ];
  },

  noun_bases: function() {
    var form = this.form;
    var lemmas = [];
    if (form.endsWith('less')) {
      // scoreless -> score
      lemmas.push(form.slice(0, -4));
    } else if (form.endsWith('s')) {
      // dogs -> dog
      lemmas.push(form.slice(0, -1));
      if ( this.is_end_with_es() ) {
        // dishes -> dish
        lemmas.push(form.slice(0, -2));
      }
    }
    return [ lemmas, 'noun' ];
  },

  adj_adv_bases: function(pos) {
    var form = this.form;
    var lemmas = [];
    if (form.endsWith('est')) {
      if (form.endsWith('iest')){
        // heaviest -> heavy
        lemmas.push(form.slice(0, -4) + 'y');
      } else if (this.double_consonant('est')) {
        // biggest -> big
        lemmas.push(form.slice(0, -4));
      }
      // hugest -> huge
      lemmas.push(form.slice(0, -2));
      // lowest -> low
      lemmas.push(form.slice(0, -3));
    } else if (form.endsWith('er')) {
      if (form.endsWith('ier')) {
        // heavier -> heavy
        lemmas.push(form.slice(0, -3) + 'y');
      } else if (this.double_consonant('er')) {
        // bigger -> big
        lemmas.push(form.slice(0, -3));
      }
      // huger -> huge
      lemmas.push(form.slice(0, -1));
      // lower -> low
      lemmas.push(form.slice(0, -2));
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
    var vowels = ["a", "e", "i", "o", "u"];
    var len = vowels.length;
    for (var i = 0; i < len; i++) {
      if (letter == vowels[i]) {
        return true;
      }
    }
    return false;
  },

  is_end_with_es: function() {
    var form = this.form;
    if ( form.endsWith('ses') || form.endsWith('xes') || form.endsWith('zes') || form.endsWith('shes') || form.endsWith('ches') ) {
      return true;
    } else {
      return false;
    }
  },

  // to confirm
  console_log: function(form, pos) {
    var lemma = this.lemma(form, pos);
    console.log(form + "'s base form is " + lemma);
  }
};

/*
var lem = new Lemmatizer();
var form_word = 'readdability';
var part_of_speech = 'verb';

console.log('--- with pos ----');
lem.console_log(form_word, part_of_speech);

console.log('--- without pos ----');
lem.console_log(form_word);
*/
