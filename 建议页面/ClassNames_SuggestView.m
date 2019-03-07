

#import "ClassNames_SuggestView.h"
#import "ClassNames_Color.h"
#import "ClassNames_BaseViewLayout.h"
#import "ClassNames_DefaultThemeConfigure.h"
#import "ClassNames_Title.h"
#import "ClassNames_CutImage.h"
#import "ClassNames_ImageCommitButton.h"
#import "ClassNames_PGHubView.h"

@interface ClassNames_SuggestView ()

@property (nonatomic, readwrite, strong) UILabel *varNames_titleLabel;

@property (nonatomic, readwrite, strong) UIButton *varNames_closeBtn;

@property (nonatomic, readwrite, strong) UIScrollView *varNames_contentScrollView;

@property (nonatomic, readwrite, assign) CGFloat varNames_labelHeight;

@property (nonatomic, readwrite, strong) UILabel *varNames_tipLabel;

@property (nonatomic, readwrite, strong) UIButton *varNames_firstCommitBtn;

@property (nonatomic, readwrite, strong) UIButton *varNames_secondCommitBtn;

@property (nonatomic, readwrite, assign) CGFloat varNames_topMarginValue;

@property (nonatomic, readwrite, assign) CGFloat varNames_tipContentHeight;
@end


@implementation ClassNames_SuggestView

+(instancetype)methodNames_createSuggestView {
    ClassNames_SuggestView *varNames_tmpSuggestView = [[ClassNames_SuggestView alloc]init];
    varNames_tmpSuggestView.translatesAutoresizingMaskIntoConstraints = NO;
    varNames_tmpSuggestView.backgroundColor = [UIColor whiteColor];
    varNames_tmpSuggestView.layer.cornerRadius = 5.0;
    varNames_tmpSuggestView.layer.opacity = 0.0;
    [varNames_tmpSuggestView methodNames_showViewWithAnimatecomplete:^{
        
    }];
    return varNames_tmpSuggestView;
}

- (void)methodNames_showViewWithAnimatecomplete:(void (^)(void))methodNames_completeAction {
    [UIView animateWithDuration:methodNames_getShowHideViewAnimateDuration() animations:^{
        self.layer.opacity = 1.0;
    } completion:^(BOOL finished) {
        if (finished) {
            if (methodNames_completeAction) {
                methodNames_completeAction();
            }
        }
    }];
}

- (void)methodNames_hideViewWithAnimatecomplete:(void (^)(void))methodNames_completeAction {
    [UIView animateWithDuration:methodNames_getShowHideViewAnimateDuration() animations:^{
        self.layer.opacity = 0.0;
    } completion:^(BOOL finished) {
        if (finished) {
            if (methodNames_completeAction) {
                methodNames_completeAction();
            }
        }
    }];
}
#pragma mark ----------------------------------------------------------------------

