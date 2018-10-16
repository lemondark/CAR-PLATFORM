import $ from 'jquery';

function geoConv (points, cb) {
  var apiConv = 'http://restapi.amap.com/v3/assistant/coordinate/convert' +
    '?key=' + '09fc21a01b861edccad8027462452966' +
    '&output=JSON' +
    '&coordsys=gps' +
    '&locations=';
  for (var i = 0; i < points.length; i++) {
    apiConv += points[i].longitude + ',' + points[i].latitude;
    if (i < points.length - 1) apiConv += '|';
  }
  // console.log(apiConv);
  $.getJSON(apiConv, function (data) {
    cb(data);
  });
};

export default {
  // BD-09坐标系转换
  fixAmap: function (paths, fixLonKM, fixLatKM, cb) {
    // 1KM大约是9/1000度
    var lonFix = Number(fixLonKM) * 9 / 1000;
    var latFix = Number(fixLatKM) * 9 / 1000;

    var ptFix = null; // 当前修正点
    var ptsNeedFix = []; // 需要修正的点集合
    var ptsNeedFixGroup = []; // 百度修正服务,每次只能接受100个点

    if (paths) {
      // 计算需要多少个修正点,存放在ptsNeedFix中
      for (var i = 0; i < paths.length; i++) {
        var pt = paths[i];
        // 去除前置的东经E,北纬N;如果以后需要处理西半球或南半球的坐标,这里需要添加符号
        // pt.longitude = pt.longitude;
        // pt.latitude = pt.latitude;
        if (i === 0) { // 第一个点必修正
          ptFix = pt;
          ptsNeedFix.push({i: i, longitude: pt.longitude, latitude: pt.latitude});
          ptsNeedFixGroup.push({pts: ptsNeedFix, done: false});
        } else { // 如果和ptFix的偏移量超出lonFix或latFix,则增加一个修正点
          if (Math.abs(pt.longitude - ptFix.longitude) > lonFix || Math.abs(pt.latitude - ptFix.latitude) > latFix) {
            ptFix = pt;
            ptsNeedFix.push({i: i, longitude: pt.longitude, latitude: pt.latitude});
            // 分组,每40个分一组
            if (ptsNeedFix.length === 1) {
              ptsNeedFixGroup.push({pts: ptsNeedFix, done: false});
            } else if (ptsNeedFix.length === 40) {
              ptsNeedFix = [];
            }
          }
        }
      }
      // 发往百度服务器计算修正值
      for (var g = 0; g < ptsNeedFixGroup.length; g++) {
        (function (i) {
          geoConv(ptsNeedFixGroup[i].pts, function (data) {
            var fixGroup = ptsNeedFixGroup[i];
            var geoConvList = [];
            if (data.status === '1') {
              let array = data.locations.split(';');
              array.forEach(item => {
                let arrayItem = item.split(',');
                geoConvList.push(
                  {
                    x: arrayItem[0],
                    y: arrayItem[1]
                  }
                );
              });
            }
            if (geoConvList.length === fixGroup.pts.length) {
              for (var k = 0; k < geoConvList.length; k++) {
                fixGroup.pts[k].deltaLon = geoConvList[k].x - fixGroup.pts[k].longitude;
                fixGroup.pts[k].deltaLat = geoConvList[k].y - fixGroup.pts[k].latitude;
              }
            }
            fixGroup.done = true;

            // 全部DELTA值计算完成
            for (var j = 0; j < ptsNeedFixGroup.length; j++) {
              if (ptsNeedFixGroup[j].done === false) return;
            }

            // 拼接全部GROUP统一处理
            var m, n;
            var ptsFixAll = [];
            for (m = 0; m < ptsNeedFixGroup.length; m++) {
              for (n = 0; n < ptsNeedFixGroup[m].pts.length; n++) {
                ptsFixAll.push(ptsNeedFixGroup[m].pts[n]);
              }
            }

            var fixedCurrent = null;
            var fixedNext = null;
            var idxFixedNext = 1;
            if (ptsFixAll.length > 0) fixedCurrent = ptsFixAll[0];
            if (ptsFixAll.length > idxFixedNext) fixedNext = ptsFixAll[idxFixedNext];
            // console.log('共计修正点数:' + ptsFixAll.length);

            if (fixedCurrent) { // 至少有一个修正点
              for (m = 0; m < paths.length; m++) {
                var pt = paths[m];
                // console.log(pt.longitude + ":" + pt.latitude);
                if (fixedNext === null || m < fixedNext.i || (m === fixedNext.i)) {
                  // 使用fixedCurrent进行修正
                  pt.longitude = Number(pt.longitude) + fixedCurrent.deltaLon;
                  pt.latitude = Number(pt.latitude) + fixedCurrent.deltaLat;
                } else {
                  // 使用下一个修正点
                  fixedCurrent = fixedNext;
                  pt.longitude = Number(pt.longitude) + fixedCurrent.deltaLon;
                  pt.latitude = Number(pt.latitude) + fixedCurrent.deltaLat;
                  // 修正点后移一个
                  idxFixedNext++;
                  // console.log("fix point next" + JSON.stringify(fixedCurrent));
                  if (idxFixedNext < ptsFixAll.length) {
                    fixedNext = ptsFixAll[idxFixedNext];
                  } else {
                    fixedNext = null; // 已到最后一个修正点
                  }
                  // console.log(pt.longitude + ":" + pt.latitude + "->" + fixedCurrent.deltaLon + ":" + fixedCurrent.deltaLat);
                }
              }
            }
            // 发起回调
            if (typeof cb === 'function') cb(paths);
          });
        })(g);
      }
    }
  }
};
