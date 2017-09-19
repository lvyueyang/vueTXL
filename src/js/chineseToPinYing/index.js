import PinYin from './pinyinobj'

// 汉字转拼音
function ConvertPinyin(l1) {
  let ll1 = l1.substring(0,1);
  let ifHZ = new RegExp("[\\u4E00-\\u9FFF]+","g");
  let ifZM = /^[A-Za-z]*$/;

  if(!ifHZ.test(ll1)){
    if(!ifZM.test((ll1))){
      return ll1
    }else{
      return ucfirst(ll1);
    }
  }
  let l2 = ll1.length;
  let I1 = "";
  let reg = new RegExp('[a-zA-Z0-9\- ]');
  for (let i = 0; i < l2; i++) {
    let val = ll1.substr(i, 1);
    let name = arraySearch(val, PinYin);
    if (reg.test(val)) {
      I1 += val;
    } else if (name !== false) {
      I1 += name;
    }
  }
  I1 = I1.replace(/ /g, '-');
  while (I1.indexOf('--') > 0) {
    I1 = I1.replace('--', '-');
  }
  return I1.substring(0,1);
}

// 在对象中搜索
function arraySearch(l1, l2) {
  for (let name in PinYin) {
    if (PinYin[name].indexOf(l1) != -1) {
      return ucfirst(name);
      break;
    }
  }
  return false;
}

// 首字母大写
function ucfirst(l1) {
  if (l1.length > 0) {
    let first = l1.substr(0, 1).toUpperCase();
    let spare = l1.substr(1, l1.length);
    return first + spare;
    // return first;
  }
}

export default ConvertPinyin;
