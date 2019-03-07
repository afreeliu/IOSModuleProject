


#import "ClassNames_SuspensionBallButton.h"
#import <sys/utsname.h>
#pragma mark ---------- 所有动画所要执行的时长
static const CGFloat varNames_suspensionBallAnimationDuration = 0.2;

#pragma mark ---------- 悬浮球的背景图标
static NSString * const varNames_suspensionBallBackgroundImage = @"image_ball";

#pragma mark ---------- 菜单按钮的标题，从远到近
static NSString * const varNames_suspensionBallMenuTitle1 = @"关闭";
static NSString * const varNames_suspensionBallMenuImage1 = @"image_closemenu";
static NSString * const varNames_suspensionBallMenuTitle2 = @"攻略";
static NSString * const varNames_suspensionBallMenuImage2 = @"image_strategy";
static NSString * const varNames_suspensionBallMenuTitle3 = @"客服";
static NSString * const varNames_suspensionBallMenuImage3 = @"image_service";

#pragma mark ---------- 悬浮球不使用的时候半隐藏的时长
static const CGFloat varNames_suspensionBallHalfHideDuration = 5.0;

#pragma mark ---------- 当前X中的刘海方向
static NSString * const varNames_orientationRight = @"RIGHT";
static NSString * const varNames_orientationLeft = @"LEFT";


#pragma mark ---------------------------------------------------------------------------








#pragma mark ---------- 悬浮球点击后展开的内容view
@interface methodNames_BallMenuView()

@property (nonatomic, readwrite, strong) NSArray *varNames_titleArray;

@property (nonatomic, readwrite, assign) CGRect varNames_originalRect;

@property (nonatomic, readwrite, strong) UIView *varNames_menuView;

@property (nonatomic, readwrite, copy) void (^methodNames_clickItemMenu)(NSString *varNames_title);

@end

@implementation methodNames_BallMenuView

+(instancetype)methodNames_showBallMenu:(CGRect)varNames_rect subMethodNames_ballType:(varNames_showBallType)varNames_ballType {
    methodNames_BallMenuView *varNames_ballMenu = [[methodNames_BallMenuView alloc]initWithFrame:varNames_rect];
    [varNames_ballMenu methodNames_setMenuViewType:varNames_ballType];
    return varNames_ballMenu;
}

-(instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.varNames_titleArray = @[varNames_suspensionBallMenuTitle1, varNames_suspensionBallMenuTitle2, varNames_suspensionBallMenuTitle3];
        self.varNames_originalRect = frame;
        self.backgroundColor = [UIColor colorWithWhite:0.78 alpha:1];
        self.layer.cornerRadius = CGRectGetWidth(frame)/2;
    }
    return self;
}



#pragma mark ---------- 点击菜单事件
- (void)methodNames_clickMenu:(UIButton *)sender {
    
    NSString *varNames_title = sender.titleLabel.text;
    if (self.methodNames_clickItemMenu) {
        if ([varNames_title isEqualToString:varNames_suspensionBallMenuTitle1]) {
            [self methodNames_hide];
        }
        self.methodNames_clickItemMenu(varNames_title);
    }
}




- (void)methodNames_setMenuViewType:(varNames_showBallType)varNames_type {
    CGRect varNames_tmpRect = CGRectZero;
    CGFloat width = CGRectGetWidth(self.varNames_originalRect);
    width *= 4;
    switch (varNames_type) {
        case 0:/// left
        {
            varNames_tmpRect = CGRectMake(CGRectGetMinX(self.varNames_originalRect), CGRectGetMinY(self.varNames_originalRect), width, CGRectGetHeight(self.varNames_originalRect));
        }
            break;
        case 1:/// bottom
        {
            varNames_tmpRect = CGRectMake(CGRectGetMinX(self.varNames_originalRect), CGRectGetMinY(self.varNames_originalRect) - CGRectGetWidth(self.varNames_originalRect) * 3, CGRectGetWidth(self.varNames_originalRect), width);
        }
            break;
        case 2:/// right
        {
            varNames_tmpRect = CGRectMake(CGRectGetMinX(self.varNames_originalRect) - CGRectGetWidth(self.varNames_originalRect) * 3, CGRectGetMinY(self.varNames_originalRect), width, CGRectGetHeight(self.varNames_originalRect));
        }
            break;
        default:/// top
        {
            varNames_tmpRect = CGRectMake(CGRectGetMinX(self.varNames_originalRect), CGRectGetMinY(self.varNames_originalRect), CGRectGetWidth(self.varNames_originalRect), width);
        }
            break;
    }
    [self methodNames_show:varNames_tmpRect subMethodNames_type:varNames_type];
}

