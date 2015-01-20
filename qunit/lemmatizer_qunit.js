var lem = new Lemmatizer();

QUnit.test( 'JavaScript Lemmatizer QUnit Tests', function( assert ) {
  assert.deepEqual( lem.lemmas('analyses', 'noun'), [ ["analysis", "noun"] ] );

  // Lemmatizer leaves alone words that its dictionary does not contain.
  assert.deepEqual( lem.lemmas('MacBooks', 'noun'), [ ['MacBooks', 'noun'] ] );

  // Lemmatize a word with a part of speech (pos).
  assert.deepEqual( lem.lemmas('desks', 'noun'), [ ['desk', 'noun'] ] );
  assert.deepEqual( lem.lemmas('hired', 'verb'), [ ['hire', 'verb'] ] );
  assert.deepEqual( lem.lemmas('worried', 'verb'), [ ['worry', 'verb'] ]);
  assert.deepEqual( lem.lemmas('partying', 'verb'), [ ['party', 'verb'] ]);
  assert.deepEqual( lem.lemmas('better', 'adj'),  [ ['good', 'adj'] ] );
  assert.deepEqual( lem.lemmas('hotter', 'adj'),  [ ['hot', 'adj'] ]  );
  assert.deepEqual( lem.lemmas('best', 'adv'),  [ ['well', 'adv'] ] );
  assert.deepEqual( lem.lemmas('best', 'adj'),  [ ['good', 'adj'] ] );
  
  // Lemmatizer give a result even when no pos is given, by assuming it to be :verb, :noun, :adv, or :adj.
  assert.deepEqual( lem.lemmas('plays'), [ ['play', 'verb'], ['play', 'noun'] ] );
  assert.deepEqual( lem.lemmas('oxen'), [ ['ox', 'noun'] ] );
  assert.deepEqual( lem.lemmas('fired'), [ ['fire', 'verb'] ] );
  assert.deepEqual( lem.lemmas('slower'), [ ['slow', 'adv'], ['slow', 'adj'] ] );

  // non-existing word
  assert.deepEqual( lem.lemmas('asdfassda'), [ ['asdfassda', ''] ] );

  // various test with pos
  assert.deepEqual( lem.lemmas('goes', 'verb'), [ ['go', 'verb'] ] );
  assert.deepEqual( lem.lemmas('went', 'verb'), [ ['go', 'verb'] ] );
  assert.deepEqual( lem.lemmas('gone', 'verb'), [ ['go', 'verb'] ] );
  assert.deepEqual( lem.lemmas('writes', 'verb'), [ ['write', 'verb'] ] );
  assert.deepEqual( lem.lemmas('wrote', 'verb'), [ ['write', 'verb'] ] );
  assert.deepEqual( lem.lemmas('written', 'verb'), [ ['write', 'verb'] ] );
  assert.deepEqual( lem.lemmas('confirms', 'verb'), [ ['confirm', 'verb'] ] );
  assert.deepEqual( lem.lemmas('confirmed', 'verb'), [ ['confirm', 'verb'] ] );
  assert.deepEqual( lem.lemmas('confirming', 'verb'), [ ['confirm', 'verb'] ] );
  assert.deepEqual( lem.lemmas('acidless', 'noun'), [ ['acidless', 'noun'] ] );
  assert.deepEqual( lem.lemmas('pizzas', 'noun'), [ ['pizza', 'noun'] ] );
  assert.deepEqual( lem.lemmas('foxes', 'noun'), [ ['fox', 'noun'] ] );
  assert.deepEqual( lem.lemmas('hacked', 'verb'), [ ['hack', 'verb'] ] );
  assert.deepEqual( lem.lemmas('coded', 'verb'), [ ['cod', 'verb'], ['code', 'verb'] ] );
  assert.deepEqual( lem.lemmas('fitting', 'verb'), [ ['fit', 'verb'] ] );
  assert.deepEqual( lem.lemmas('coding', 'verb'), [ ['cod', 'verb'], ['code', 'verb'] ] );
  assert.deepEqual( lem.lemmas('pirouetting', 'verb'), [ ['pirouette', 'verb'] ] );
  assert.deepEqual( lem.lemmas('hacking', 'verb'), [ ['hack', 'verb'] ] );
  assert.deepEqual( lem.lemmas('earliest', 'adj'), [ ['early', 'adj'] ] );
  assert.deepEqual( lem.lemmas('biggest', 'adj'), [ ['big', 'adj'] ] );
  assert.deepEqual( lem.lemmas('largest', 'adj'), [ ['large', 'adj'] ] );
  assert.deepEqual( lem.lemmas('smallest', 'adj'), [ ['small', 'adj'] ] );
  assert.deepEqual( lem.lemmas('earlier', 'adj'), [ ['early', 'adj'] ] );
  assert.deepEqual( lem.lemmas('bigger', 'adj'), [ ['big', 'adj'] ] );
  assert.deepEqual( lem.lemmas('larger', 'adj'), [ ['large', 'adj'] ] );
  assert.deepEqual( lem.lemmas('smaller', 'adj'), [ ['small', 'adj'] ] );
  assert.deepEqual( lem.lemmas('recognizable', 'adj'), [ ['recognizable', 'adj'] ] );
  assert.deepEqual( lem.lemmas('networkable', 'adj'), [ ['networkable', 'adj'] ] );
  assert.deepEqual( lem.lemmas('resettability', 'noun'), [ ['resettability', 'noun'] ] );
  assert.deepEqual( lem.lemmas('repairability', 'noun'), [ ['repairability', 'noun'] ] );
  assert.deepEqual( lem.lemmas('reorganizability', 'noun'), [ ['reorganizability', 'noun'] ] );
  assert.deepEqual( lem.lemmas('starts', 'verb'), [ ['start', 'verb'] ] );
  assert.deepEqual( lem.lemmas('teaches', 'verb'), [ ['teach', 'verb'] ] );
  assert.deepEqual( lem.lemmas('talked', 'verb'), [ ['talk', 'verb'] ] );
  assert.deepEqual( lem.lemmas('saved', 'verb'), [ ['save', 'verb'] ] );
  assert.deepEqual( lem.lemmas('sitting', 'verb'), [ ['sit', 'verb'] ] );
  assert.deepEqual( lem.lemmas('having', 'verb'), [ ['have', 'verb'] ] );
  assert.deepEqual( lem.lemmas('talking', 'verb'), [ ['talk', 'verb'] ] );
  assert.deepEqual( lem.lemmas('heavier', 'adj'), [ ['heavy', 'adj'] ] );
  assert.deepEqual( lem.lemmas('bigger', 'adj'), [ ['big', 'adj'] ] );
  assert.deepEqual( lem.lemmas('huger', 'adj'), [ ['huge', 'adj'] ] );
  assert.deepEqual( lem.lemmas('lower', 'adj'), [ ['low', 'adj'] ] );
  assert.deepEqual( lem.lemmas('writable', 'adj'), [ ['writable', 'adj'] ] );
  assert.deepEqual( lem.lemmas('readable', 'adj'), [ ['readable', 'adj'] ] );
  assert.deepEqual( lem.lemmas('readability', 'noun'), [ ['readability', 'noun'] ] );
  assert.deepEqual( lem.lemmas('writability', 'noun'), [ ['writability', 'noun'] ] );
  assert.deepEqual( lem.lemmas('scoreless', 'noun'), [ ['scoreless', 'noun'] ] );
  assert.deepEqual( lem.lemmas('dogs', 'noun'), [ ['dog', 'noun'] ] );
  assert.deepEqual( lem.lemmas('dishes', 'noun'), [ ['dish', 'noun'] ] );
  assert.deepEqual( lem.lemmas('heaviest', 'adj'), [ ['heavy', 'adj'] ] );
  assert.deepEqual( lem.lemmas('biggest', 'adj'), [ ['big', 'adj'] ] );
  assert.deepEqual( lem.lemmas('hugest', 'adj'), [ ['huge', 'adj'] ] );
  assert.deepEqual( lem.lemmas('lowest', 'adj'), [ ['low', 'adj'] ] );
  assert.deepEqual( lem.lemmas('heavier', 'adj'), [ ['heavy', 'adj'] ] );
  assert.deepEqual( lem.lemmas('bigger', 'adj'), [ ['big', 'adj'] ] );
  assert.deepEqual( lem.lemmas('lower', 'adj'), [ ['low', 'adj'] ] );
  assert.deepEqual( lem.lemmas('higher', 'adj'), [ ['high', 'adj'] ] );
  assert.deepEqual( lem.lemmas('leaves', 'noun'), [ ['leave', 'noun'], ['leaf', 'noun'] ] );
  assert.deepEqual( lem.lemmas('player', 'noun'), [ ['player', 'noun'] ] );

  // various test without pos
  assert.deepEqual( lem.lemmas('goes'), [ ['go', 'verb'], ['go', 'noun'] ] );
  assert.deepEqual( lem.lemmas('went'), [ ['go', 'verb'] ] );
  assert.deepEqual( lem.lemmas('gone'), [ ['go', 'verb'] ] );
  assert.deepEqual( lem.lemmas('writes'), [ ['write', 'verb'] ] );
  assert.deepEqual( lem.lemmas('wrote'), [ ['write', 'verb'] ] );
  assert.deepEqual( lem.lemmas('written'), [ ['write', 'verb'] ] );
  assert.deepEqual( lem.lemmas('confirms'), [ ['confirm', 'verb'] ] );
  assert.deepEqual( lem.lemmas('confirmed'), [ ['confirm', 'verb'] ] );
  assert.deepEqual( lem.lemmas('confirming'), [ ['confirm', 'verb'] ] );
  assert.deepEqual( lem.lemmas('acidless'), [ ['acidless', ''] ] );
  assert.deepEqual( lem.lemmas('pizzas'), [ ['pizza', 'noun'] ] );
  assert.deepEqual( lem.lemmas('foxes'), [ ['fox', 'verb'], ['fox', 'noun'] ] );
  assert.deepEqual( lem.lemmas('hacked'), [ ['hack', 'verb'] ] );
  assert.deepEqual( lem.lemmas('coded'), [ ['cod', 'verb'], ['code', 'verb'] ] );
  assert.deepEqual( lem.lemmas('fitting'), [ ['fit', 'verb'] ] );
  assert.deepEqual( lem.lemmas('coding'), [ ['cod', 'verb'], ['code', 'verb'] ] );
  assert.deepEqual( lem.lemmas('pirouetting'), [ ['pirouette', 'verb'] ] );
  assert.deepEqual( lem.lemmas('hacking'), [ ['hack', 'verb'] ] );
  assert.deepEqual( lem.lemmas('earliest'), [ ['early', 'adv'], ['early', 'adj'] ] );
  assert.deepEqual( lem.lemmas('biggest'), [ ['big', 'adv'], ['big', 'adj'] ] );
  assert.deepEqual( lem.lemmas('largest'), [ ['large', 'adv'], ['large', 'adj'] ] );
  assert.deepEqual( lem.lemmas('smallest'), [ ['small', 'adv'], ['small', 'adj'] ] );
  assert.deepEqual( lem.lemmas('earlier'), [ ['early', 'adv'], ['early', 'adj'] ] );
  assert.deepEqual( lem.lemmas('bigger'), [ ['big', 'adv'], ['big', 'adj'] ] );
  assert.deepEqual( lem.lemmas('larger'), [ ['large', 'adv'], ['large', 'adj'] ] );
  assert.deepEqual( lem.lemmas('smaller'), [ ['small', 'adv'], ['small', 'adj'] ] );
  assert.deepEqual( lem.lemmas('recognizable'), [ ['recognizable', 'adj'] ] );
  assert.deepEqual( lem.lemmas('networkable'), [ ['networkable', ''] ] );
  assert.deepEqual( lem.lemmas('resettability'), [ ['resettability', ''] ] );
  assert.deepEqual( lem.lemmas('repairability'), [ ['repairability', ''] ] );
  assert.deepEqual( lem.lemmas('reorganizability'), [ ['reorganizability', ''] ] );
  assert.deepEqual( lem.lemmas('starts'), [ ['start', 'verb'], ['start', 'noun'] ] );
  assert.deepEqual( lem.lemmas('teaches'), [ ['teach', 'verb'], ['teach', 'noun'] ] );
  assert.deepEqual( lem.lemmas('talked'), [ ['talk', 'verb'] ] );
  assert.deepEqual( lem.lemmas('saved'), [ ['save', 'verb'] ] );
  assert.deepEqual( lem.lemmas('sitting'), [ ['sit', 'verb'] ] );
  assert.deepEqual( lem.lemmas('having'), [ ['have', 'verb'] ] );
  assert.deepEqual( lem.lemmas('talking'), [ ['talk', 'verb'] ] );
  assert.deepEqual( lem.lemmas('heavier'), [ ['heavy', 'adv'], ['heavy', 'adj'] ] );
  assert.deepEqual( lem.lemmas('bigger'), [ ['big', 'adv'], ['big', 'adj'] ] );
  assert.deepEqual( lem.lemmas('huger'), [ ['huge', 'adj'] ] );
  assert.deepEqual( lem.lemmas('lower'), [ ['low', 'adv'], ['low', 'adj'] ] );
  assert.deepEqual( lem.lemmas('writable'), [ ['writable', ''] ] );
  assert.deepEqual( lem.lemmas('readable'), [ ['readable', 'adj'] ] );
  assert.deepEqual( lem.lemmas('readability'), [ ['readability', 'noun'] ] );
  assert.deepEqual( lem.lemmas('writability'), [ ['writability', ''] ] );
  assert.deepEqual( lem.lemmas('scoreless'), [ ['scoreless', 'adj'] ] );
  assert.deepEqual( lem.lemmas('dogs'), [ ['dog', 'verb'], ['dog', 'noun'] ] );
  assert.deepEqual( lem.lemmas('dishes'), [ ['dish', 'verb'], ['dish', 'noun'] ] );
  assert.deepEqual( lem.lemmas('heaviest'), [ ['heavy', 'adv'], ['heavy', 'adj'] ] );
  assert.deepEqual( lem.lemmas('biggest'), [ ['big', 'adv'], ['big', 'adj'] ] );
  assert.deepEqual( lem.lemmas('hugest'), [ ['huge', 'adj'] ] );
  assert.deepEqual( lem.lemmas('lowest'), [ ['low', 'adv'], ['low', 'adj'] ] );
  assert.deepEqual( lem.lemmas('heavier'), [ ['heavy', 'adv'], ['heavy', 'adj'] ] );
  assert.deepEqual( lem.lemmas('bigger'), [ ['big', 'adv'], ['big', 'adj'] ] );
  assert.deepEqual( lem.lemmas('lower'), [ ['low', 'adv'], ['low', 'adj'] ] );
  assert.deepEqual( lem.lemmas('higher'), [ ['high', 'adv'], ['high', 'adj'] ] );
  assert.deepEqual( lem.lemmas('leaves'), [ ['leave', 'verb'], ['leave', 'noun'], ['leaf', 'noun'] ] );
  assert.deepEqual( lem.lemmas('player'), [ ['player', 'noun'] ] );

  // **************************************************
  // only_lemmas tests
  // **************************************************
  assert.deepEqual( lem.only_lemmas('analyses', 'noun'), [ 'analysis' ] );

  // Lemmatizer leaves alone words that its dictionary does not contain.
  assert.deepEqual( lem.only_lemmas('MacBooks', 'noun'), [ 'MacBooks' ] );

  // Lemmatize a word with a part of speech (pos).
  assert.deepEqual( lem.only_lemmas('desks', 'noun'), [ 'desk' ] );
  assert.deepEqual( lem.only_lemmas('hired', 'verb'), [ 'hire' ] );
  assert.deepEqual( lem.only_lemmas('worried', 'verb'), [ 'worry' ]);
  assert.deepEqual( lem.only_lemmas('partying', 'verb'), [ 'party' ]);
  assert.deepEqual( lem.only_lemmas('better', 'adj'), ['good'] );
  assert.deepEqual( lem.only_lemmas('hotter', 'adj'), ['hot']  );
  assert.deepEqual( lem.only_lemmas('best', 'adv'), [ 'well'] );
  assert.deepEqual( lem.only_lemmas('best', 'adj'), [ 'good'] );
  
  // Lemmatizer give a result even when no pos is given, by assuming it to be :verb, :noun, :adv, or :adj.
  assert.deepEqual( lem.only_lemmas('plays'), [ 'play' ] );
  assert.deepEqual( lem.only_lemmas('oxen'), [ 'ox' ] );
  assert.deepEqual( lem.only_lemmas('fired'), [ 'fire' ] );
  assert.deepEqual( lem.only_lemmas('slower'), [ 'slow' ] );

  // non-existing word
  assert.deepEqual( lem.only_lemmas('asdfassda'), [ 'asdfassda' ] );

  // various test with pos
  assert.deepEqual( lem.only_lemmas('goes', 'verb'), [ 'go' ] );
  assert.deepEqual( lem.only_lemmas('went', 'verb'), [ 'go' ] );
  assert.deepEqual( lem.only_lemmas('gone', 'verb'), [ 'go' ] );
  assert.deepEqual( lem.only_lemmas('writes', 'verb'), [ 'write' ] );
  assert.deepEqual( lem.only_lemmas('wrote', 'verb'), [ 'write' ] );
  assert.deepEqual( lem.only_lemmas('written', 'verb'), [ 'write' ] );
  assert.deepEqual( lem.only_lemmas('confirms', 'verb'), [ 'confirm' ] );
  assert.deepEqual( lem.only_lemmas('confirmed', 'verb'), [ 'confirm' ] );
  assert.deepEqual( lem.only_lemmas('confirming', 'verb'), [ 'confirm' ] );
  assert.deepEqual( lem.only_lemmas('acidless', 'noun'), [ 'acidless' ] );
  assert.deepEqual( lem.only_lemmas('pizzas', 'noun'), [ 'pizza' ] );
  assert.deepEqual( lem.only_lemmas('foxes', 'noun'), [ 'fox' ] );
  assert.deepEqual( lem.only_lemmas('hacked', 'verb'), [ 'hack' ] );
  assert.deepEqual( lem.only_lemmas('coded', 'verb'), [ 'cod', 'code' ] );
  assert.deepEqual( lem.only_lemmas('fitting', 'verb'), [ 'fit' ] );
  assert.deepEqual( lem.only_lemmas('coding', 'verb'), [ 'cod', 'code' ] );
  assert.deepEqual( lem.only_lemmas('pirouetting', 'verb'), [ 'pirouette' ] );
  assert.deepEqual( lem.only_lemmas('hacking', 'verb'), [ 'hack' ] );
  assert.deepEqual( lem.only_lemmas('earliest', 'adj'), [ 'early' ] );
  assert.deepEqual( lem.only_lemmas('biggest', 'adj'), [ 'big' ] );
  assert.deepEqual( lem.only_lemmas('largest', 'adj'), [ 'large' ] );
  assert.deepEqual( lem.only_lemmas('smallest', 'adj'), [ 'small' ] );
  assert.deepEqual( lem.only_lemmas('earlier', 'adj'), [ 'early' ] );
  assert.deepEqual( lem.only_lemmas('bigger', 'adj'), [ 'big' ] );
  assert.deepEqual( lem.only_lemmas('larger', 'adj'), [ 'large' ] );
  assert.deepEqual( lem.only_lemmas('smaller', 'adj'), [ 'small' ] );
  assert.deepEqual( lem.only_lemmas('recognizable', 'adj'), [ 'recognizable' ] );
  assert.deepEqual( lem.only_lemmas('networkable', 'adj'), [ 'networkable' ] );
  assert.deepEqual( lem.only_lemmas('resettability', 'noun'), [ 'resettability' ] );
  assert.deepEqual( lem.only_lemmas('repairability', 'noun'), [ 'repairability' ] );
  assert.deepEqual( lem.only_lemmas('reorganizability', 'noun'), [ 'reorganizability' ] );
  assert.deepEqual( lem.only_lemmas('starts', 'verb'), [ 'start' ] );
  assert.deepEqual( lem.only_lemmas('teaches', 'verb'), [ 'teach' ] );
  assert.deepEqual( lem.only_lemmas('talked', 'verb'), [ 'talk' ] );
  assert.deepEqual( lem.only_lemmas('saved', 'verb'), [ 'save' ] );
  assert.deepEqual( lem.only_lemmas('sitting', 'verb'), [ 'sit' ] );
  assert.deepEqual( lem.only_lemmas('having', 'verb'), [ 'have' ] );
  assert.deepEqual( lem.only_lemmas('talking', 'verb'), [ 'talk' ] );
  assert.deepEqual( lem.only_lemmas('heavier', 'adj'), [ 'heavy' ] );
  assert.deepEqual( lem.only_lemmas('bigger', 'adj'), [ 'big' ] );
  assert.deepEqual( lem.only_lemmas('huger', 'adj'), [ 'huge' ] );
  assert.deepEqual( lem.only_lemmas('lower', 'adj'), [ 'low' ] );
  assert.deepEqual( lem.only_lemmas('writable', 'adj'), [ 'writable' ] );
  assert.deepEqual( lem.only_lemmas('readable', 'adj'), [ 'readable' ] );
  assert.deepEqual( lem.only_lemmas('readability', 'noun'), [ 'readability' ] );
  assert.deepEqual( lem.only_lemmas('writability', 'noun'), [ 'writability' ] );
  assert.deepEqual( lem.only_lemmas('scoreless', 'noun'), [ 'scoreless' ] );
  assert.deepEqual( lem.only_lemmas('dogs', 'noun'), [ 'dog' ] );
  assert.deepEqual( lem.only_lemmas('dishes', 'noun'), [ 'dish' ] );
  assert.deepEqual( lem.only_lemmas('heaviest', 'adj'), [ 'heavy' ] );
  assert.deepEqual( lem.only_lemmas('biggest', 'adj'), [ 'big' ] );
  assert.deepEqual( lem.only_lemmas('hugest', 'adj'), [ 'huge' ] );
  assert.deepEqual( lem.only_lemmas('lowest', 'adj'), [ 'low' ] );
  assert.deepEqual( lem.only_lemmas('heavier', 'adj'), [ 'heavy' ] );
  assert.deepEqual( lem.only_lemmas('bigger', 'adj'), [ 'big' ] );
  assert.deepEqual( lem.only_lemmas('lower', 'adj'), [ 'low' ] );
  assert.deepEqual( lem.only_lemmas('higher', 'adj'), [ 'high' ] );
  assert.deepEqual( lem.only_lemmas('leaves', 'noun'), [ 'leave', 'leaf' ] );
  assert.deepEqual( lem.only_lemmas('player', 'noun'), [ 'player' ] );

  // various test without pos
  assert.deepEqual( lem.only_lemmas('goes'), [ 'go' ] );
  assert.deepEqual( lem.only_lemmas('went'), [ 'go' ] );
  assert.deepEqual( lem.only_lemmas('gone'), [ 'go' ] );
  assert.deepEqual( lem.only_lemmas('writes'), [ 'write' ] );
  assert.deepEqual( lem.only_lemmas('wrote'), [ 'write' ] );
  assert.deepEqual( lem.only_lemmas('written'), [ 'write' ] );
  assert.deepEqual( lem.only_lemmas('confirms'), [ 'confirm' ] );
  assert.deepEqual( lem.only_lemmas('confirmed'), [ 'confirm' ] );
  assert.deepEqual( lem.only_lemmas('confirming'), [ 'confirm' ] );
  assert.deepEqual( lem.only_lemmas('acidless'), [ 'acidless' ] );
  assert.deepEqual( lem.only_lemmas('pizzas'), [ 'pizza' ] );
  assert.deepEqual( lem.only_lemmas('foxes'), [ 'fox' ] );
  assert.deepEqual( lem.only_lemmas('hacked'), [ 'hack' ] );
  assert.deepEqual( lem.only_lemmas('coded'), [ 'cod', 'code' ] );
  assert.deepEqual( lem.only_lemmas('fitting'), [ 'fit' ] );
  assert.deepEqual( lem.only_lemmas('coding'), [ 'cod', 'code' ] );
  assert.deepEqual( lem.only_lemmas('pirouetting'), [ 'pirouette' ] );
  assert.deepEqual( lem.only_lemmas('hacking'), [ 'hack' ] );
  assert.deepEqual( lem.only_lemmas('earliest'), [ 'early' ] );
  assert.deepEqual( lem.only_lemmas('biggest'), [ 'big' ] );
  assert.deepEqual( lem.only_lemmas('largest'), [ 'large' ] );
  assert.deepEqual( lem.only_lemmas('smallest'), [ 'small' ] );
  assert.deepEqual( lem.only_lemmas('earlier'), [ 'early' ] );
  assert.deepEqual( lem.only_lemmas('bigger'), [ 'big' ] );
  assert.deepEqual( lem.only_lemmas('larger'), [ 'large' ] );
  assert.deepEqual( lem.only_lemmas('smaller'), [ 'small' ] );
  assert.deepEqual( lem.only_lemmas('recognizable'), [ 'recognizable' ] );
  assert.deepEqual( lem.only_lemmas('networkable'), [ 'networkable' ] );
  assert.deepEqual( lem.only_lemmas('resettability'), [ 'resettability' ] );
  assert.deepEqual( lem.only_lemmas('repairability'), [ 'repairability' ] );
  assert.deepEqual( lem.only_lemmas('reorganizability'), [ 'reorganizability' ] );
  assert.deepEqual( lem.only_lemmas('starts'), [ 'start' ] );
  assert.deepEqual( lem.only_lemmas('teaches'), [ 'teach' ] );
  assert.deepEqual( lem.only_lemmas('talked'), [ 'talk' ] );
  assert.deepEqual( lem.only_lemmas('saved'), [ 'save' ] );
  assert.deepEqual( lem.only_lemmas('sitting'), [ 'sit' ] );
  assert.deepEqual( lem.only_lemmas('having'), [ 'have' ] );
  assert.deepEqual( lem.only_lemmas('talking'), [ 'talk' ] );
  assert.deepEqual( lem.only_lemmas('heavier'), [ 'heavy' ] );
  assert.deepEqual( lem.only_lemmas('bigger'), [ 'big' ] );
  assert.deepEqual( lem.only_lemmas('huger'), [ 'huge' ] );
  assert.deepEqual( lem.only_lemmas('lower'), [ 'low' ] );
  assert.deepEqual( lem.only_lemmas('writable'), [ 'writable' ] );
  assert.deepEqual( lem.only_lemmas('readable'), [ 'readable' ] );
  assert.deepEqual( lem.only_lemmas('readability'), [ 'readability' ] );
  assert.deepEqual( lem.only_lemmas('writability'), [ 'writability' ] );
  assert.deepEqual( lem.only_lemmas('scoreless'), [ 'scoreless' ] );
  assert.deepEqual( lem.only_lemmas('dogs'), [ 'dog' ] );
  assert.deepEqual( lem.only_lemmas('dishes'), [ 'dish' ] );
  assert.deepEqual( lem.only_lemmas('heaviest'), [ 'heavy' ] );
  assert.deepEqual( lem.only_lemmas('biggest'), [ 'big' ] );
  assert.deepEqual( lem.only_lemmas('hugest'), [ 'huge' ] );
  assert.deepEqual( lem.only_lemmas('lowest'), [ 'low' ] );
  assert.deepEqual( lem.only_lemmas('heavier'), [ 'heavy' ] );
  assert.deepEqual( lem.only_lemmas('bigger'), [ 'big' ] );
  assert.deepEqual( lem.only_lemmas('lower'), [ 'low' ] );
  assert.deepEqual( lem.only_lemmas('higher'), [ 'high' ] );
  assert.deepEqual( lem.only_lemmas('leaves'), [ 'leave', 'leaf' ] );
  assert.deepEqual( lem.only_lemmas('player'), [ 'player' ] );
});