-(instancetype)init {
    self = [super init];
    if (self) {
        [self methodNames_createUI];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    [self methodNames_layoutSubViews];
    if (CGRectGetMinX(_varNames_contentScrollView.frame)) {
        NSArray *varNames_array = methodNames_getSuggestViewItem();
        int varNames_index = 0;
        for (NSString *varNames_content in varNames_array) {
            UILabel *varNames_tmpLabel = [self methodNames_setItemContent:varNames_content methodNames_index:varNames_index];
            [_varNames_contentScrollView addSubview:varNames_tmpLabel];
            varNames_index++;
        }
        [_varNames_contentScrollView setContentSize:CGSizeMake(CGRectGetWidth(_varNames_contentScrollView.frame), _varNames_labelHeight)];
    }
}



- (void)methodNames_createUI {
    
    _varNames_labelHeight = 0;
    
    UILabel *varNames_tmpTitleLabel = [[UILabel alloc]init];
    varNames_tmpTitleLabel.translatesAutoresizingMaskIntoConstraints = NO;
    varNames_tmpTitleLabel.textAlignment = NSTextAlignmentCenter;
    varNames_tmpTitleLabel.font = [UIFont boldSystemFontOfSize:21];
    varNames_tmpTitleLabel.text = @"绑定手机，尊享特权";
    varNames_tmpTitleLabel.textColor = [ClassNames_Color methodNames_colorWithHexString:@"#0995e6"];
    _varNames_titleLabel = varNames_tmpTitleLabel;
    
    
    UIButton *varNames_closeBtn = [[UIButton alloc]init];
    varNames_closeBtn.translatesAutoresizingMaskIntoConstraints = NO;
    [varNames_closeBtn addTarget:self action:@selector(methodNames_closeAction:) forControlEvents:UIControlEventTouchUpInside];
    UIImage *image_close = methodNames_getImage(@"image_close");
    [varNames_closeBtn setBackgroundImage:image_close forState:UIControlStateNormal];
    _varNames_closeBtn = varNames_closeBtn;
    
    UIScrollView *varNames_tmpScrollView = [[UIScrollView alloc]init];
    varNames_tmpScrollView.translatesAutoresizingMaskIntoConstraints = NO;
    varNames_tmpScrollView.showsVerticalScrollIndicator = NO;
    varNames_tmpScrollView.showsHorizontalScrollIndicator = NO;
    varNames_tmpScrollView.backgroundColor = [UIColor whiteColor];
    _varNames_contentScrollView = varNames_tmpScrollView;
    
    UILabel *varNames_tmpTipLabel = [[UILabel alloc]init];
    varNames_tmpTipLabel.translatesAutoresizingMaskIntoConstraints = NO;
    varNames_tmpTipLabel.numberOfLines = 0;
    varNames_tmpTipLabel.font = [UIFont systemFontOfSize:11];
    varNames_tmpTipLabel.textColor = [UIColor redColor];
    varNames_tmpTipLabel.textAlignment = NSTextAlignmentLeft;
    varNames_tmpTipLabel.text = methodNames_getSuggestViewTip();
    _varNames_tipLabel = varNames_tmpTipLabel;
    
    
    UIButton *varNames_tmpFirstCommitBtn = [[UIButton alloc]init];
    varNames_tmpFirstCommitBtn.translatesAutoresizingMaskIntoConstraints = NO;
    [varNames_tmpFirstCommitBtn setTitle:@"稍后绑定" forState:UIControlStateNormal];
    [varNames_tmpFirstCommitBtn setTitleColor:[UIColor lightGrayColor] forState:UIControlStateNormal];
    [varNames_tmpFirstCommitBtn setBackgroundColor:[UIColor whiteColor]];
    varNames_tmpFirstCommitBtn.layer.borderColor = [UIColor lightGrayColor].CGColor;
    varNames_tmpFirstCommitBtn.layer.cornerRadius = 5;
    varNames_tmpFirstCommitBtn.layer.borderWidth = 1;
    [varNames_tmpFirstCommitBtn addTarget:self action:@selector(methodNames_firstCommitAction:) forControlEvents:UIControlEventTouchUpInside];
    _varNames_firstCommitBtn = varNames_tmpFirstCommitBtn;
    
    UIButton *varNames_tmpSecondCommitBtn = [[UIButton alloc]init];
    varNames_tmpSecondCommitBtn.translatesAutoresizingMaskIntoConstraints = NO;
    [varNames_tmpSecondCommitBtn setTitle:@"立即绑定" forState:UIControlStateNormal];
    [varNames_tmpSecondCommitBtn setTitleColor:[ClassNames_Color methodNames_colorWithHexString:@"#0995e6"] forState:UIControlStateNormal];
    [varNames_tmpSecondCommitBtn setBackgroundColor:[UIColor whiteColor]];
    varNames_tmpSecondCommitBtn.layer.borderColor = [ClassNames_Color methodNames_colorWithHexString:@"#0995e6"].CGColor;
    varNames_tmpSecondCommitBtn.layer.cornerRadius = 5;
    varNames_tmpSecondCommitBtn.layer.borderWidth = 1;
    [varNames_tmpSecondCommitBtn addTarget:self action:@selector(methodNames_secondCommitAction:) forControlEvents:UIControlEventTouchUpInside];
    _varNames_secondCommitBtn = varNames_tmpSecondCommitBtn;
    
    [self addSubview:_varNames_titleLabel];
    [self addSubview:_varNames_closeBtn];
    [self addSubview:_varNames_contentScrollView];
    [self addSubview:_varNames_tipLabel];
    [self addSubview:_varNames_firstCommitBtn];
    [self addSubview:_varNames_secondCommitBtn];
}

- (UILabel *)methodNames_setItemContent:(NSString *)varNames_content methodNames_index:(NSInteger)varNames_index{
    
    NSString *varNames_detailContent = [NSString stringWithFormat:@"特权%ld:%@", (long)(varNames_index+1), varNames_content];
    
    CGRect varNames_contentRect = [varNames_detailContent boundingRectWithSize:CGSizeMake(CGRectGetWidth(_varNames_contentScrollView.frame), CGFLOAT_MAX) options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName:[UIFont systemFontOfSize:13]} context:nil];
    
    UILabel *varNames_tmpLabel = [[UILabel alloc]initWithFrame:CGRectMake(0, _varNames_labelHeight, CGRectGetWidth(_varNames_contentScrollView.frame), CGRectGetHeight(varNames_contentRect))];
    varNames_tmpLabel.textAlignment = NSTextAlignmentLeft;
    varNames_tmpLabel.textColor = [UIColor lightGrayColor];
    varNames_tmpLabel.text = varNames_detailContent;
    varNames_tmpLabel.font = [UIFont systemFontOfSize:13];
    varNames_tmpLabel.numberOfLines = 0;
    _varNames_labelHeight += CGRectGetHeight(varNames_contentRect);
    return varNames_tmpLabel;
}