- (void)methodNames_hide {
    _varNames_menuView.layer.opacity = 0.0;
    [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
        [self setFrame:self.varNames_originalRect];
    } completion:^(BOOL finished) {
        if (finished) {
            self.hidden = YES;
            [self.varNames_menuView removeFromSuperview];
            [self removeFromSuperview];
        }
    }];
}

#pragma mark ---------- 创建菜单中的按钮
- (void)methodNames_show:(CGRect)varNames_tmpRect subMethodNames_type:(varNames_showBallType)varNames_type {
  
    [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
        [self setFrame:varNames_tmpRect];
    } completion:^(BOOL finished) {
        if (finished) {
            [self methodNames_createMenuButton:self.varNames_titleArray subMethodNames_type:varNames_type];
        }
    }];
}
- (void)methodNames_createMenuButton:(NSArray *)varNames_titleArray subMethodNames_type:(varNames_showBallType)varNames_type {
    _varNames_menuView = [[UIView alloc]initWithFrame:self.bounds];
    _varNames_menuView.layer.opacity = 0.0;
    CGFloat width = CGRectGetWidth(self.varNames_originalRect);
    _varNames_menuView.layer.cornerRadius = width/2;
    _varNames_menuView.backgroundColor = [UIColor colorWithWhite:0.78 alpha:1];
    _varNames_menuView.layer.borderWidth = 3.0;
    _varNames_menuView.layer.borderColor = [UIColor whiteColor].CGColor;
    [self addSubview:_varNames_menuView];
    
    if (varNames_titleArray.count) {
        CGFloat varNames_margin = 5;
        for (NSString *title in varNames_titleArray) {
            UIButton *varNames_tmpBtn = [[UIButton alloc]init];
            varNames_tmpBtn.translatesAutoresizingMaskIntoConstraints = NO;
            
            [varNames_tmpBtn setImage:[self methodNames_getImageForTitle:title] forState:UIControlStateNormal];
            varNames_tmpBtn.titleLabel.font = [UIFont boldSystemFontOfSize:11];
    
            [varNames_tmpBtn setTitle:title forState:UIControlStateNormal];
            [varNames_tmpBtn addTarget:self action:@selector(methodNames_clickMenu:) forControlEvents:UIControlEventTouchUpInside];
            [_varNames_menuView addSubview:varNames_tmpBtn];
            NSLayoutConstraint *varNames_widthconstraint = [NSLayoutConstraint constraintWithItem:varNames_tmpBtn attribute:NSLayoutAttributeWidth relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:1.0 constant:50];
            NSLayoutConstraint *varNames_heightconstraint = [NSLayoutConstraint constraintWithItem:varNames_tmpBtn attribute:NSLayoutAttributeHeight relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:1.0 constant:50];
            [_varNames_menuView addConstraints:[self methodNames_createMenuConstraintArrayforView:varNames_tmpBtn withMargin:varNames_margin menuType:varNames_type]];
            [varNames_tmpBtn addConstraint:varNames_widthconstraint];
            [varNames_tmpBtn addConstraint:varNames_heightconstraint];
            varNames_margin += 60;
            
            varNames_tmpBtn.titleEdgeInsets = UIEdgeInsetsMake(varNames_tmpBtn.imageView.frame.size.height+5, -varNames_tmpBtn.imageView.bounds.size.width, 0,0);
            varNames_tmpBtn.imageEdgeInsets = UIEdgeInsetsMake(0, varNames_tmpBtn.titleLabel.frame.size.width/2, varNames_tmpBtn.titleLabel.frame.size.height+5, -varNames_tmpBtn.titleLabel.frame.size.width/2);
        }
    }
    [UIView animateWithDuration:0.1 animations:^{
        self.varNames_menuView.layer.opacity = 1.0;
    }];
}

