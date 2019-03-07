

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ClassNames_SuggestView : UIView

+ (instancetype)methodNames_createSuggestView;

@property (nonatomic, readwrite, copy) void(^methodNames_enterGame)(void);
@property (nonatomic, readwrite, copy) void(^methodNames_bindPhone)(void);

- (void)methodNames_showViewWithAnimatecomplete:(void (^)(void))methodNames_completeAction;

- (void)methodNames_hideViewWithAnimatecomplete:(void (^)(void))methodNames_completeAction;

@end

NS_ASSUME_NONNULL_END
