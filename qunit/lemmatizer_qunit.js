var lem = new Lemmatizer();

QUnit.test( 'JavaScript Lemmatizer QUnit Tests', function( assert ) {
  // lem.lemmas() return array result like [ [lemma1, verb], [lemma2, noun], ... ],
  // so define custome assertion method.
  function assert_equal_lemmas(actual, expected) {
    var act_len = actual.length;
    var exp_len = expected.length;
    assert.equal( act_len, exp_len );
    if (act_len == exp_len) {
      for (var i = 0; i < act_len; i++) {
       assert.equal( actual[i][0], expected[i][0] );
       assert.equal( actual[i][1], expected[i][1] );
      }
    }
  }

  // lem.only_lemmas() return array result like [ lemma1, lemma2, ... ],
  // so define custome assertion method.
  function assert_equal_only_lemmas(actual, expected) {
    var act_len = actual.length;
    var exp_len = expected.length;
    assert.equal( act_len, exp_len );
    if (act_len == exp_len) {
      for (var i = 0; i < act_len; i++) {
       assert.equal( actual[i], expected[i] );
      }
    }
  }

  assert_equal_lemmas( lem.lemmas('analyses', 'noun'), [ ["analysis", "noun"] ] );

  // Lemmatizer leaves alone words that its dictionary does not contain.
  assert_equal_lemmas( lem.lemmas('MacBooks', 'noun'), [ ['MacBooks', 'noun'] ] );

  // Lemmatize a word with a part of speech (pos).
  assert_equal_lemmas( lem.lemmas('desks', 'noun'), [ ['desk', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('hired', 'verb'), [ ['hire', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('worried', 'verb'), [ ['worry', 'verb'] ]);
  assert_equal_lemmas( lem.lemmas('partying', 'verb'), [ ['party', 'verb'] ]);
  assert_equal_lemmas( lem.lemmas('better', 'adj'),  [ ['good', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('hotter', 'adj'),  [ ['hot', 'adj'] ]  );
  assert_equal_lemmas( lem.lemmas('best', 'adv'),  [ ['well', 'adv'] ] );
  assert_equal_lemmas( lem.lemmas('best', 'adj'),  [ ['good', 'adj'] ] );
  
  // Lemmatizer give a result even when no pos is given, by assuming it to be :verb, :noun, :adv, or :adj.
  assert_equal_lemmas( lem.lemmas('plays'), [ ['play', 'verb'], ['play', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('oxen'), [ ['ox', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('fired'), [ ['fire', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('slower'), [ ['slow', 'adv'], ['slow', 'adj'] ] );

  // non-existing word
  assert_equal_lemmas( lem.lemmas('asdfassda'), [ ['asdfassda', ''] ] );

  // various test with pos
  assert_equal_lemmas( lem.lemmas('goes', 'verb'), [ ['go', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('went', 'verb'), [ ['go', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('gone', 'verb'), [ ['go', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('writes', 'verb'), [ ['write', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('wrote', 'verb'), [ ['write', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('written', 'verb'), [ ['write', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('confirms', 'verb'), [ ['confirm', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('confirmed', 'verb'), [ ['confirm', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('confirming', 'verb'), [ ['confirm', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('acidless', 'noun'), [ ['acidless', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('pizzas', 'noun'), [ ['pizza', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('foxes', 'noun'), [ ['fox', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('hacked', 'verb'), [ ['hack', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('coded', 'verb'), [ ['cod', 'verb'], ['code', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('fitting', 'verb'), [ ['fit', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('coding', 'verb'), [ ['cod', 'verb'], ['code', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('pirouetting', 'verb'), [ ['pirouette', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('hacking', 'verb'), [ ['hack', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('earliest', 'adj'), [ ['early', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('biggest', 'adj'), [ ['big', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('largest', 'adj'), [ ['large', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('smallest', 'adj'), [ ['small', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('earlier', 'adj'), [ ['early', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('bigger', 'adj'), [ ['big', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('larger', 'adj'), [ ['large', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('smaller', 'adj'), [ ['small', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('recognizable', 'adj'), [ ['recognizable', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('networkable', 'adj'), [ ['networkable', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('resettability', 'noun'), [ ['resettability', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('repairability', 'noun'), [ ['repairability', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('reorganizability', 'noun'), [ ['reorganizability', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('starts', 'verb'), [ ['start', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('teaches', 'verb'), [ ['teach', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('talked', 'verb'), [ ['talk', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('saved', 'verb'), [ ['save', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('sitting', 'verb'), [ ['sit', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('having', 'verb'), [ ['have', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('talking', 'verb'), [ ['talk', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('heavier', 'adj'), [ ['heavy', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('bigger', 'adj'), [ ['big', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('huger', 'adj'), [ ['huge', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('lower', 'adj'), [ ['low', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('writable', 'adj'), [ ['writable', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('readable', 'adj'), [ ['readable', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('readability', 'noun'), [ ['readability', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('writability', 'noun'), [ ['writability', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('scoreless', 'noun'), [ ['scoreless', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('dogs', 'noun'), [ ['dog', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('dishes', 'noun'), [ ['dish', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('heaviest', 'adj'), [ ['heavy', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('biggest', 'adj'), [ ['big', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('hugest', 'adj'), [ ['huge', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('lowest', 'adj'), [ ['low', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('heavier', 'adj'), [ ['heavy', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('bigger', 'adj'), [ ['big', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('lower', 'adj'), [ ['low', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('higher', 'adj'), [ ['high', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('leaves', 'noun'), [ ['leave', 'noun'], ['leaf', 'noun'] ] );

  // various test without pos
  assert_equal_lemmas( lem.lemmas('goes'), [ ['go', 'verb'], ['go', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('went'), [ ['go', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('gone'), [ ['go', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('writes'), [ ['write', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('wrote'), [ ['write', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('written'), [ ['write', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('confirms'), [ ['confirm', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('confirmed'), [ ['confirm', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('confirming'), [ ['confirm', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('acidless'), [ ['acidless', ''] ] );
  assert_equal_lemmas( lem.lemmas('pizzas'), [ ['pizza', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('foxes'), [ ['fox', 'verb'], ['fox', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('hacked'), [ ['hack', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('coded'), [ ['cod', 'verb'], ['code', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('fitting'), [ ['fit', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('coding'), [ ['cod', 'verb'], ['code', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('pirouetting'), [ ['pirouette', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('hacking'), [ ['hack', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('earliest'), [ ['early', 'adv'], ['early', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('biggest'), [ ['big', 'adv'], ['big', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('largest'), [ ['large', 'adv'], ['large', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('smallest'), [ ['small', 'adv'], ['small', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('earlier'), [ ['early', 'adv'], ['early', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('bigger'), [ ['big', 'adv'], ['big', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('larger'), [ ['large', 'adv'], ['large', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('smaller'), [ ['small', 'adv'], ['small', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('recognizable'), [ ['recognizable', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('networkable'), [ ['networkable', ''] ] );
  assert_equal_lemmas( lem.lemmas('resettability'), [ ['resettability', ''] ] );
  assert_equal_lemmas( lem.lemmas('repairability'), [ ['repairability', ''] ] );
  assert_equal_lemmas( lem.lemmas('reorganizability'), [ ['reorganizability', ''] ] );
  assert_equal_lemmas( lem.lemmas('starts'), [ ['start', 'verb'], ['start', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('teaches'), [ ['teach', 'verb'], ['teach', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('talked'), [ ['talk', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('saved'), [ ['save', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('sitting'), [ ['sit', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('having'), [ ['have', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('talking'), [ ['talk', 'verb'] ] );
  assert_equal_lemmas( lem.lemmas('heavier'), [ ['heavy', 'adv'], ['heavy', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('bigger'), [ ['big', 'adv'], ['big', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('huger'), [ ['huge', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('lower'), [ ['low', 'adv'], ['low', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('writable'), [ ['writable', ''] ] );
  assert_equal_lemmas( lem.lemmas('readable'), [ ['readable', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('readability'), [ ['readability', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('writability'), [ ['writability', ''] ] );
  assert_equal_lemmas( lem.lemmas('scoreless'), [ ['scoreless', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('dogs'), [ ['dog', 'verb'], ['dog', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('dishes'), [ ['dish', 'verb'], ['dish', 'noun'] ] );
  assert_equal_lemmas( lem.lemmas('heaviest'), [ ['heavy', 'adv'], ['heavy', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('biggest'), [ ['big', 'adv'], ['big', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('hugest'), [ ['huge', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('lowest'), [ ['low', 'adv'], ['low', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('heavier'), [ ['heavy', 'adv'], ['heavy', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('bigger'), [ ['big', 'adv'], ['big', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('lower'), [ ['low', 'adv'], ['low', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('higher'), [ ['high', 'adv'], ['high', 'adj'] ] );
  assert_equal_lemmas( lem.lemmas('leaves'), [ ['leave', 'verb'], ['leave', 'noun'], ['leaf', 'noun'] ] );


  // only_lemmas tests
  assert_equal_only_lemmas( lem.only_lemmas('analyses', 'noun'), [ 'analysis' ] );

  // Lemmatizer leaves alone words that its dictionary does not contain.
  assert_equal_only_lemmas( lem.only_lemmas('MacBooks', 'noun'), [ 'MacBooks' ] );

  // Lemmatize a word with a part of speech (pos).
  assert_equal_only_lemmas( lem.only_lemmas('desks', 'noun'), [ 'desk' ] );
  assert_equal_only_lemmas( lem.only_lemmas('hired', 'verb'), [ 'hire' ] );
  assert_equal_only_lemmas( lem.only_lemmas('worried', 'verb'), [ 'worry' ]);
  assert_equal_only_lemmas( lem.only_lemmas('partying', 'verb'), [ 'party' ]);
  assert_equal_only_lemmas( lem.only_lemmas('better', 'adj'), ['good'] );
  assert_equal_only_lemmas( lem.only_lemmas('hotter', 'adj'), ['hot']  );
  assert_equal_only_lemmas( lem.only_lemmas('best', 'adv'), [ 'well'] );
  assert_equal_only_lemmas( lem.only_lemmas('best', 'adj'), [ 'good'] );
  
  // Lemmatizer give a result even when no pos is given, by assuming it to be :verb, :noun, :adv, or :adj.
  assert_equal_only_lemmas( lem.only_lemmas('plays'), [ 'play' ] );
  assert_equal_only_lemmas( lem.only_lemmas('oxen'), [ 'ox' ] );
  assert_equal_only_lemmas( lem.only_lemmas('fired'), [ 'fire' ] );
  assert_equal_only_lemmas( lem.only_lemmas('slower'), [ 'slow' ] );

  // non-existing word
  assert_equal_only_lemmas( lem.only_lemmas('asdfassda'), [ 'asdfassda' ] );

  // various test with pos
  assert_equal_only_lemmas( lem.only_lemmas('goes', 'verb'), [ 'go' ] );
  assert_equal_only_lemmas( lem.only_lemmas('went', 'verb'), [ 'go' ] );
  assert_equal_only_lemmas( lem.only_lemmas('gone', 'verb'), [ 'go' ] );
  assert_equal_only_lemmas( lem.only_lemmas('writes', 'verb'), [ 'write' ] );
  assert_equal_only_lemmas( lem.only_lemmas('wrote', 'verb'), [ 'write' ] );
  assert_equal_only_lemmas( lem.only_lemmas('written', 'verb'), [ 'write' ] );
  assert_equal_only_lemmas( lem.only_lemmas('confirms', 'verb'), [ 'confirm' ] );
  assert_equal_only_lemmas( lem.only_lemmas('confirmed', 'verb'), [ 'confirm' ] );
  assert_equal_only_lemmas( lem.only_lemmas('confirming', 'verb'), [ 'confirm' ] );
  assert_equal_only_lemmas( lem.only_lemmas('acidless', 'noun'), [ 'acidless' ] );
  assert_equal_only_lemmas( lem.only_lemmas('pizzas', 'noun'), [ 'pizza' ] );
  assert_equal_only_lemmas( lem.only_lemmas('foxes', 'noun'), [ 'fox' ] );
  assert_equal_only_lemmas( lem.only_lemmas('hacked', 'verb'), [ 'hack' ] );
  assert_equal_only_lemmas( lem.only_lemmas('coded', 'verb'), [ 'cod', 'code' ] );
  assert_equal_only_lemmas( lem.only_lemmas('fitting', 'verb'), [ 'fit' ] );
  assert_equal_only_lemmas( lem.only_lemmas('coding', 'verb'), [ 'cod', 'code' ] );
  assert_equal_only_lemmas( lem.only_lemmas('pirouetting', 'verb'), [ 'pirouette' ] );
  assert_equal_only_lemmas( lem.only_lemmas('hacking', 'verb'), [ 'hack' ] );
  assert_equal_only_lemmas( lem.only_lemmas('earliest', 'adj'), [ 'early' ] );
  assert_equal_only_lemmas( lem.only_lemmas('biggest', 'adj'), [ 'big' ] );
  assert_equal_only_lemmas( lem.only_lemmas('largest', 'adj'), [ 'large' ] );
  assert_equal_only_lemmas( lem.only_lemmas('smallest', 'adj'), [ 'small' ] );
  assert_equal_only_lemmas( lem.only_lemmas('earlier', 'adj'), [ 'early' ] );
  assert_equal_only_lemmas( lem.only_lemmas('bigger', 'adj'), [ 'big' ] );
  assert_equal_only_lemmas( lem.only_lemmas('larger', 'adj'), [ 'large' ] );
  assert_equal_only_lemmas( lem.only_lemmas('smaller', 'adj'), [ 'small' ] );
  assert_equal_only_lemmas( lem.only_lemmas('recognizable', 'adj'), [ 'recognizable' ] );
  assert_equal_only_lemmas( lem.only_lemmas('networkable', 'adj'), [ 'networkable' ] );
  assert_equal_only_lemmas( lem.only_lemmas('resettability', 'noun'), [ 'resettability' ] );
  assert_equal_only_lemmas( lem.only_lemmas('repairability', 'noun'), [ 'repairability' ] );
  assert_equal_only_lemmas( lem.only_lemmas('reorganizability', 'noun'), [ 'reorganizability' ] );
  assert_equal_only_lemmas( lem.only_lemmas('starts', 'verb'), [ 'start' ] );
  assert_equal_only_lemmas( lem.only_lemmas('teaches', 'verb'), [ 'teach' ] );
  assert_equal_only_lemmas( lem.only_lemmas('talked', 'verb'), [ 'talk' ] );
  assert_equal_only_lemmas( lem.only_lemmas('saved', 'verb'), [ 'save' ] );
  assert_equal_only_lemmas( lem.only_lemmas('sitting', 'verb'), [ 'sit' ] );
  assert_equal_only_lemmas( lem.only_lemmas('having', 'verb'), [ 'have' ] );
  assert_equal_only_lemmas( lem.only_lemmas('talking', 'verb'), [ 'talk' ] );
  assert_equal_only_lemmas( lem.only_lemmas('heavier', 'adj'), [ 'heavy' ] );
  assert_equal_only_lemmas( lem.only_lemmas('bigger', 'adj'), [ 'big' ] );
  assert_equal_only_lemmas( lem.only_lemmas('huger', 'adj'), [ 'huge' ] );
  assert_equal_only_lemmas( lem.only_lemmas('lower', 'adj'), [ 'low' ] );
  assert_equal_only_lemmas( lem.only_lemmas('writable', 'adj'), [ 'writable' ] );
  assert_equal_only_lemmas( lem.only_lemmas('readable', 'adj'), [ 'readable' ] );
  assert_equal_only_lemmas( lem.only_lemmas('readability', 'noun'), [ 'readability' ] );
  assert_equal_only_lemmas( lem.only_lemmas('writability', 'noun'), [ 'writability' ] );
  assert_equal_only_lemmas( lem.only_lemmas('scoreless', 'noun'), [ 'scoreless' ] );
  assert_equal_only_lemmas( lem.only_lemmas('dogs', 'noun'), [ 'dog' ] );
  assert_equal_only_lemmas( lem.only_lemmas('dishes', 'noun'), [ 'dish' ] );
  assert_equal_only_lemmas( lem.only_lemmas('heaviest', 'adj'), [ 'heavy' ] );
  assert_equal_only_lemmas( lem.only_lemmas('biggest', 'adj'), [ 'big' ] );
  assert_equal_only_lemmas( lem.only_lemmas('hugest', 'adj'), [ 'huge' ] );
  assert_equal_only_lemmas( lem.only_lemmas('lowest', 'adj'), [ 'low' ] );
  assert_equal_only_lemmas( lem.only_lemmas('heavier', 'adj'), [ 'heavy' ] );
  assert_equal_only_lemmas( lem.only_lemmas('bigger', 'adj'), [ 'big' ] );
  assert_equal_only_lemmas( lem.only_lemmas('lower', 'adj'), [ 'low' ] );
  assert_equal_only_lemmas( lem.only_lemmas('higher', 'adj'), [ 'high' ] );
  assert_equal_only_lemmas( lem.only_lemmas('leaves', 'noun'), [ 'leave', 'leaf' ] );

  // various test without pos
  assert_equal_only_lemmas( lem.only_lemmas('goes'), [ 'go' ] );
  assert_equal_only_lemmas( lem.only_lemmas('went'), [ 'go' ] );
  assert_equal_only_lemmas( lem.only_lemmas('gone'), [ 'go' ] );
  assert_equal_only_lemmas( lem.only_lemmas('writes'), [ 'write' ] );
  assert_equal_only_lemmas( lem.only_lemmas('wrote'), [ 'write' ] );
  assert_equal_only_lemmas( lem.only_lemmas('written'), [ 'write' ] );
  assert_equal_only_lemmas( lem.only_lemmas('confirms'), [ 'confirm' ] );
  assert_equal_only_lemmas( lem.only_lemmas('confirmed'), [ 'confirm' ] );
  assert_equal_only_lemmas( lem.only_lemmas('confirming'), [ 'confirm' ] );
  assert_equal_only_lemmas( lem.only_lemmas('acidless'), [ 'acidless' ] );
  assert_equal_only_lemmas( lem.only_lemmas('pizzas'), [ 'pizza' ] );
  assert_equal_only_lemmas( lem.only_lemmas('foxes'), [ 'fox' ] );
  assert_equal_only_lemmas( lem.only_lemmas('hacked'), [ 'hack' ] );
  assert_equal_only_lemmas( lem.only_lemmas('coded'), [ 'cod', 'code' ] );
  assert_equal_only_lemmas( lem.only_lemmas('fitting'), [ 'fit' ] );
  assert_equal_only_lemmas( lem.only_lemmas('coding'), [ 'cod', 'code' ] );
  assert_equal_only_lemmas( lem.only_lemmas('pirouetting'), [ 'pirouette' ] );
  assert_equal_only_lemmas( lem.only_lemmas('hacking'), [ 'hack' ] );
  assert_equal_only_lemmas( lem.only_lemmas('earliest'), [ 'early' ] );
  assert_equal_only_lemmas( lem.only_lemmas('biggest'), [ 'big' ] );
  assert_equal_only_lemmas( lem.only_lemmas('largest'), [ 'large' ] );
  assert_equal_only_lemmas( lem.only_lemmas('smallest'), [ 'small' ] );
  assert_equal_only_lemmas( lem.only_lemmas('earlier'), [ 'early' ] );
  assert_equal_only_lemmas( lem.only_lemmas('bigger'), [ 'big' ] );
  assert_equal_only_lemmas( lem.only_lemmas('larger'), [ 'large' ] );
  assert_equal_only_lemmas( lem.only_lemmas('smaller'), [ 'small' ] );
  assert_equal_only_lemmas( lem.only_lemmas('recognizable'), [ 'recognizable' ] );
  assert_equal_only_lemmas( lem.only_lemmas('networkable'), [ 'networkable' ] );
  assert_equal_only_lemmas( lem.only_lemmas('resettability'), [ 'resettability' ] );
  assert_equal_only_lemmas( lem.only_lemmas('repairability'), [ 'repairability' ] );
  assert_equal_only_lemmas( lem.only_lemmas('reorganizability'), [ 'reorganizability' ] );
  assert_equal_only_lemmas( lem.only_lemmas('starts'), [ 'start' ] );
  assert_equal_only_lemmas( lem.only_lemmas('teaches'), [ 'teach' ] );
  assert_equal_only_lemmas( lem.only_lemmas('talked'), [ 'talk' ] );
  assert_equal_only_lemmas( lem.only_lemmas('saved'), [ 'save' ] );
  assert_equal_only_lemmas( lem.only_lemmas('sitting'), [ 'sit' ] );
  assert_equal_only_lemmas( lem.only_lemmas('having'), [ 'have' ] );
  assert_equal_only_lemmas( lem.only_lemmas('talking'), [ 'talk' ] );
  assert_equal_only_lemmas( lem.only_lemmas('heavier'), [ 'heavy' ] );
  assert_equal_only_lemmas( lem.only_lemmas('bigger'), [ 'big' ] );
  assert_equal_only_lemmas( lem.only_lemmas('huger'), [ 'huge' ] );
  assert_equal_only_lemmas( lem.only_lemmas('lower'), [ 'low' ] );
  assert_equal_only_lemmas( lem.only_lemmas('writable'), [ 'writable' ] );
  assert_equal_only_lemmas( lem.only_lemmas('readable'), [ 'readable' ] );
  assert_equal_only_lemmas( lem.only_lemmas('readability'), [ 'readability' ] );
  assert_equal_only_lemmas( lem.only_lemmas('writability'), [ 'writability' ] );
  assert_equal_only_lemmas( lem.only_lemmas('scoreless'), [ 'scoreless' ] );
  assert_equal_only_lemmas( lem.only_lemmas('dogs'), [ 'dog' ] );
  assert_equal_only_lemmas( lem.only_lemmas('dishes'), [ 'dish' ] );
  assert_equal_only_lemmas( lem.only_lemmas('heaviest'), [ 'heavy' ] );
  assert_equal_only_lemmas( lem.only_lemmas('biggest'), [ 'big' ] );
  assert_equal_only_lemmas( lem.only_lemmas('hugest'), [ 'huge' ] );
  assert_equal_only_lemmas( lem.only_lemmas('lowest'), [ 'low' ] );
  assert_equal_only_lemmas( lem.only_lemmas('heavier'), [ 'heavy' ] );
  assert_equal_only_lemmas( lem.only_lemmas('bigger'), [ 'big' ] );
  assert_equal_only_lemmas( lem.only_lemmas('lower'), [ 'low' ] );
  assert_equal_only_lemmas( lem.only_lemmas('higher'), [ 'high' ] );
  assert_equal_only_lemmas( lem.only_lemmas('leaves'), [ 'leave', 'leaf' ] );

});