#pragma mark ---------- 菜单内容按钮的约束
- (NSArray *)methodNames_createMenuConstraintArrayforView:(UIView *)varNames_view withMargin:(CGFloat)varNames_margin menuType:(varNames_showBallType)varNames_type {
    NSMutableArray *varNames_tmpArray = [NSMutableArray array];
    switch (varNames_type) {
        case 0:/// left
        {
            NSLayoutConstraint *varNames_rightconstraint = [NSLayoutConstraint constraintWithItem:_varNames_menuView attribute:NSLayoutAttributeRight relatedBy:NSLayoutRelationEqual toItem:varNames_view attribute:NSLayoutAttributeRight multiplier:1.0 constant:varNames_margin];
            NSLayoutConstraint *varNames_centerconstraint = [NSLayoutConstraint constraintWithItem:varNames_view attribute:NSLayoutAttributeCenterY relatedBy:NSLayoutRelationEqual toItem:_varNames_menuView attribute:NSLayoutAttributeCenterY multiplier:1.0 constant:0];
            [varNames_tmpArray addObject:varNames_rightconstraint];
            [varNames_tmpArray addObject:varNames_centerconstraint];
        }
            break;
        case 1:/// bottom
        {
            NSLayoutConstraint *varNames_topconnstraint = [NSLayoutConstraint constraintWithItem:varNames_view attribute:NSLayoutAttributeTop relatedBy:NSLayoutRelationEqual toItem:_varNames_menuView attribute:NSLayoutAttributeTop multiplier:1.0 constant:varNames_margin];
            NSLayoutConstraint *varNames_centerconstraint = [NSLayoutConstraint constraintWithItem:varNames_view attribute:NSLayoutAttributeCenterX relatedBy:NSLayoutRelationEqual toItem:_varNames_menuView attribute:NSLayoutAttributeCenterX multiplier:1.0 constant:0];
            [varNames_tmpArray addObject:varNames_topconnstraint];
            [varNames_tmpArray addObject:varNames_centerconstraint];
        }
            break;
        case 2:/// right
        {
            NSLayoutConstraint *varNames_leftconnstraint = [NSLayoutConstraint constraintWithItem:varNames_view attribute:NSLayoutAttributeLeft relatedBy:NSLayoutRelationEqual toItem:_varNames_menuView attribute:NSLayoutAttributeLeft multiplier:1.0 constant:varNames_margin];
            NSLayoutConstraint *varNames_centerconstraint = [NSLayoutConstraint constraintWithItem:varNames_view attribute:NSLayoutAttributeCenterY relatedBy:NSLayoutRelationEqual toItem:_varNames_menuView attribute:NSLayoutAttributeCenterY multiplier:1.0 constant:0];
            [varNames_tmpArray addObject:varNames_leftconnstraint];
            [varNames_tmpArray addObject:varNames_centerconstraint];
        }
            break;
            
        default:/// top
        {
            NSLayoutConstraint *varNames_topconnstraint = [NSLayoutConstraint constraintWithItem:_varNames_menuView attribute:NSLayoutAttributeBottom relatedBy:NSLayoutRelationEqual toItem:varNames_view attribute:NSLayoutAttributeBottom multiplier:1.0 constant:varNames_margin];
            NSLayoutConstraint *varNames_centerconstraint = [NSLayoutConstraint constraintWithItem:varNames_view attribute:NSLayoutAttributeCenterX relatedBy:NSLayoutRelationEqual toItem:_varNames_menuView attribute:NSLayoutAttributeCenterX multiplier:1.0 constant:0];
            [varNames_tmpArray addObject:varNames_topconnstraint];
            [varNames_tmpArray addObject:varNames_centerconstraint];
        }
            break;
    }
    return varNames_tmpArray;
}






