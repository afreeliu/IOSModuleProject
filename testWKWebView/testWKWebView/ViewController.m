//
//  ViewController.m
//  testWKWebView
//
//  Created by crown on 2018/3/21.
//  Copyright © 2018年 crown. All rights reserved.
//

#import "ViewController.h"
#import <WebKit/WebKit.h>
#import "ClassNames_Good.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import "UmPlatsFormGameManager.h"
@interface ViewController ()<WKNavigationDelegate, UIWebViewDelegate>

@property(nonatomic, strong) JSContext *webJSContext;

@property (nonatomic, strong) UIWebView *webView;

@property (nonatomic, strong) ClassNames_Good *good;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    [[UmPlatsFormGameManager umPlatsFormManagerDeafaults]umPlatsFormLogin];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(notificationPayCallBack:) name:@"umplatformgameappStore" object:nil];
    //使用UIWebVIew加载本地H5
    [self useUIWebView];
}

- (void)notificationPayCallBack:(NSNotification *)noti {
    NSDictionary *result = noti.userInfo;
    /// h5 中的方法名称
    NSString *functionJS = @"payResultCallBack";
    JSValue *function = [self.webJSContext objectForKeyedSubscript:functionJS];
    if ([[result objectForKey:@"result"] isEqualToString:@"2"]) {
        return;
    }
    if ([[result objectForKey:@"result"] isEqualToString:@"1"]) {
        /// 苹果充值成功回调
        [function callWithArguments:@[self.good.productID]];
    }
    if ([[result objectForKey:@"result"] isEqualToString:@"0"]) {
        /// 苹果充值成功失败回调
        [function callWithArguments:@[self.good.productID]];
//        [function callWithArguments:@[@"0"]];
    }
}

//使用UIWebVIew加载本地H5
-(void)useUIWebView {
    UIWebView *webView = [[UIWebView alloc] initWithFrame:self.view.bounds];
    webView.delegate = self;
    [self.view addSubview:webView];
    self.webView = webView;
    //加载本地h5
    //cocos creator构建的web-mobile
    NSString *path = [[NSBundle mainBundle] pathForResource:@"web-mobile/index" ofType:@"html"];
    
    NSURL *url = [NSURL fileURLWithPath:path];
    [webView loadRequest:[NSURLRequest requestWithURL:url]];
}


#pragma mark - UIWebView Delegate Methods

/*
 * Called on iOS devices that do not have WKWebView when the UIWebView requests to start loading a URL request.
 * Note that it just calls shouldStartDecidePolicy, which is a shared delegate method.
 * Returning YES here would allow the request to complete, returning NO would stop it.
 */
- (BOOL) webView: (UIWebView *) webView shouldStartLoadWithRequest: (NSURLRequest *) request navigationType: (UIWebViewNavigationType) navigationType
{
    NSLog(@"shouldStartLoadWithRequest");
    return [self shouldStartDecidePolicy: request];
}

/*
 * Called on iOS devices that do not have WKWebView when the UIWebView starts loading a URL request.
 * Note that it just calls didStartNavigation, which is a shared delegate method.
 */
- (void) webViewDidStartLoad: (UIWebView *) webView
{
    NSLog(@"webViewDidStartLoad");
    [self didStartNavigation];
}

/*
 * Called on iOS devices that do not have WKWebView when a URL request load failed.
 * Note that it just calls failLoadOrNavigation, which is a shared delegate method.
 */
- (void) webView: (UIWebView *) webView didFailLoadWithError: (NSError *) error
{
    NSLog(@"error:%@", error);
    [self failLoadOrNavigation: [webView request] withError: error];
}

/*
 * Called on iOS devices that do not have WKWebView when the UIWebView finishes loading a URL request.
 * Note that it just calls finishLoadOrNavigation, which is a shared delegate method.
 */
