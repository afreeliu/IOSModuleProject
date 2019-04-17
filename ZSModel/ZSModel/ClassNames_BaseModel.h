

#import <Foundation/Foundation.h>
#import <ZSTool/ZSTool.h>
@interface ClassNames_BaseModel : NSObject

@property (nonatomic, readonly, assign) NSInteger varNames_code;
@property (nonatomic, readonly, copy) NSString *varNames_msg;
@property (nonatomic, readonly, assign) BOOL varNames_success;
@property (nonatomic, readonly, strong) id varNames_data;

@property (nonatomic, readwrite, copy) void (^methodNames_completeFetchData)(id object);
@property (nonatomic, readwrite, copy) void (^methodNames_FetchError)(NSError *error);

- (void)methodNames_fetchDataWithdURL:(NSString *)url parameters:(NSDictionary *)para;

@end