#pragma mark ---------- 根据标题内容获取的图片
- (UIImage *)methodNames_getImageForTitle:(NSString *)varNames_title {
    UIImage *varNames_image = nil;
    if ([varNames_title isEqualToString:varNames_suspensionBallMenuTitle3]) {
        varNames_image = [UIImage imageNamed:varNames_suspensionBallMenuImage3];
    } else if ([varNames_title isEqualToString:varNames_suspensionBallMenuTitle2]) {
        varNames_image = [UIImage imageNamed:varNames_suspensionBallMenuImage2];
    } else if ([varNames_title isEqualToString:varNames_suspensionBallMenuTitle1]) {
        varNames_image = [UIImage imageNamed:varNames_suspensionBallMenuImage1];
    }
    return varNames_image;
}

@end





#pragma mark ---------- 悬浮球view
@interface ClassNames_SuspensionBallButton()

@property (nonatomic, readwrite, assign) CGPoint varNames_touchPoint;
@property (nonatomic, readwrite, assign) CGFloat varNames_touchBtnX;
@property (nonatomic, readwrite, assign) CGFloat varNames_touchBtnY;
@property (nonatomic, readwrite, assign) CGFloat varNames_btnWidth;
@property (nonatomic, readwrite, assign) CGFloat varNames_btnHeight;

@property (nonatomic, readwrite, assign) varNames_showBallType varNames_ballType;
@property (nonatomic, readwrite, strong) methodNames_BallMenuView *varNames_ballMenu;

@property (nonatomic, readwrite, assign) BOOL varNames_isHideMenu;
@property (nonatomic, readwrite, strong) NSTimer *varNames_timer;

@property (nonatomic, readwrite, copy) NSString *varNames_orientation;


@end


@implementation ClassNames_SuspensionBallButton


#pragma mark ---------- 悬浮球点击事件
- (void)methodNames_showMenu:(UIButton *)sender {
    sender.selected = !sender.selected;
    if (sender.selected) {
        [_varNames_timer setFireDate:[NSDate distantFuture]];
        if (_varNames_isHideMenu) {
            [self methodNames_setBall:self.varNames_ballType];
        }
        self.varNames_isHideMenu = NO;
        
        _varNames_ballMenu = [methodNames_BallMenuView methodNames_showBallMenu:sender.frame subMethodNames_ballType:self.varNames_ballType];
        [[UIApplication sharedApplication].keyWindow addSubview:_varNames_ballMenu];
        __weak typeof(self) weakSelf = self;
        _varNames_ballMenu.methodNames_clickItemMenu = ^(NSString *varNames_title) {
            if ([varNames_title isEqualToString:varNames_suspensionBallMenuTitle1]) {
                [weakSelf methodNames_hideSuspensionBall];
            } else {
                if (weakSelf.methodNames_clickBallMenu) {
                    [weakSelf methodNames_showMenu:weakSelf];
                    weakSelf.methodNames_clickBallMenu(varNames_title);
                }
            }
        };
        
    } else {
        [_varNames_ballMenu methodNames_hide];
        self.varNames_isHideMenu = YES;
        [_varNames_timer setFireDate:[NSDate dateWithTimeIntervalSinceNow:varNames_suspensionBallHalfHideDuration]];
    }
    [[UIApplication sharedApplication].keyWindow bringSubviewToFront:self];
}


+ (instancetype)methodNames_showSuspensionBall:(varNames_showBallType)varNames_ballType {
    
    ClassNames_SuspensionBallButton *varNames_ball = [ClassNames_SuspensionBallButton methodNames_showSuspensionBall:varNames_ballType subMethodNames_startRect:CGRectMake(0, 100, 60, 60)];
    return varNames_ball;
}

+ (instancetype)methodNames_showSuspensionBall:(varNames_showBallType)varNames_ballType
                      subMethodNames_startRect:(CGRect)varNames_rect {
    ClassNames_SuspensionBallButton *varNames_ball = [[ClassNames_SuspensionBallButton alloc]initWithFrame:varNames_rect];
    varNames_ball.varNames_ballType = varNames_ballType;
    [[UIApplication sharedApplication].keyWindow addSubview:varNames_ball];
    [[UIApplication sharedApplication].keyWindow bringSubviewToFront:varNames_ball];
    [varNames_ball methodNames_setBall:varNames_ballType];
    [varNames_ball.varNames_timer setFireDate:[NSDate dateWithTimeIntervalSinceNow:varNames_suspensionBallHalfHideDuration]];
    return varNames_ball;
}

