//
//  ClassNames_BaseModel.h
//  ZSModel
//
//  Created by TB on 2019/3/7.
//  Copyright © 2019 wo. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ClassNames_BaseModel : NSObject

@property (nonatomic, readonly, assign) NSInteger varNames_code;
@property (nonatomic, readonly, copy) NSString *varNames_msg;
@property (nonatomic, readonly, assign) BOOL varNames_success;
@property (nonatomic, readonly, strong) id varNames_data;

@property (nonatomic, readwrite, copy) void (^methodNames_completeFetchData)(id object);
@property (nonatomic, readwrite, copy) void (^methodNames_FetchError)(NSError *error);

- (void)methodNames_fetchDataWithdURL:(NSString *)url parameters:(NSDictionary *)para;

@end


