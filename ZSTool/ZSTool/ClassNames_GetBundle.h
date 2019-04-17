


#import <Foundation/Foundation.h>

/// bundle 的名称
FOUNDATION_EXTERN NSString *const varNames_bundleName;
/// bundle 里面plist的名称
FOUNDATION_EXTERN NSString *const varNames_plistName;


#pragma mark ---------- 获取bundle里面的plist的主内容返回dic
static inline NSDictionary *methodNames_getBundlePlistContent() {
    NSString *varNames_tmpbundlePath = [[[NSBundle mainBundle]resourcePath]stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.bundle", varNames_bundleName]];
    NSBundle *varNames_tmpbundle = [NSBundle bundleWithPath:varNames_tmpbundlePath];
    NSString *varNames_tmppath = [varNames_tmpbundle pathForResource:[NSString stringWithFormat:@"%@", varNames_plistName] ofType:@"plist"];
    NSDictionary *varNames_tmpdic = [NSDictionary dictionaryWithContentsOfFile:varNames_tmppath];
    return varNames_tmpdic;
}
