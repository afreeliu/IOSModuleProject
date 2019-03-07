

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, varNames_showBallType)
{
    varNames_showBallTypeLeft = 0,
    varNames_showBallTypeBottom,
    varNames_showBallTypeRight,
    varNames_showBallTypeTop,
};


@interface methodNames_BallMenuView : UIView



@end


@interface ClassNames_SuspensionBallButton : UIButton
/// 开始显示的位置
@property (nonatomic, readonly, assign) varNames_showBallType varNames_ballType;

@property (nonatomic, readwrite, copy) void (^methodNames_clickBallMenu)(NSString *varNames_title);


+ (instancetype)methodNames_showSuspensionBall:(varNames_showBallType)varNames_ballType;
+ (instancetype)methodNames_showSuspensionBall:(varNames_showBallType)varNames_ballType
                      subMethodNames_startRect:(CGRect)varNames_rect;

- (void)methodNames_hideSuspensionBall;

@end