- (void)methodNames_layoutSubViews {
    
    _varNames_topMarginValue = methodNames_setMargin_2base();
    
    [ClassNames_BaseViewLayout methodNames_layoutTop:_varNames_closeBtn methodNames_constriant:methodNames_setMargin_base()];
    [ClassNames_BaseViewLayout methodNames_layoutRight:_varNames_closeBtn methodNames_constriant:methodNames_setMargin_base()];
    [ClassNames_BaseViewLayout methodNames_layoutWidth:_varNames_closeBtn methodNames_constriant:methodNames_getCloseView_Width()];
    [ClassNames_BaseViewLayout methodNames_layoutHeight:_varNames_closeBtn methodNames_constriant:methodNames_getCloseView_Width()];
    
    
    [ClassNames_BaseViewLayout methodNames_layoutTop:_varNames_titleLabel methodNames_constriant:_varNames_topMarginValue];
    [ClassNames_BaseViewLayout methodNames_layoutLeft:_varNames_titleLabel methodNames_constriant:methodNames_getInputView_inputView_Margin()];
    [ClassNames_BaseViewLayout methodNames_layoutRight:_varNames_titleLabel methodNames_constriant:methodNames_getInputView_inputView_Margin()];
    [ClassNames_BaseViewLayout methodNames_layoutHeight:_varNames_titleLabel methodNames_constriant:methodNames_getTitleView_Height()];
    
    _varNames_topMarginValue += methodNames_getTitleView_Height();
    _varNames_topMarginValue += methodNames_setMargin_2base();
    
    
    [ClassNames_BaseViewLayout methodNames_layoutTop:_varNames_contentScrollView methodNames_constriant:_varNames_topMarginValue];
    [ClassNames_BaseViewLayout methodNames_layoutLeft:_varNames_contentScrollView methodNames_constriant:methodNames_getInputView_inputView_Margin()];
    [ClassNames_BaseViewLayout methodNames_layoutRight:_varNames_contentScrollView methodNames_constriant:methodNames_getInputView_inputView_Margin()];
    
    
    [ClassNames_BaseViewLayout methodNames_layoutLeft:_varNames_tipLabel methodNames_constriant:methodNames_getInputView_inputView_Margin()];
    [ClassNames_BaseViewLayout methodNames_layoutRight:_varNames_tipLabel methodNames_constriant:methodNames_getInputView_inputView_Margin()];
    [ClassNames_BaseViewLayout methodNames_layoutSubView1:_varNames_contentScrollView methodNames_attribute1:NSLayoutAttributeBottom methodNames_layoutSubView2:_varNames_tipLabel methodNames_attribute2:NSLayoutAttributeTop methodNames_constriant:0];
    [ClassNames_BaseViewLayout methodNames_layoutSubView1:_varNames_tipLabel methodNames_attribute1:NSLayoutAttributeBottom methodNames_layoutSubView2:_varNames_firstCommitBtn methodNames_attribute2:NSLayoutAttributeTop methodNames_constriant:-methodNames_setMargin_2base()];
    
    
    [ClassNames_BaseViewLayout methodNames_layoutBottom:_varNames_firstCommitBtn methodNames_constriant:methodNames_setMargin_base()];
    [ClassNames_BaseViewLayout methodNames_layoutHeight:_varNames_firstCommitBtn methodNames_constriant:methodNames_setCommitButtonHeight()];
    
    [ClassNames_BaseViewLayout methodNames_layoutBottom:_varNames_secondCommitBtn methodNames_constriant:methodNames_setMargin_base()];
    [ClassNames_BaseViewLayout methodNames_layoutHeight:_varNames_secondCommitBtn methodNames_constriant:methodNames_setCommitButtonHeight()];
    
    [ClassNames_BaseViewLayout methodNames_layoutSubView1:_varNames_firstCommitBtn methodNames_attribute1:NSLayoutAttributeTop methodNames_layoutSubView2:_varNames_secondCommitBtn methodNames_attribute2:NSLayoutAttributeTop methodNames_constriant:0];
    [ClassNames_BaseViewLayout methodNames_layoutLeft:_varNames_firstCommitBtn methodNames_constriant:methodNames_getInputView_inputView_Margin()];
    [ClassNames_BaseViewLayout methodNames_layoutSubView1:_varNames_firstCommitBtn methodNames_attribute1:NSLayoutAttributeRight methodNames_layoutSubView2:_varNames_secondCommitBtn methodNames_attribute2:NSLayoutAttributeLeft methodNames_constriant:-35];
    [ClassNames_BaseViewLayout methodNames_layoutRight:_varNames_secondCommitBtn methodNames_constriant:methodNames_getInputView_inputView_Margin()];
    [ClassNames_BaseViewLayout methodNames_layoutSubView1:_varNames_firstCommitBtn methodNames_attribute1:NSLayoutAttributeWidth methodNames_layoutSubView2:_varNames_secondCommitBtn methodNames_attribute2:NSLayoutAttributeWidth methodNames_constriant:0];
}
#pragma mark ---------- button Action
- (void)methodNames_firstCommitAction:(UIButton *)sender {
    if (self.methodNames_enterGame) {
        self.methodNames_enterGame();
        [self methodNames_hideViewWithAnimatecomplete:^{
            
        }];
    }
}

- (void)methodNames_secondCommitAction:(UIButton *)sender {
    if (self.methodNames_bindPhone) {
        self.methodNames_bindPhone();
        [self methodNames_hideViewWithAnimatecomplete:^{
            
        }];
    }
}

- (void)methodNames_closeAction:(UIButton *)sender {
    if (self.methodNames_enterGame) {
        self.methodNames_enterGame();
        [self methodNames_hideViewWithAnimatecomplete:^{
            
        }];
    }
}

@end
