

#import "ClassNames_URLSessionManager.h"
#import "ClassNames_URLSessionConfigure.h"
@interface ClassNames_URLSessionManager ()

@property (nonatomic, readwrite, strong) NSURLSessionDataTask *varNames_dataTask;

@property (nonatomic, readwrite, strong) NSURLSessionConfiguration *varNames_configuration;

@property (nonatomic, readwrite, strong) NSURLSession *varNames_session;

@end
@implementation ClassNames_URLSessionManager

+ (instancetype)methodNames_shareSessionManager {
    static ClassNames_URLSessionManager *varNames_sessionManager;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        varNames_sessionManager = [[ClassNames_URLSessionManager alloc]init];
    });
    return varNames_sessionManager;
}
- (instancetype)init {
    
    self = [super init];
    if (self) {
        [self methodNames_initail];
    }
    return self;
}

- (void)methodNames_initail {
    self.varNames_configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
    self.varNames_session = [NSURLSession sessionWithConfiguration:self.varNames_configuration];
}

- (void)methodNames_requestWithUrl:(NSString *)varNames_urlString
         subMethodNames_parameters:(NSDictionary *)varNames_parameters
            subMethodNames_success:(methodNames_voidSuccessBlock)varNames_successBlock
              subMethodNames_error:(methodNames_voidErrorBlock)varNames_errorBlock {
    NSAssert([varNames_parameters isKindOfClass:[NSDictionary class]], @"参数不是json格式");
    varNames_urlString = [varNames_urlString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
    NSURL *varNames_tmpurl = [NSURL URLWithString:varNames_urlString];
    NSMutableURLRequest *varNames_tmprequestM = [NSMutableURLRequest requestWithURL:varNames_tmpurl cachePolicy:NSURLRequestReloadIgnoringCacheData timeoutInterval:varNames_requestTimeOut];
    varNames_tmprequestM.HTTPMethod = varNames_requestType_Post;
    [varNames_tmprequestM setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    NSData *varNames_tmpjsonData = [NSJSONSerialization dataWithJSONObject:varNames_parameters options:NSJSONWritingPrettyPrinted error:nil];
    
    NSString *varNames_tmpjsonS = [[NSString alloc]initWithData:varNames_tmpjsonData encoding:NSUTF8StringEncoding];
    
    varNames_tmprequestM.HTTPBody = [varNames_tmpjsonS dataUsingEncoding:NSUTF8StringEncoding];
    
    
    
    //创建请求 Task
    NSURLSessionDataTask *varNames_tmpdataTask = [self.varNames_session dataTaskWithRequest:varNames_tmprequestM completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        
        if (error) {
            
            if (varNames_errorBlock) {
                varNames_errorBlock(error);
            }
        } else {
            if (varNames_successBlock) {
                
                NSDictionary *varNames_tmpdict = [NSJSONSerialization JSONObjectWithData:data options:(NSJSONReadingMutableLeaves) error:nil];
                varNames_successBlock(varNames_tmpdict);
            }
        }
    }];
    //发送请求
    [varNames_tmpdataTask resume];
}



- (void)methodNames_requestWithUrl:(NSString *)urlString parameters:(NSDictionary *)parameters success:(methodNames_voidSuccessBlock)successBlock error:(methodNames_voidErrorBlock)errorBlock {
    
    NSAssert([parameters isKindOfClass:[NSDictionary class]], @"参数不是json格式");
    
    urlString = [urlString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
    NSURL *url = [NSURL URLWithString:urlString];
    NSMutableURLRequest *requestM = [NSMutableURLRequest requestWithURL:url cachePolicy:NSURLRequestReloadIgnoringCacheData timeoutInterval:varNames_requestTimeOut];
    requestM.HTTPMethod = varNames_requestType_Post;
    [requestM setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:parameters options:NSJSONWritingPrettyPrinted error:nil];
    
    NSString *jsonS = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
    
    requestM.HTTPBody = [jsonS dataUsingEncoding:NSUTF8StringEncoding];
    
    
    
    //创建请求 Task
    NSURLSessionDataTask *dataTask = [self.varNames_session dataTaskWithRequest:requestM completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        
        if (error) {
            
            if (errorBlock) {
                errorBlock(error);
            }
        } else {
            if (successBlock) {
                
                NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:data options:(NSJSONReadingMutableLeaves) error:nil];
                successBlock(dict);
            }
        }
    }];
    //发送请求
    [dataTask resume];
}


@end
