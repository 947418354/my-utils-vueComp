/**
 * dataUrl转blob对象
 * @param {带前缀的dataUrl} dataurl 
 */
export const dataUrlToBlob = function(dataurl) { 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * 将blob转换为file
 * @param {blob对象} theBlob 
 * @param {文件名} fileName 
 */
export const blobToFile = function(theBlob, fileName){
 theBlob.lastModifiedDate = new Date();
 theBlob.name = fileName;
 return theBlob;
}

/**
 * dataUrl转文件
 * 返回文件 不属于 File实例 而是Blob
 * @param {*} dataurl 
 * @param {*} filename 
 */
export function dataUrlToFile(dataurl, filename) {
  return blobToFile(dataUrlToBlob(dataurl), filename)
}