-(void)dealloc {
    [[NSNotificationCenter defaultCenter]removeObserver:self];
}

-(instancetype)initWithFrame:(CGRect)frame{
    self = [super initWithFrame:frame];
    if (self) {
        _varNames_btnWidth = 60.0;
        _varNames_btnHeight = 60.0;
        self.backgroundColor = [UIColor whiteColor];
        [self setBackgroundImage:[UIImage imageNamed:varNames_suspensionBallBackgroundImage] forState:UIControlStateNormal];
        self.layer.opacity = 0.0;
        self.layer.cornerRadius = 30.0;
        self.varNames_isHideMenu = YES;
        [self methodNames_showSuspensionBall];
        [self methodNames_deviceOrientation];
        [self addTarget:self action:@selector(methodNames_showMenu:) forControlEvents:UIControlEventTouchUpInside];
        _varNames_timer = [NSTimer timerWithTimeInterval:varNames_suspensionBallHalfHideDuration target:self selector:@selector(methodNames_alphaSuspensionBall:) userInfo:nil repeats:YES];
        [[NSRunLoop currentRunLoop] addTimer:_varNames_timer forMode:NSDefaultRunLoopMode];
        
        [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(methodNames_orientationChange:) name:UIDeviceOrientationDidChangeNotification object:nil];
    }
    return self;
}

- (void)methodNames_alphaSuspensionBall:(NSTimer *)varNames_timer {
    if (self.varNames_isHideMenu) {
        [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
            self.layer.opacity = 0.5;
            [self methodNames_halfHideSuspensionBall:self.varNames_ballType];
        } completion:^(BOOL finished) {
            if (finished) {
                [self.varNames_timer setFireDate:[NSDate distantFuture]];
            }
        }];
    }
}

