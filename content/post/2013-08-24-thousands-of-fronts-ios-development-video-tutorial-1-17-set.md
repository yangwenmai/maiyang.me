---
layout: post
title: '【千锋】iOS开发视频教程学习（1-17集）'
date: 2013-08-24 07:52:00
comments: true
categories: [ios]
---
iOS开发视频教程-第一季
-----
1.  （第一集：iOS历史介绍）
2. （第二集：xcode安装）
3. （第三集：UIView）-边框frame、边界bounds、中心center
4. （第四集：UILabel）
UILabel主要属性：NSString *text-文本、UIFont *font-字体、UIColor *textColor-文本颜色、UILineBreakMode lineBreakMode-文本这行的模式、UITextAlignment textAlignment-文本的对齐方式（有左中右）
UILabel和字体大小匹配
`- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    NSString *s = @"mai.yang是饭特稀娱乐体育的后台开发工程师，android和ios客户端开发工程师";
    UIFont *font = [UIFont fontWithName:@"Arial" size:50.0f];
    CGSize size = CGSizeMake(320, 300);// 超过指定的高度300后，系统会自动将超长的截断用...表示
    UILabel *label2 = [[UILabel alloc] initWithFrame:CGRectZero];
    [label2 setNumberOfLines:0];
    
    CGSize labelSize = [s sizeWithFont:font constrainedToSize:size lineBreakMode:NSLineBreakByWordWrapping];
    
    label2.frame = CGRectMake(0, 0, labelSize.width, labelSize.height);
    label2.textColor = [UIColor blackColor];
    label2.font = font;
    label2.text = s;
    
    [self.view addSubview:label2];
}`

<!--more-->

5.  （第五集：UIButton）
UIButton继承自UIControl,UIControl又继承自UIView，所以UIButton的属性也包括UIView和UIControl的。
UIButton有几种类型：Custom、Rounded Rect、Detail Disclosure、Info Light、Info Dark、Add Contact.

UIButton的响应事件是需要通过File's Owner去设置Received Actions，当然前提是必须要在viewController的头文件中定义action的方法接口才能设置到Received Actions上。

UIAlertView:给用户显示一个弹出窗口，继承自UIView
`
UIButton *button = (UIButton*)sender;
    NSString *title = [NSString stringWithFormat:@"Button tag %d", button.tag];
    NSString *message = [button currentTitle];
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title message:message delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
    [alert show];
`
6.  （第七集：UIDatePicker）
NSDate、NSDateFormatter、NSCalendar、UIDatePicker
`
// nsdateformatter
    NSDateFormatter *formater = [[NSDateFormatter alloc] init];
    [formater setDateFormat:@"YYYY-MM-dd"];
    NSDate *date = [[NSDate alloc] init];
    NSString *d1 = [formater stringFromDate:date];
    NSLog(@"date is %@", d1);
    [formater setDateFormat:@"YYYY年MM月dd日"];
    NSString *d2 = [formater stringFromDate:date];
    NSLog(@"date is %@", d2);
`
注意在设置的时候必须要将每个元素与File's Owner中outlet相互关联上，不然我们的属性元素是不生效的。
7.  （第十集：UIPickerView）
8.  （第十四集：UIProgressBar）
9.  （第十五集：MapKit）