- (void) webViewDidFinishLoad: (UIWebView *) webView
{
    NSLog(@"webViewDidFinishLoad");
    [self finishLoadOrNavigation: [webView request]];
    //取出html中的js执行环境  固定写法
    JSContext *jsContext = [webView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
    self.webJSContext = jsContext;
    
    self.webJSContext.exceptionHandler = ^(JSContext *context, JSValue *exception) {
        [JSContext currentContext].exception = exception;
        NSLog(@"exception:%@",exception);
    };
    self.webJSContext[@"ClassNames_Good"] = self.good;
}




#pragma mark - WKWebView Delegate Methods

/*
 * Called on iOS devices that have WKWebView when the web view wants to start navigation.
 * Note that it calls shouldStartDecidePolicy, which is a shared delegate method,
 * but it's essentially passing the result of that method into decisionHandler, which is a block.
 */
- (void) webView: (WKWebView *) webView decidePolicyForNavigationAction: (WKNavigationAction *) navigationAction decisionHandler: (void (^)(WKNavigationActionPolicy)) decisionHandler
{
    decisionHandler([self shouldStartDecidePolicy: [navigationAction request]]);
}

/*
 * Called on iOS devices that have WKWebView when the web view starts loading a URL request.
 * Note that it just calls didStartNavigation, which is a shared delegate method.
 */
- (void) webView: (WKWebView *) webView didStartProvisionalNavigation: (WKNavigation *) navigation
{
    [self didStartNavigation];
}

/*
 * Called on iOS devices that have WKWebView when the web view fails to load a URL request.
 * Note that it just calls failLoadOrNavigation, which is a shared delegate method,
 * but it has to retrieve the active request from the web view as WKNavigation doesn't contain a reference to it.
 */
- (void) webView:(WKWebView *) webView didFailProvisionalNavigation: (WKNavigation *) navigation withError: (NSError *) error
{
    
}

/*
 * Called on iOS devices that have WKWebView when the web view begins loading a URL request.
 * This could call some sort of shared delegate method, but is unused currently.
 */
- (void) webView: (WKWebView *) webView didCommitNavigation: (WKNavigation *) navigation
{
    // do nothing
}

/*
 * Called on iOS devices that have WKWebView when the web view fails to load a URL request.
 * Note that it just calls failLoadOrNavigation, which is a shared delegate method.
 */
- (void) webView: (WKWebView *) webView didFailNavigation: (WKNavigation *) navigation withError: (NSError *) error
{
    
}

/*
 * Called on iOS devices that have WKWebView when the web view finishes loading a URL request.
 * Note that it just calls finishLoadOrNavigation, which is a shared delegate method.
 */
- (void) webView: (WKWebView *) webView didFinishNavigation: (WKNavigation *) navigation
{
    
}

#pragma mark - Shared Delegate Methods

/*
 * This is called whenever the web view wants to navigate.
 */
- (BOOL) shouldStartDecidePolicy: (NSURLRequest *) request
{
    // Determine whether or not navigation should be allowed.
    // Return YES if it should, NO if not.
    
    return YES;
}

/*
 * This is called whenever the web view has started navigating.
 */
- (void) didStartNavigation
{
    // Update things like loading indicators here.
}

/*
 * This is called when navigation failed.
 */
- (void) failLoadOrNavigation: (NSURLRequest *) request withError: (NSError *) error
{
    // Notify the user that navigation failed, provide information on the error, and so on.
}

/*
 * This is called when navigation succeeds and is complete.
 */
- (void) finishLoadOrNavigation: (NSURLRequest *) request
{
    // Remove the loading indicator, maybe update the navigation bar's title if you have one.
}




-(ClassNames_Good *)good {
    if (!_good) {
        _good = [[ClassNames_Good alloc]init];
    }
    return _good;
}

-(BOOL)shouldAutorotate{
    return NO;
}
-(BOOL)prefersStatusBarHidden{
    return YES;
}
-(UIInterfaceOrientationMask)supportedInterfaceOrientations{
    return UIInterfaceOrientationMaskLandscapeRight;
}

@end
