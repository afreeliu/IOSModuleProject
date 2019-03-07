

#import "ClassNames_BaseLayoutView.h"

@implementation ClassNames_BaseLayoutView

+ (NSLayoutConstraint *)methodNames_layoutCenterX:(UIView *)varNames_view
                        subMethodNames_constriant:(CGFloat)varNames_constant {
    NSAssert(varNames_view, @"subView 不能为nil");
    NSAssert(varNames_view.superview, @"subView 的superView 不能为nil");
    NSLayoutConstraint *varNames_layout = [NSLayoutConstraint constraintWithItem:varNames_view.superview attribute:NSLayoutAttributeCenterX relatedBy:NSLayoutRelationEqual toItem:varNames_view attribute:NSLayoutAttributeCenterX multiplier:1.0 constant:varNames_constant];
    [varNames_view.superview addConstraint:varNames_layout];
    return varNames_layout;
}

+ (NSLayoutConstraint *)methodNames_layoutCenterY:(UIView *)varNames_view
                        subMethodNames_constriant:(CGFloat)varNames_constant {
    NSAssert(varNames_view, @"subView 不能为nil");
    NSAssert(varNames_view.superview, @"subView 的superView 不能为nil");
    NSLayoutConstraint *varNames_layout = [NSLayoutConstraint constraintWithItem:varNames_view.superview attribute:NSLayoutAttributeCenterY relatedBy:NSLayoutRelationEqual toItem:varNames_view attribute:NSLayoutAttributeCenterY multiplier:1.0 constant:varNames_constant];
    [varNames_view.superview addConstraint:varNames_layout];
    return varNames_layout;
    
}

+ (NSLayoutConstraint *)methodNames_layoutWidth:(UIView *)varNames_view
                      subMethodNames_constriant:(CGFloat)varNames_constant {
    NSAssert(varNames_view, @"subView 不能为nil");
    NSAssert(varNames_view.superview, @"subView 的superView 不能为nil");
    NSLayoutConstraint *varNames_layout = [NSLayoutConstraint constraintWithItem:varNames_view attribute:NSLayoutAttributeWidth relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:1.0 constant:varNames_constant];
    [varNames_view addConstraint:varNames_layout];
    return varNames_layout;
    
    
}

+ (NSLayoutConstraint *)methodNames_layoutHeight:(UIView *)varNames_view
                       subMethodNames_constriant:(CGFloat)varNames_constant {
    NSAssert(varNames_view, @"subView 不能为nil");
    NSAssert(varNames_view.superview, @"subView 的superView 不能为nil");
    NSLayoutConstraint *varNames_layout = [NSLayoutConstraint constraintWithItem:varNames_view attribute:NSLayoutAttributeHeight relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:1.0 constant:varNames_constant];
    [varNames_view addConstraint:varNames_layout];
    return varNames_layout;
}

+ (NSLayoutConstraint *)methodNames_layoutTop:(UIView *)varNames_view
                    subMethodNames_constriant:(CGFloat)varNames_constant {
    NSAssert(varNames_view, @"subView 不能为nil");
    NSAssert(varNames_view.superview, @"subView 的superView 不能为nil");
    NSLayoutConstraint *varNames_layout = [NSLayoutConstraint constraintWithItem:varNames_view attribute:NSLayoutAttributeTop relatedBy:NSLayoutRelationEqual toItem:varNames_view.superview attribute:NSLayoutAttributeTop multiplier:1.0 constant:varNames_constant];
    [varNames_view.superview addConstraint:varNames_layout];
    return varNames_layout;
}

+ (NSLayoutConstraint *)methodNames_layoutLeft:(UIView *)varNames_view
                     subMethodNames_constriant:(CGFloat)varNames_constant {
    NSAssert(varNames_view, @"subView 不能为nil");
    NSAssert(varNames_view.superview, @"subView 的superView 不能为nil");
    NSLayoutConstraint *varNames_layout = [NSLayoutConstraint constraintWithItem:varNames_view attribute:NSLayoutAttributeLeft relatedBy:NSLayoutRelationEqual toItem:varNames_view.superview attribute:NSLayoutAttributeLeft multiplier:1.0 constant:varNames_constant];
    [varNames_view.superview addConstraint:varNames_layout];
    return varNames_layout;
}

+ (NSLayoutConstraint *)methodNames_layoutBottom:(UIView *)varNames_view
                       subMethodNames_constriant:(CGFloat)varNames_constant {
    NSAssert(varNames_view, @"subView 不能为nil");
    NSAssert(varNames_view.superview, @"subView 的superView 不能为nil");
    NSLayoutConstraint *varNames_layout = [NSLayoutConstraint constraintWithItem:varNames_view.superview attribute:NSLayoutAttributeBottom relatedBy:NSLayoutRelationEqual toItem:varNames_view attribute:NSLayoutAttributeBottom multiplier:1.0 constant:varNames_constant];
    [varNames_view.superview addConstraint:varNames_layout];
    return varNames_layout;
}

+ (NSLayoutConstraint *)methodNames_layoutRight:(UIView *)varNames_view
                      subMethodNames_constriant:(CGFloat)varNames_constant {
    NSAssert(varNames_view, @"subView 不能为nil");
    NSAssert(varNames_view.superview, @"subView 的superView 不能为nil");
    NSLayoutConstraint *varNames_layout = [NSLayoutConstraint constraintWithItem:varNames_view.superview attribute:NSLayoutAttributeRight relatedBy:NSLayoutRelationEqual toItem:varNames_view attribute:NSLayoutAttributeRight multiplier:1.0 constant:varNames_constant];
    [varNames_view.superview addConstraint:varNames_layout];
    return varNames_layout;
}

+ (NSLayoutConstraint *)methodNames_layoutSubView1:(UIView *)varNames_subView1
                         subMethodNames_attribute1:(NSLayoutAttribute)varNames_attribute1
                     subMethodNames_layoutSubView2:(UIView *)varNames_subView2
                         subMethodNames_attribute2:(NSLayoutAttribute)varNames_attribute2
                         subMethodNames_constriant:(CGFloat)varNames_constant {
    NSAssert(varNames_subView1, @"subView 不能为nil");
    NSAssert(varNames_subView1.superview, @"subView 的superView 不能为nil");
    NSAssert(varNames_subView2, @"subView 不能为nil");
    NSAssert(varNames_subView2.superview, @"subView 的superView 不能为nil");
    NSAssert([varNames_subView1.superview isEqual:varNames_subView2.superview], @"subView1 和 subView2 不在同一个父视图中");
    NSLayoutConstraint *varNames_layout = [NSLayoutConstraint constraintWithItem:varNames_subView1 attribute:varNames_attribute1 relatedBy:NSLayoutRelationEqual toItem:varNames_subView2 attribute:varNames_attribute2 multiplier:1.0 constant:varNames_constant];
    [varNames_subView1.superview addConstraint:varNames_layout];
    return varNames_layout;
}

@end
