
#import <Foundation/Foundation.h>

@protocol ClassNames_URLProtocol <NSObject>

- (void)methodNames_fetchDataWithURL:(NSString *)varNames_url
           subMethodNames_parameters:(NSDictionary *)varNames_para
              subMethodNames_success:(void (^)(NSDictionary *varNames_responseData))varNames_successBlock
              subMethodNames_failure:(void (^)(NSError *varNames_error))varNames_errBlock;

- (void)methodNames_modelWithDict:(NSDictionary *)dict;

@end
