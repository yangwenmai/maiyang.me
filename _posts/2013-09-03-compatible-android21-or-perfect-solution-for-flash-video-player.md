---
layout: post
title: '兼容android2.1以上flash视频播放的完美解决方案'
date: 2013-09-03 07:45
comments: true
categories: 
---
通过androi官方文档，android是在2.1以后的版本开始支持flash视频播放的。
参见官方说明。

既然官方都不支持了，那我们再研究flash播放器就显得毫无必要，所以我们的解决方案主要是靠android提供的WebView，可浏览网页的内置组件来播放flash。

adobe官方关于[OBJECT tag syntax说明](http://helpx.adobe.com/flash/kb/object-tag-syntax-flash-professional.html)
上面有详细的说明，我这里就不详细解释了，如果有不明白的，欢迎联系。

了解清楚解决方案中的核心用法之后继续下一步就水到渠成了。

主要分为以下几个步骤：

<!--more-->

1. 创建android项目
2. 创建一个用于播放flash的activity
```
package com.ftxgame.ftxplatform.activity;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ActivityManager;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebSettings.PluginState;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import com.ftxgame.ftxplatform.R;
import com.umeng.analytics.MobclickAgent;

@SuppressLint("NewApi")
public class FTXVideoActivity extends Activity {
	
	private FrameLayout mFullscreenLayout;
	private FrameLayout mContentLayout;
	
	private String mUrl;
	private View mCustomView = null;
	private WebView mWebView;
	private Intent intent;
	private boolean hasAdobePlayer = false;// ADOBE FLASH PLAYER插件安装状态
	private Context mContext;
	private ProgressDialog mProgressDialog;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// 隐藏标题栏
		this.requestWindowFeature(Window.FEATURE_NO_TITLE);
		// 隐藏状态栏
		this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN);

		initView();
		initWebView();
		
		DisplayMetrics dm = this.getResources().getDisplayMetrics();
		int widthScreen = dm.widthPixels/2;
		int heightScreen = dm.heightPixels/2;

		if (onCheck() == true) {
			StringBuilder html = new StringBuilder(1000);
			html.append("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />")
			.append("<style type='text/css'>")
			.append("html,body{margin:0px;padding:0px;}")
			.append("*{margin:0px;padding:0px;}</style>")
			.append("</head><body>")
			
			.append("<object width=\""+widthScreen+"\" height=\""+heightScreen+"\" type=\"application/x-shockwave-flash\" name=\"qzshareFlash\" id=\"qzshareFlash\" data=\""+mUrl+"\" class=\"video_play\">")
			.append("<param name=\"movie\" value=\""+mUrl+"\">")
			.append("<param value=\"always\" name=\"allowScriptAccess\">")
			.append("<param value=\"all\" name=\"allowNetworking\">")
			.append("<param value=\"true\" name=\"allowFullScreen\">")
			.append("<param value=\"opaque\" name=\"wmode\">")
			.append("</object></body></html>");
			showProgress();
			mWebView.loadData(html.toString(), "text/html", "UTF-8");
		} else {
			new AlertDialog.Builder(this)
					.setIcon(R.drawable.ic_launcher)
					.setTitle("温馨提醒：")
					.setMessage("Flash Player未安装或版本过低，请下载安装新版本后重试~")
					.setPositiveButton("重试",
							new DialogInterface.OnClickListener() {

								@Override
								public void onClick(DialogInterface dialog,
										int which) {
									intent.setClass(FTXVideoActivity.this,
											FTXVideoActivity.class);
									startActivity(intent);
								}
							})
					.setNegativeButton("退出",
							new DialogInterface.OnClickListener() {

								@Override
								public void onClick(DialogInterface dialog,
										int which) {
									ActivityManager am = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
									am.restartPackage(getPackageName());
									intent.setClass(FTXVideoActivity.this,
											FTXVideoActivity.class);
									Intent i = new Intent(Intent.ACTION_MAIN);
									i.addCategory(Intent.CATEGORY_HOME);
									intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
									startActivity(intent);
									startActivity(i);
								}
							}).show();
		}
	}
	
	private void initView() {
		setContentView(R.layout.videoview);
		mContext = FTXVideoActivity.this;
		mFullscreenLayout = (FrameLayout) findViewById(R.id.fullscreen_custom_content);
		mContentLayout = (FrameLayout) findViewById(R.id.main_content);
		mWebView = (WebView) findViewById(R.id.video_view);

		if (getPhoneAndroidSDK() >= 14) {// 4.0需打开硬件加速
			getWindow().setFlags(0x1000000, 0x1000000);
		}
		
		intent = getIntent();
		mUrl = intent.getStringExtra("videoUrl");
	}
	
	/**
	 * WebView相关设置
	 */
	private void initWebView() {
		WebSettings settings = mWebView.getSettings();
		settings.setJavaScriptEnabled(true);
		settings.setJavaScriptCanOpenWindowsAutomatically(true);
		settings.setPluginState(PluginState.ON);
		settings.setPluginsEnabled(true);
		settings.setAllowFileAccess(true);
		settings.setLoadWithOverviewMode(true);

		mWebView.setWebChromeClient(new MyWebChromeClient());
		mWebView.setWebViewClient(new MyWebViewClient());
	}

	public static int getPhoneAndroidSDK() {
		int version = 0;
		try {
			version = Integer.valueOf(android.os.Build.VERSION.SDK);
		} catch (NumberFormatException e) {
			e.printStackTrace();
		}
		return version;
	}

	/**
	 * 判断是否安装ADOBE FLASH PLAYER插件
	 * 
	 * @return
	 */
	public boolean onCheck() {
		// 判断是否安装ADOBE FLASH PLAYER插件
		PackageManager pm = getPackageManager();
		List<PackageInfo> lsPackageInfo = pm.getInstalledPackages(0);

		for (PackageInfo pi : lsPackageInfo) {
			if (pi.packageName.contains("com.adobe.flashplayer")) {
				hasAdobePlayer = true;
				break;
			}
		}
		// 如果插件安装一切正常
		if (hasAdobePlayer == true) {
			return true;
		} else {
			return false;
		}
	}
	
	private void showProgress() {
		if(mProgressDialog == null){
			mProgressDialog = ProgressDialog.show(mContext, null, mContext.getString(R.string.loading));
		}else if(!mProgressDialog.isShowing()){
			mProgressDialog.show();
		}
	}
	
	private void hideProgress() {
			if (mProgressDialog != null && mProgressDialog.isShowing()) {
				mProgressDialog.dismiss();
			}
	}

	private void callHiddenWebViewMethod(String name) {
		if (mWebView != null) {
			try {
				Method method = WebView.class.getMethod(name);
				method.invoke(mWebView);
			} catch (NoSuchMethodException e) {
				Log.i("No such method: " + name, e.toString());
			} catch (IllegalAccessException e) {
				Log.i("Illegal Access: " + name, e.toString());
			} catch (InvocationTargetException e) {
				Log.d("Invocation Target Exception: " + name, e.toString());
			}
		}
	}
	
	class MyWebChromeClient extends WebChromeClient {
		
		private CustomViewCallback mCustomViewCallback;
		private int mOriginalOrientation = 1;
		
		@Override
		public void onShowCustomView(View view, CustomViewCallback callback) {
			Log.i("FTXVideoActivity", "onShowCustomView");
			onShowCustomView(view, mOriginalOrientation, callback);
			super.onShowCustomView(view, callback);
		}
	
		public void onShowCustomView(View view, int requestedOrientation,
				WebChromeClient.CustomViewCallback callback) {
			if (mCustomView != null) {
				callback.onCustomViewHidden();
				return;
			}
			Log.i("FTXVideoActivity", mOriginalOrientation+"");
			if (getPhoneAndroidSDK() >= 14) {
				mFullscreenLayout.addView(view);
				mCustomView = view;
				mCustomViewCallback = callback;
				mOriginalOrientation = getRequestedOrientation();
				mContentLayout.setVisibility(View.INVISIBLE);
				mFullscreenLayout.setVisibility(View.VISIBLE);
				mFullscreenLayout.bringToFront();
	
				setRequestedOrientation(mOriginalOrientation);
			}
			Log.i("FTXVideoActivity", mOriginalOrientation+"");
		}
	
		public void onHideCustomView() {
			Log.i("FTXVideoActivity", "onHideCustomView");
			mContentLayout.setVisibility(View.VISIBLE);
			if (mCustomView == null) {
				return;
			}
			mCustomView.setVisibility(View.GONE);
			mFullscreenLayout.removeView(mCustomView);
			mCustomView = null;
			mFullscreenLayout.setVisibility(View.GONE);
			try {
				mCustomViewCallback.onCustomViewHidden();
			} catch (Exception e) {
				Log.e("FTXVideoActivity", e.getMessage());
			}
			// Show the content view.
			setRequestedOrientation(mOriginalOrientation);
		}
		
		@Override
		public void onProgressChanged(WebView view, int newProgress) {
			super.onProgressChanged(view, newProgress);
			if(100 == newProgress) {				
				hideProgress();
			}
		}
	
	}
	
	class MyWebViewClient extends WebViewClient {
	
		@Override
		public boolean shouldOverrideUrlLoading(WebView view, String url) {
			view.loadUrl(url);
			Log.i("FTXVideoActivity", "shouldOverrideUrlLoading");
			return super.shouldOverrideUrlLoading(view, url);
		}
		
		@Override
		public void onPageFinished(WebView view, String url) {
			super.onPageFinished(view, url);
			hideProgress();
			Log.i("FTXVideoActivity", "onPageFinished");
		}
	}
}
```
3. 创建layout.xml
```
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <FrameLayout  
       android:id="@+id/fullscreen_custom_content"  
       android:layout_width="match_parent"  
       android:layout_height="match_parent"  
       android:visibility="gone" />
    
    <FrameLayout
       android:id="@+id/main_content"  
       android:layout_width="match_parent"  
       android:layout_height="match_parent">  
	    <WebView
	        android:id="@+id/video_view"
	        android:layout_width="fill_parent"
	        android:layout_height="fill_parent" />
    </FrameLayout>
</FrameLayout>

```
一个兼容android2.1以上系统的flash播放解决方案就完成了。

后面经过我的*全面兼容性测试*，可能会有以下问题：
1. android系统自身已经安装adobe flash player 11或之前版本，在android4.1之前的老系统上可能是正常的，但是在新系统上会存在问题，或许还包括4.0系统，因为资源问题，我就无法测试到位，希望有朋友能给我测试的反馈。
2. android4.0以上系统全屏支持不够好，android2.3.5基本上可以说是完美播放。
3. android2.2系统是不支持flash11.1的，所以我们在提示播放的时候要安装对应的版本。


