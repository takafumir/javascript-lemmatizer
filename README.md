JavaScript Lemmatizer
====

JavaScript Lemmatizer is a lemmatization library for JavaScript to retrieve a base form from an inflected form word in English. 

Inspired by [Ruby Lemmatizer](https://github.com/yohasebe/lemmatizer) but the returning values and the algorithm are different from it.

## Requirements

JavaScript Lemmatizer depends on the following libraries.

[jQuery](http://jquery.com/)  
[Underscore.js](http://underscorejs.org/)

## Install
1. Download and unzip JavaScript Lemmatizer.

2. Load jQuery, Underscore.js and JavaScript Lemmatizer in your HTML like the following code, or you can load jQuery and Underscore.js the way you like.
```html
<script src="javascript-lemmatizer/vendor/js/jquery.js"></script>
<script src="javascript-lemmatizer/vendor/js/underscore.js"></script>
<script src="javascript-lemmatizer/js/lemmatizer.js"></script>
```

3. Use JavaScript Lemmatizer in your HTML according to the Usage. See also. [lemmatizer_sample.html](https://github.com/takafumir/javascript-lemmatizer/blob/master/html/lemmatizer_sample.html)

## Usage

You can use `Lemmatizer#lemmas` or `Lemmatizer#only_lemmas` methods like the follwoing sample code.

```javascript
// initialize Lemmatizer.
var lemmatizer = new Lemmatizer();

// retrieve a lemma with a part of speech.
lemmatizer.lemmas('desks',  'noun');   // => [ ['desk', 'noun'] ]
lemmatizer.lemmas('talked', 'verb');   // => [ ['talk', 'verb'] ]
lemmatizer.lemmas('better', 'adj');    // => [ ['good', 'adj'] ]

// of course, available for irregular iflected form words.
lemmatizer.lemmas('went', 'verb');     // => [ ['go', 'verb'] ]
lemmatizer.lemmas('written', 'verb');  // => [ ['write', 'verb'] ]

// when multiple base forms are found, return all of them.
lemmatizer.lemmas('coded', 'verb');    // => [ ['cod', 'verb'], ['code', 'verb'] ]
lemmatizer.lemmas('leaves', 'noun');   // => [ ['leave', 'noun'], ['leaf', 'noun'] ]

// retrieve a lemma without a part of speech.
lemmatizer.lemmas('sitting');  // => [ ['sit', 'verb'] ]
lemmatizer.lemmas('oxen');     // => [ ['ox', 'noun'] ]
lemmatizer.lemmas('leaves');   // => [ ['leave', 'verb'], ['leave', 'noun'], ['leaf', 'noun'] ]

// retrieve only lemmas not including part of speeches in the returning value.
lemmatizer.only_lemmas('desks', 'noun');  // => [ 'desk' ]
lemmatizer.only_lemmas('coded', 'verb');  // => [ 'cod', 'code' ]
lemmatizer.only_lemmas('priorities');     // => [ 'priority' ]
lemmatizer.only_lemmas('leaves');         // => [ 'leave', 'leaf' ]
```

See also. [lemmatizer_sample.html](https://github.com/takafumir/javascript-lemmatizer/blob/master/html/lemmatizer_sample.html)

## Limitations
```javascript
// Lemmatizer leaves alone words that its dictionary does not contain.
// This keeps proper names such as "James" intact.
lemmatizer.lemmas('MacBooks', 'noun');  // => [ ['MacBooks', 'noun'] ]
```

## Contribution

1. Fork it ( https://github.com/takafumir/javascript-lemmatizer/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## Licence

[MIT License](https://github.com/takafumir/javascript-lemmatizer/blob/master/LICENCE.txt)

## Author

[Takafumi Yamano](https://github.com/takafumir)
