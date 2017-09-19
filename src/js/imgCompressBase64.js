//img转base64，blob
// 传入file
/*
  Class UpFileImg({
		    file:file,
		    compressSize:700,     //默认640
		    success:function(base64){
		        // 回调
		        console.log(base64);
		    }
		});
*/
let o = {
  file:{},
  compressSize:750,
  datatype:'base64',
  success:function(val){}
};

export default function(options = o){
  let that = this;
  // 读取文件
  let reader = new window.FileReader();
  let fileSize = Math.round(options.file.size/1024/1024);
  reader.readAsDataURL(options.file);
  reader.onload = function(e){
    that.compress(this.result,fileSize);
  };

  // 压缩文件
  this.compress = (res, fileSize)=>{
    let img = new Image();
    let maxW = options.compressSize; //压缩后大小
    img.src = res;
    img.onload = ()=>{
      let cvs = document.createElement('canvas'), ctx = cvs.getContext('2d');

      if(img.width > maxW) {
        img.height *= maxW / img.width;
        img.width = maxW;
      }

      cvs.width = img.width;
      cvs.height = img.height;

      ctx.clearRect(0, 0, cvs.width, cvs.height);
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // 设置压缩比
      let compressRate = this.getCompressRate(1,fileSize);

      // 压缩
      let dataUrl = cvs.toDataURL('image/jpeg', compressRate);
      if(options.datatype === 'blob'){
        let dataUrl =  this.dataURItoBlob(dataUrl);
      }
      // 成功后回调
      this.compressCallblak(options.success,dataUrl);
    };
  };

  // 压缩后回调函数
  this.compressCallblak = function(fun,val){
    fun(val);
  };

  // 计算压缩比
  this.getCompressRate = (allowMaxSize,fileSize)=>{
    let compressRate = 1;
    // 判断是否大于 4M 大于压缩0.5以此类推
    if(fileSize/allowMaxSize > 7){
      compressRate = 0.4;
    }else if(fileSize/allowMaxSize > 4){
      compressRate = 0.5;
    }else if(fileSize/allowMaxSize >3){
      compressRate = 0.6;
    } else if(fileSize/allowMaxSize >2){
      compressRate = 0.7;
    } else if(fileSize > allowMaxSize){
      compressRate = 0.8;
    } else{
      compressRate = 0.9;
    }
    return compressRate;
  };

  //base64转blob
  this.dataURItoBlob = function(base64Data){
    let byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0){
      byteString = atob(base64Data.split(',')[1]);
    }
    else{
      byteString = unescape(base64Data.split(',')[1]);
    }
    let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  }
}