#pragma mark ---------- 悬浮球悬停的时候，半隐藏悬浮球
- (void)methodNames_halfHideSuspensionBall:(varNames_showBallType)varNames_ballType {
    
    switch (varNames_ballType) {
        case 0:
        {
            
            if (![self methodNames_phoneTpye]) {
                /// 非 X
                [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                    [self setFrame:CGRectMake(-CGRectGetWidth(self.frame)/2, CGRectGetMinY(self.frame), CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
                }];
            } else {
                if ([_varNames_orientation isEqualToString:varNames_orientationRight]) {
                    /// 留海在右
                    [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                        [self setFrame:CGRectMake(-CGRectGetWidth(self.frame)/2, CGRectGetMinY(self.frame), CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
                    }];
                } else {
                    [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                        [self setFrame:CGRectMake(0, CGRectGetMinY(self.frame), CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
                    }];
                }
            }
        }
            break;
        case 1:
        {
            [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                [self setFrame:CGRectMake(CGRectGetMinX(self.frame), CGRectGetHeight(self.superview.bounds) - CGRectGetHeight(self.frame)/2, CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
            }];
        }
            break;
        case 2:
        {
            if (![self methodNames_phoneTpye]) {
                /// 非 X
                [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                    [self setFrame:CGRectMake(CGRectGetWidth(self.superview.bounds) - CGRectGetWidth(self.frame)/2, CGRectGetMinY(self.frame), CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
                }];
            } else {
                if ([_varNames_orientation isEqualToString:varNames_orientationLeft]) {
                    /// 留海在左
                    [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                        [self setFrame:CGRectMake(CGRectGetWidth(self.superview.bounds) - CGRectGetWidth(self.frame)/2, CGRectGetMinY(self.frame), CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
                    }];
                } else {
                    [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                        [self setFrame:CGRectMake(CGRectGetWidth(self.superview.bounds) - CGRectGetWidth(self.frame), CGRectGetMinY(self.frame), CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
                    }];
                }
            }
            
        }
            break;
        default:
        {
            [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                [self setFrame:CGRectMake(CGRectGetMinX(self.frame), -CGRectGetHeight(self.frame)/2, CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
            }];
        }
            break;
    }
}

#pragma mark ---------- 是否为x，xr，xs
-(BOOL)methodNames_phoneTpye {
    BOOL varNames_phoneTypeX = NO;
    
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString *phoneType = [NSString stringWithCString: systemInfo.machine encoding:NSASCIIStringEncoding];
    
    if([phoneType  isEqualToString:@"iPhone10,3"]) varNames_phoneTypeX = YES;
    
    if([phoneType  isEqualToString:@"iPhone10,6"]) varNames_phoneTypeX = YES;
    
    if([phoneType  isEqualToString:@"iPhone11,8"]) varNames_phoneTypeX = YES;
    
    if([phoneType  isEqualToString:@"iPhone11,2"]) varNames_phoneTypeX = YES;
    
    if([phoneType  isEqualToString:@"iPhone11,4"]) varNames_phoneTypeX = YES;
    
    if([phoneType  isEqualToString:@"iPhone11,6"]) varNames_phoneTypeX = YES;
    
    return varNames_phoneTypeX;
}

- (void)methodNames_deviceOrientation {
    UIInterfaceOrientation varNames_orientation = [UIApplication sharedApplication].statusBarOrientation;
    if (varNames_orientation == UIInterfaceOrientationLandscapeLeft) {
        NSLog(@"home 键在左侧 --- 留海在右");
        _varNames_orientation = varNames_orientationRight;
    }
    if (varNames_orientation == UIInterfaceOrientationLandscapeRight) {
        NSLog(@"home 键在右侧 --- 留海在左");
        _varNames_orientation = varNames_orientationLeft;
    }
}

- (void)methodNames_orientationChange:(NSNotification *)noti {
    UIDeviceOrientation varNames_orientation = [UIDevice currentDevice].orientation;
    switch (varNames_orientation){
        case UIDeviceOrientationPortrait:
            break;
        case UIDeviceOrientationLandscapeLeft:
//            NSLog(@"屏幕 left --- home 键在右侧 --- ");
            _varNames_orientation = varNames_orientationLeft;
            break;
        case UIDeviceOrientationPortraitUpsideDown:
            break;
        case UIDeviceOrientationLandscapeRight:
//            NSLog(@"屏幕 right --- home 键在左侧 --- ");
            _varNames_orientation = varNames_orientationRight;
            break;
        default:
            break;
    }
    [self methodNames_halfHideSuspensionBall:self.varNames_ballType];
}

#pragma mark ---------- 停止移动悬浮球的时候，设置悬浮球的位置
- (void)methodNames_setBall:(varNames_showBallType)varNames_ballType {
    _varNames_ballType = varNames_ballType;
    switch (varNames_ballType) {
        case 0:
        {
            CGFloat varNames_Y = CGRectGetMinY(self.frame);
            varNames_Y = varNames_Y > 0 ? varNames_Y:0;
            varNames_Y = varNames_Y > (CGRectGetHeight(self.superview.frame)-CGRectGetHeight(self.frame))?(CGRectGetHeight(self.superview.frame)-CGRectGetHeight(self.frame)): varNames_Y;
            [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                [self setFrame:CGRectMake(5, varNames_Y, CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
            }];
        }
            break;
        case 1:
        {
            [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                [self setFrame:CGRectMake(CGRectGetMinX(self.frame), CGRectGetHeight(self.superview.bounds) - CGRectGetHeight(self.frame), CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
            }];
        }
            break;
        case 2:
        {
            [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                [self setFrame:CGRectMake(CGRectGetWidth(self.superview.bounds) - CGRectGetWidth(self.frame), CGRectGetMinY(self.frame), CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
            }];
        }
            break;
            
        default:
        {
            [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
                [self setFrame:CGRectMake(CGRectGetMinX(self.frame), 5, CGRectGetWidth(self.frame), CGRectGetHeight(self.frame))];
            }];
        }
            break;
    }
}



- (void)methodNames_showSuspensionBall {
    self.hidden = NO;
    [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
        self.layer.opacity = 1.0;
    }];
}

- (void)methodNames_hideSuspensionBall {
    self.hidden = YES;
    [self removeFromSuperview];
}


#pragma mark ---------- super privateMethod
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    [super touchesBegan:touches withEvent:event];
    UITouch *varNames_touch = [touches anyObject];
    _varNames_touchPoint = [varNames_touch locationInView:self];
    _varNames_touchBtnX = self.frame.origin.x;
    _varNames_touchBtnY = self.frame.origin.y;
    [UIView animateWithDuration:varNames_suspensionBallAnimationDuration animations:^{
        self.layer.opacity = 1.0;
    }];
}

-(void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    if (self.selected) {
        return;
    }
    UITouch *varNames_touch = [touches anyObject];
    CGPoint varNames_currentPoint = [varNames_touch locationInView:self];
    
    CGFloat varNames_offsetX = varNames_currentPoint.x - _varNames_touchPoint.x;
    CGFloat varNames_offsetY = varNames_currentPoint.y - _varNames_touchPoint.y;
    
    CGFloat varNames_centerX = self.center.x + varNames_offsetX;
    CGFloat varNames_centerY = self.center.y + varNames_offsetY;

    self.center = CGPointMake(varNames_centerX, varNames_centerY);
    
    CGFloat varNames_superWidth = self.superview.frame.size.width;
    CGFloat varnames_superHeight = self.superview.frame.size.height;
    CGFloat varnames_btnX = self.frame.origin.x;
    CGFloat varnames_btnY = self.frame.origin.y;
    CGFloat varnames_btnW = self.frame.size.width;
    CGFloat varnames_btnH = self.frame.size.height;
    
    if (varnames_btnX > varNames_superWidth){
        CGFloat varNames_centerX = varNames_superWidth - varnames_btnW/2;
        self.center = CGPointMake(varNames_centerX, varNames_centerY);
    } else if (varnames_btnX < 0){
        CGFloat varNames_centerX = varnames_btnW * 0.3;
        self.center = CGPointMake(varNames_centerX, varNames_centerY);
    }

    if (varnames_btnY <= 0){
        varNames_centerY = varnames_btnH * 0.7;
        self.center = CGPointMake(varNames_centerX, varNames_centerY);
    } else if (varnames_btnY > varnames_superHeight){
        CGFloat y = varnames_superHeight - varnames_btnH * 0.3;
        self.center = CGPointMake(varNames_centerX, y);
    }
}

-(void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {

    CGFloat varNames_superWidth = self.superview.frame.size.width;
    CGFloat varnames_superHeight = self.superview.frame.size.height;
    CGFloat varnames_btnX = self.frame.origin.x;
    CGFloat varnames_btnY = self.frame.origin.y;
    
    CGFloat varNames_minDistance = 2;
    
    BOOL varNames_isOverX = fabs(varnames_btnX - _varNames_touchBtnX) > varNames_minDistance;
    BOOL varNames_isOverY = fabs(varnames_btnY - _varNames_touchBtnY) > varNames_minDistance;
    
    if (varNames_isOverX || varNames_isOverY) {
        [self touchesCancelled:touches withEvent:event];
        
        if (varnames_btnY < _varNames_btnHeight) {
            _varNames_ballType = varNames_showBallTypeTop;
        }  else if (varnames_btnY > varnames_superHeight - _varNames_btnHeight) {
            _varNames_ballType = varNames_showBallTypeBottom;
        } else {
            if (varnames_btnX < varNames_superWidth/2.0) {
                _varNames_ballType = varNames_showBallTypeLeft;
            } else {
                _varNames_ballType = varNames_showBallTypeRight;
            }
        }
        [self methodNames_setBall:_varNames_ballType];
        [_varNames_timer setFireDate:[NSDate dateWithTimeIntervalSinceNow:varNames_suspensionBallHalfHideDuration]];
        
    }else{
        [super touchesEnded:touches withEvent:event];
    }
}


@end
