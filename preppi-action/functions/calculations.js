module.exports.mostMissed = function (array) {
  if(array.length == 0)
      return null;
  var modeMap = {};
  var maxEl = array[0], maxCount = 1;
  for(var i = 0; i < array.length; i++)
  {
      var el = array[i];
      if(modeMap[el] == null)
          modeMap[el] = 1;
      else
          modeMap[el]++;
      if(modeMap[el] > maxCount)
      {
          maxEl = el;
          maxCount = modeMap[el];
      }
  }
  return maxEl;
}

module.exports.wordCount = function (array) {
  return array.length;
}

module.exports.percentage = function (array, speech) {
  var hits = array.length;
  var total = speech.split(' ').length;
  return (( (total - hits) / total ) * 100)
}
