---
layout: post
title: '手机应用版本比较（Java&Ruby)'
date: 2014-02-28 02:44:00
comments: true
categories: [ruby]
tags: [ruby, java, app版本比较]
---
###手机应用应用版本比较（Java）###
	
<!--more-->

	/**
	 * 版本比较
	 * @param version1
	 * @param version2
	 * @return
	 * -1: version1小于version2
	 * 1:  version1大于version2
	 * 0:  version1等于version2
	 */
	public static int versionCompare(String version1, String version2) {
		String[] arr1 = version1.split("\\."), arr2 = version2
				.split("\\.");

		int maxLen = Math.max(arr1.length, arr2.length);
		int result=0;

		for (int i = 0; i < maxLen; i++) {
			int i1=0, i2=0;
			char[] c1 = null, c2 = null;
			if (arr1.length > i) {
				if (NumberUtils.isDigits(arr1[i])) {
					i1 = NumberUtils.toInt(arr1[i]);
				} else {
					c1 = arr1[i].toCharArray();
					i1 = Integer.parseInt(c1[0]+"");
				}
			} else {
				i1 = Integer.MIN_VALUE;
			}
			if (arr2.length > i) {
				if (NumberUtils.isDigits(arr2[i])) {
					i2 = NumberUtils.toInt(arr2[i]);
				} else {
					c2 = arr2[i].toCharArray();
					i2 = Integer.parseInt(c2[0]+"");
				}
			} else {
				i2 = Integer.MIN_VALUE;
			}
			
			if (i1 > i2) {
				result = 1;
			} else if (i1 < i2) {
				result = -1;
			} else {
				if (c1 != null && c2 != null) {
					int c12lenmin = c1.length < c2.length ? c1.length : c2.length;
					for (int j = 0; j < c12lenmin; j++) {
						if (c1[j]>c2[j]) {
							result = 1;
						} else if (c1[j] < c2[j]) {
							result = -1;
						} else {
							result = 0;
						}
						if (result != 0) {
							break;
						} else {
							if (c1.length > c2.length) {
								result = 1;
							} else if (c1.length < c2.length) {
								result = -1;
							}
						}
					}
				}
				if (c1 == null && c2 !=null) {
					if (i1 > (c2[0]-48)) {
						result = 1;
					} else if (i1 < (c2[0]-48)){
						result = -1;
					} else {
						if (c2.length>1) {
							result = 1;
						} else {
							result = 0;
						}
					}
				}
				if (c2 == null && c1 !=null) {
					if ((c1[0]-48) > i2) {
						result = 1;
					} else if ((c1[0]-48) < i2){
						result = 1;
					} else {
						if (c1.length>1) {
							result = -1;
						} else {
							result = 0;
						}
					}
				}
			}
			if (result != 0) {
				break;
			}
		}

		return result;
	}
	
测试代码

	int result = versionCompare("3.0.5beta", "3.0.4");
	System.out.println(result);
能够正确得出结果`1`

**算法很繁杂，如果有更好的，请回复。**

###手机应用应用版本比较（Ruby）###

*-1:version1小于version2;1:version1大于version2;0:version1等于version2*

	def versionCompare version1,version2
    strArr1 = version1.split('.')
    strArr2 = version2.split('.')
    maxLen = strArr1.length > strArr2.length ? strArr1.length : strArr2.length
    result = 0
    for i in 0..maxLen
      begin
        sa = strArr1[i].to_i
      rescue
        sa = 0
      end
      begin
        sb = strArr2[i].to_i
      rescue
        sa = 0
      end
      if sa > sb
        result = 1
      elsif sa < sb
        result = -1
      else
        result = 0
      end
      if result != 0
        break;
      end
    end 
    return result
    end
  
**测试**
	
	versionCompare('3.0.5beta', '3.0.5')
  
  能够正确得出`1`
  