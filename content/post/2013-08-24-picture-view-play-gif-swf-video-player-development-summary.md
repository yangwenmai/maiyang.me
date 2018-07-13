---
layout: post
title: '图片查看、gif播放、swf视频播放的开发总结'
date: 2013-08-24 07:54:00
comments: true
categories: [android]
---
# 图片查看、gif播放、swf视频播放的开发总结 #

----------
图片是分为多种类型的，并且他们在android上是非常耗内存的，所以我们在进行图片查看的时候也要注意不同类型和不同尺寸进行不同的处理。

例如：gif处理，主要涉及到gif图片类型获取，以及gif播放处理。

----------
# 1、图片查看 #

- 根据类型分为动态图(gif)和静态图(jpg/png)

- 根据大小显示分为正常显示和Web显示


# 2、gif处理 #

##1、gif图片类型 ##

- gif图片类型处理

	代码如下：

<!--more-->

	 `public static String getPicType(String path) {
		try {
			// 从指定路径下读取一个文件
			FileInputStream inputStream = new FileInputStream(path);
			Log.d(TAG,"file path:"+Environment.getExternalStorageDirectory()
					.getAbsolutePath() + " path = "+path);
			byte[] buffer = new byte[2];
			// 文件类型代码
			String filecode = "";
			// 文件类型
			String fileType = "";
			// 通过读取出来的前两个字节来判断文件类型
			if (inputStream.read(buffer) != -1) {
				for (int i = 0; i < buffer.length; i++) {
					// 获取每个字节与0xFF进行与运算来获取高位，这个读取出来的数据不是出现负数
					// 并转换成字符串
					filecode += Integer.toString((buffer[i] & 0xFF));
				}
				// 把字符串再转换成Integer进行类型判断
				switch (Integer.parseInt(filecode)) {
				case 7790:
					fileType = "exe";
					break;
				case 7784:
					fileType = "midi";
					break;
				case 8297:
					fileType = "rar";
					break;
				case 8075:
					fileType = "zip";
					break;
				case 255216:
					fileType = "jpg";
					break;
				case 7173:
					fileType = "gif";
					break;
				case 6677:
					fileType = "bmp";
					break;
				case 13780:
					fileType = "png";
					break;
				default:
					fileType = "unknown type: " + filecode;
				}
			}
			inputStream.close();
			return fileType;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "";
	}`


- gif开源解决方案
	- GifView [https://code.google.com/p/gifview/](https://code.google.com/p/gifview/ "gifview")
	- ImageViewEx [https://github.com/frapontillo/ImageViewEx](https://github.com/frapontillo/ImageViewEx "ImageViewEx")
- ImageViewEx 是很强大的，他能不仅支持本地jpg/png/gif图片，而且是自适应的，并且他还支持远程URL方式的读取图片。

## 2、gif播放 ##

- 如果选择ImageViewEx是不涉及到播放的问题，他的ImageViewEx插件就已经帮我们处理了。但是他却并不兼容所有的android系统。
- 所以比较通用的处理方式还是采用GifView的方式，不过此种问题会有导致OOM的问题，但是目前还未发生，所以我们也采用了此种方案。

## 3、gif图片增加水印##

- 大家都知道我们要查看gif其实都是解码gif的第一帧为图片进行查看的，所以我们要标识一张gif图是gif图片，除了可以通过android的layout样式去控制之外，我们可以为gif解析第一帧图片附加水印，已达到同样的显示目的。
- 处理方法


`/**
     * 给定图片增加水印
     * @param src
     * @param watermark
     * @return
     */
    private Bitmap createBitmap(Bitmap src, Bitmap watermark) {
        Log.d(TAG, "invokde createBitmap");
        if (src == null) {
            return null;
        }
        int w = src.getWidth();
        int h = src.getHeight();
        int ww = watermark.getWidth();
        int wh = watermark.getHeight();
        // create the new blank bitmap
        Bitmap newb = Bitmap.createBitmap(w, h, Config.ARGB_8888);
        // 创建一个新的和SRC长度宽度一样的位图
        Canvas cv = new Canvas(newb);
        // draw src into
        cv.drawBitmap(src, 0, 0, null);// 在 0，0坐标开始画入src
        // draw watermark into
        Paint textPaint = new Paint(Paint.ANTI_ALIAS_FLAG
                | Paint.DEV_KERN_TEXT_FLAG);// 设置画笔
        textPaint.setTextSize(10.0f);// 字体大小
        textPaint.setTypeface(Typeface.DEFAULT_BOLD);// 采用默认的宽度
        textPaint.setColor(Color.RED);// 采用的颜色
        cv.drawBitmap(watermark, w - ww + 5, h - wh + 5, null);// 在src的右下角画入水印
        // save all clip
        cv.save(Canvas.ALL_SAVE_FLAG);// 保存
        // store
        cv.restore();// 存储
        return newb;
    }`

# 3、swf视频播放 #

- 因为swf目前只能有adobe flash player解析播放，所以如果要播放此种格式的视频，就只能依赖于它。
- WebView加载swf视频，但是android系统必须要已经安装adobe flash player插件。
详细处理办法：参见我的另外一篇文字《兼容android2.1以上flash视频播放的完美解决方案》

