export function modeArray(array: any[], field: string) {
  if (array.length == 0) return null;
  var modeMap: any = {};
  var maxEl = array[0][field],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i][field];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

export function getSessionOfDay() {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr <= 12 && curHr > 3) {
    return 'morning';
  } else if (curHr <= 15 && curHr > 12) {
    return 'afternoon';
  } else {
    return 'evening';
  }
}
