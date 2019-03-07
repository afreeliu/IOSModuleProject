//
//  ViewController.m
//  ModuleDemo
//
//  Created by TB on 2019/2/18.
//  Copyright © 2019 wo. All rights reserved.
//


#import "ViewController.h"
#import <ZSVideoPlay/ZSVideoPlay.h>
#import <ZSAutoLayoutModule/ZSAutoLayoutModule.h>
#import <ZSAutoLayoutModule/ClassNames_BaseLayoutView.h>
#import <ZSSuspensionBall/ClassNames_SuspensionBallButton.h>
@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [ZSAutoLayoutModule zslog];

}

- (IBAction)showSuspsionball:(UIButton *)sender {
    
    ClassNames_SuspensionBallButton *varNames_ball = [ClassNames_SuspensionBallButton methodNames_showSuspensionBall:varNames_showBallTypeLeft];
    varNames_ball.methodNames_clickBallMenu = ^(NSString *varNames_title) {
        NSLog(@"VARTITLE:%@", varNames_title);
    };
}



@end
