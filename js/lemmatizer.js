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

  // not use these pos's pairs
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

  // public
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

  // to confirm in console
  console_log: function(form, pos) {
    _.each(this.lemmas(form, pos), function(val) {
      console.log("The base form of '" + form + "' is '" + val[0] + "' as " + val[1]);
    });
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
    var key_idx = pos + this.idx;
    var idx_data = this.fetch_idx_data(key_idx);
    var idx_len  = idx_data.length;
    for (var i = 0; i < idx_len; i++) {
      var w = idx_data[i];
      this.wordlists[pos][w] = w;
    }

    var key_exc = pos + this.exc; 
    var exc_data = this.fetch_exc_data(key_exc);
    var exc_len  = exc_data.length;
    for (var i = 0; i < exc_len; i++) {
      var w = exc_data[i][0];
      var s = exc_data[i][1];
      this.exceptions[pos][w] = s;
    }
  },

  open_file: function(key, file) {
    if (!localStorage[key]) {
      var self = this;
      // when using async ajax, localStorage[key] return undefined at first. (186)
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
    if (this.exceptions[pos][this.form]) {
      this.lems.push( [this.exceptions[pos][this.form], pos] );
    }
  },

  // build array lemmas(this.lems) like [ [lemma1, "verb"], [lemma2, "noun"]... ]
  regular_bases: function(pos) {
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
      this.regular_lemmas(bases);
    }
  },

  // return array lemmas like [ [lemma1, "verb"], [lemma2, "noun"]... ]
  regular_lemmas: function(bases) {
    // bases -> [ [lemma1, lemma2, lemma3...], pos ]
    var pos = bases[1];
    var lemmas = bases[0];
    var lemmas_len = bases[0].length;
    for (var i = 0; i < lemmas_len; i++) {
      var lemma = lemmas[i];
      if ( this.wordlists[pos][lemma] && this.wordlists[pos][lemma] == lemma && lemma != this.form ) {
        this.lems.push( [lemma, pos] );
      }
    }
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
      // saved -> save
      lemmas.push(form.slice(0, -1));
      // talked -> talk
      lemmas.push(form.slice(0, -2));
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
    if (lemmas.length == 0) {
      lemmas.push(form);
    }
    return [ lemmas, 'verb' ];
  },

  noun_bases: function() {
    var form = this.form;
    var lemmas = [];
    if (form.endsWith('s')) {
      // dogs -> dog
      lemmas.push(form.slice(0, -1));
      if ( this.is_end_with_es() ) {
        // dishes -> dish
        lemmas.push(form.slice(0, -2));
      }
    }
    if (lemmas.length == 0) {
      lemmas.push(form);
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

  // var arr = [ ["leave", "verb"], ["leaf", "noun"], ["leave", "verb"], ["leave", "noun"] ];
  // var u_arr = this.uniq_lemmas(arr);
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
