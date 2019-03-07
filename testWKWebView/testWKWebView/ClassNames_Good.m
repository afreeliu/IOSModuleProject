//
//  ClassNames_Good.m
//  testWKWebView
//
//  Created by TB on 2019/1/28.
//  Copyright © 2019 crown. All rights reserved.
//

#import "ClassNames_Good.h"
#import <UIKit/UIKit.h>
#import "UmPlatsFormGameManager.h"
@implementation ClassNames_Good
- (void)methodNames_login {
    NSLog(@"调用");
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UmPlatsFormGameManager umPlatsFormManagerDeafaults]umPlatsFormLogin];
    });
}

- (void)methodNames_ocCallJS {
    
    
    
}



-(void) methodNames_payGood:(id)arg1
{
    NSString *jsonString = (NSString *)arg1;
    NSLog(@"%@",jsonString);
    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err;
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&err];
    
//    NSDictionary *dic = (NSDictionary *)arg1;
//    NSLog(@"dic:%@", dic.superclass);
    
    NSString *productid = [self methodNames_getValueFormDic:dic key:@"productId"];
    NSString *money = [self methodNames_getValueFormDic:dic key:@"money"];
    NSString *cpOrderId = [self methodNames_getValueFormDic:dic key:@"cpOrderId"];
    NSString *ProductName = [self methodNames_getValueFormDic:dic key:@"ProductName"];
    NSString *descripiton = [self methodNames_getValueFormDic:dic key:@"descripiton"];
    NSString *roleId = [self methodNames_getValueFormDic:dic key:@"roleId"];
    NSString *roleName = [self methodNames_getValueFormDic:dic key:@"roleName"];
    NSString *roleLeve = [self methodNames_getValueFormDic:dic key:@"roleLeve"];
    NSString *serverId = [self methodNames_getValueFormDic:dic key:@"serverId"];
    NSString *serverName = [self methodNames_getValueFormDic:dic key:@"serverName"];
    NSString *memo = [self methodNames_getValueFormDic:dic key:@"memo"];
    
    self.productID = productid;
    
    [[UmPlatsFormGameManager umPlatsFormManagerDeafaults]umPlatsFormProductId:productid withAppleMoney:money withCpOrderId:cpOrderId WithProductName:ProductName withProductDesc:descripiton withRoleId:roleId withRoleName:roleName withRoleLevel:roleLeve withServerID:serverId withServerName:serverName withMemo:memo];
}

- (NSString *)methodNames_getValueFormDic:(NSDictionary *)dic key:(NSString *)key {
    
    if (!dic || [dic isEqual:NULL] || !key || !key.length) {
        return @"";
    }
    if ([[dic objectForKey:key]isKindOfClass:NSString.class]) {
        return [dic objectForKey:key];
    }
    if ([[dic objectForKey:key]isKindOfClass:NSNumber.class]) {
        NSNumber *valueNumber = [dic objectForKey:key];
        return valueNumber.stringValue;
    }
    return @"";
}





@end
