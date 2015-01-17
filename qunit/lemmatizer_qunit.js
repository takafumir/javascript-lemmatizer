var lem = new Lemmatizer();

QUnit.test( 'JavaScript Lemmatizer QUnit Tests', function( assert ) {
  assert.equal( lem.lemma('analyses', 'noun'), 'analysis' );

  // Lemmatizer leaves alone words that its dictionary does not contain to keep proper names such as 'James' intact.
  assert.equal( lem.lemma('MacBooks', 'noun'), 'MacBooks' );

  // Lemmatize a word with a part of speech (pos).
  assert.equal( lem.lemma('desks',    'noun'), 'desk'  );
  assert.equal( lem.lemma('hired',    'verb'), 'hire'  );
  assert.equal( lem.lemma('worried',  'verb'), 'worry' );
  assert.equal( lem.lemma('partying', 'verb'), 'party' );
  assert.equal( lem.lemma('better',   'adj'),  'good'  );
  assert.equal( lem.lemma('hotter',   'adj'),  'hot'   );
  assert.equal( lem.lemma('best',     'adv'),  'well'  );
  assert.equal( lem.lemma('best',     'adj'),  'good'  );
  
  // Lemmatizer give a result even when no pos is given, by assuming it to be :verb, :noun, :adv, or :adj.
  assert.equal( lem.lemma('plays'),  'play' );
  assert.equal( lem.lemma('oxen'),   'ox'   );
  assert.equal( lem.lemma('fired'),  'fire' );
  assert.equal( lem.lemma('slower'), 'slow' );

  // non-existing word
  assert.equal( lem.lemma('asdfassda'), 'asdfassda' );

  // return hiher as it is, because 'higher' is itself contained in the adj list.
  assert.equal( lem.lemma('higher'), 'high' );

  // various test with pos
  assert.equal( lem.lemma('goes', 'verb'), 'go' );
  assert.equal( lem.lemma('went', 'verb'), 'go' );
  assert.equal( lem.lemma('gone', 'verb'), 'go' );
  assert.equal( lem.lemma('writes', 'verb'), 'write' );
  assert.equal( lem.lemma('wrote', 'verb'), 'write' );
  assert.equal( lem.lemma('written', 'verb'), 'write' );
  assert.equal( lem.lemma('confirms', 'verb'), 'confirm' );
  assert.equal( lem.lemma('confirmed', 'verb'), 'confirm' );
  assert.equal( lem.lemma('confirming', 'verb'), 'confirm' );
  assert.equal( lem.lemma('acidless', 'noun'), 'acidless' );
  assert.equal( lem.lemma('pizzas', 'noun'), 'pizza' );
  assert.equal( lem.lemma('foxes', 'noun'), 'fox' );
  assert.equal( lem.lemma('hacked', 'verb'), 'hack' );
  assert.equal( lem.lemma('coded', 'verb'), 'code' );
  assert.equal( lem.lemma('fitting', 'verb'), 'fit' );
  assert.equal( lem.lemma('coding', 'verb'), 'code' );
  assert.equal( lem.lemma('pirouetting', 'verb'), 'pirouette' );
  assert.equal( lem.lemma('hacking', 'verb'), 'hack' );
  assert.equal( lem.lemma('earliest', 'adj'), 'early' );
  assert.equal( lem.lemma('biggest', 'adj'), 'big' );
  assert.equal( lem.lemma('largest', 'adj'), 'large' );
  assert.equal( lem.lemma('smallest', 'adj'), 'small' );
  assert.equal( lem.lemma('earlier', 'adj'), 'early' );
  assert.equal( lem.lemma('bigger', 'adj'), 'big' );
  assert.equal( lem.lemma('larger', 'adj'), 'large' );
  assert.equal( lem.lemma('smaller', 'adj'), 'small' );
  assert.equal( lem.lemma('recognizable', 'adj'), 'recognizable' );
  assert.equal( lem.lemma('networkable', 'adj'), 'networkable' );
  assert.equal( lem.lemma('resettability', 'noun'), 'resettability' );
  assert.equal( lem.lemma('repairability', 'noun'), 'repairability' );
  assert.equal( lem.lemma('reorganizability', 'noun'), 'reorganizability' );
  assert.equal( lem.lemma('starts', 'verb'), 'start' );
  assert.equal( lem.lemma('teaches', 'verb'), 'teach' );
  assert.equal( lem.lemma('goes', 'verb'), 'go' );
  assert.equal( lem.lemma('talked', 'verb'), 'talk' );
  assert.equal( lem.lemma('saved', 'verb'), 'save' );
  assert.equal( lem.lemma('sitting', 'verb'), 'sit' );
  assert.equal( lem.lemma('having', 'verb'), 'have' );
  assert.equal( lem.lemma('talking', 'verb'), 'talk' );
  assert.equal( lem.lemma('heavier', 'adj'), 'heavy' );
  assert.equal( lem.lemma('bigger', 'adj'), 'big' );
  assert.equal( lem.lemma('huger', 'adj'), 'huge' );
  assert.equal( lem.lemma('lower', 'adj'), 'low' );
  assert.equal( lem.lemma('writable', 'adj'), 'writable' );
  assert.equal( lem.lemma('readable', 'adj'), 'readable' );
  assert.equal( lem.lemma('readability', 'noun'), 'readability' );
  assert.equal( lem.lemma('writability', 'noun'), 'writability' );
  assert.equal( lem.lemma('scoreless', 'noun'), 'scoreless' );
  assert.equal( lem.lemma('dogs', 'noun'), 'dog' );
  assert.equal( lem.lemma('dishes', 'noun'), 'dish' );
  assert.equal( lem.lemma('heaviest', 'adj'), 'heavy' );
  assert.equal( lem.lemma('biggest', 'adj'), 'big' );
  assert.equal( lem.lemma('hugest', 'adj'), 'huge' );
  assert.equal( lem.lemma('lowest', 'adj'), 'low' );
  assert.equal( lem.lemma('heavier', 'adj'), 'heavy' );
  assert.equal( lem.lemma('bigger', 'adj'), 'big' );
  assert.equal( lem.lemma('lower', 'adj'), 'low' );

  // various test without pos
  assert.equal( lem.lemma('goes'), 'go' );
  assert.equal( lem.lemma('went'), 'go' );
  assert.equal( lem.lemma('gone'), 'go' );
  assert.equal( lem.lemma('writes'), 'write' );
  assert.equal( lem.lemma('wrote'), 'write' );
  assert.equal( lem.lemma('written'), 'write' );
  assert.equal( lem.lemma('confirms'), 'confirm' );
  assert.equal( lem.lemma('confirmed'), 'confirm' );
  assert.equal( lem.lemma('confirming'), 'confirm' );
  assert.equal( lem.lemma('acidless'), 'acidless' );
  assert.equal( lem.lemma('pizzas'), 'pizza' );
  assert.equal( lem.lemma('foxes'), 'fox' );
  assert.equal( lem.lemma('hacked'), 'hack' );
  assert.equal( lem.lemma('coded'), 'code' );
  assert.equal( lem.lemma('fitting'), 'fit' );
  assert.equal( lem.lemma('coding'), 'code' );
  assert.equal( lem.lemma('pirouetting'), 'pirouette' );
  assert.equal( lem.lemma('hacking'), 'hack' );
  assert.equal( lem.lemma('earliest'), 'early' );
  assert.equal( lem.lemma('biggest'), 'big' );
  assert.equal( lem.lemma('largest'), 'large' );
  assert.equal( lem.lemma('smallest'), 'small' );
  assert.equal( lem.lemma('earlier'), 'early' );
  assert.equal( lem.lemma('bigger'), 'big' );
  assert.equal( lem.lemma('larger'), 'large' );
  assert.equal( lem.lemma('smaller'), 'small' );
  assert.equal( lem.lemma('recognizable'), 'recognizable' );
  assert.equal( lem.lemma('networkable'), 'networkable' );
  assert.equal( lem.lemma('resettability'), 'resettability' );
  assert.equal( lem.lemma('repairability'), 'repairability' );
  assert.equal( lem.lemma('reorganizability'), 'reorganizability' );
  assert.equal( lem.lemma('starts'), 'start' );
  assert.equal( lem.lemma('teaches'), 'teach' );
  assert.equal( lem.lemma('goes'), 'go' );
  assert.equal( lem.lemma('talked'), 'talk' );
  assert.equal( lem.lemma('saved'), 'save' );
  assert.equal( lem.lemma('sitting'), 'sit' );
  assert.equal( lem.lemma('having'), 'have' );
  assert.equal( lem.lemma('talking'), 'talk' );
  assert.equal( lem.lemma('heavier'), 'heavy' );
  assert.equal( lem.lemma('bigger'), 'big' );
  assert.equal( lem.lemma('huger'), 'huge' );
  assert.equal( lem.lemma('lower'), 'low' );
  assert.equal( lem.lemma('writable'), 'writable' );
  assert.equal( lem.lemma('readable'), 'readable' );
  assert.equal( lem.lemma('readability'), 'readability' );
  assert.equal( lem.lemma('writability'), 'writability' );
  assert.equal( lem.lemma('scoreless'), 'scoreless' );
  assert.equal( lem.lemma('dogs'), 'dog' );
  assert.equal( lem.lemma('dishes'), 'dish' );
  assert.equal( lem.lemma('heaviest'), 'heavy' );
  assert.equal( lem.lemma('biggest'), 'big' );
  assert.equal( lem.lemma('hugest'), 'huge' );
  assert.equal( lem.lemma('lowest'), 'low' );
  assert.equal( lem.lemma('heavier'), 'heavy' );
  assert.equal( lem.lemma('bigger'), 'big' );
  assert.equal( lem.lemma('lower'), 'low' );

});
