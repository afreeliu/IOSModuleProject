

#import <Foundation/Foundation.h>
typedef void (^methodNames_voidSuccessBlock)(NSDictionary *responseData);
typedef void (^methodNames_voidErrorBlock)(NSError *error);
@interface ClassNames_URLSessionManager : NSObject

+ (instancetype)methodNames_shareSessionManager;

- (void)methodNames_requestWithUrl:(NSString *)varNames_urlString
         subMethodNames_parameters:(NSDictionary *)varNames_parameters
            subMethodNames_success:(methodNames_voidSuccessBlock)varNames_successBlock
              subMethodNames_error:(methodNames_voidErrorBlock)varNames_errorBlock;


@end
