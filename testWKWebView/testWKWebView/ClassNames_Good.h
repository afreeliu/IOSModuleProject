//
//  ClassNames_Good.h
//  testWKWebView
//
//  Created by TB on 2019/1/28.
//  Copyright © 2019 crown. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>
NS_ASSUME_NONNULL_BEGIN
@protocol JSExportForIOS <JSExport>

- (void)methodNames_login;

- (void)methodNames_payGood:(id)arg;

@end


@interface ClassNames_Good : NSObject<JSExportForIOS>

@property (nonatomic, readwrite, copy) NSString *productID;

@end

NS_ASSUME_NONNULL_END
