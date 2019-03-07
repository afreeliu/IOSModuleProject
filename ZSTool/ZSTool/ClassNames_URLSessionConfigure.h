

#import <Foundation/Foundation.h>

FOUNDATION_EXTERN NSString *const varNames_requestConfigKey;
FOUNDATION_EXTERN NSString *const varNames_baseURL;
FOUNDATION_EXTERN NSString *const varNames_requestType_Post;
FOUNDATION_EXTERN NSString *const varNames_requestType_Get;
FOUNDATION_EXTERN NSUInteger const varNames_requestTimeOut;
FOUNDATION_EXTERN NSString *const varNames_requestConfiguration;

FOUNDATION_EXTERN NSString *const varNames_httpKey;
FOUNDATION_EXTERN NSString *const varNames_ipKey;
FOUNDATION_EXTERN NSString *const varNames_portKey;

FOUNDATION_EXTERN NSString *const varNames_interFace;
FOUNDATION_EXTERN NSString *const varNames_type;
FOUNDATION_EXTERN NSString *const varNames_activate;
FOUNDATION_EXTERN NSString *const varNames_gameinitialise;
FOUNDATION_EXTERN NSString *const varNames_memberorder;
FOUNDATION_EXTERN NSString *const varNames_updateuserlogin;
FOUNDATION_EXTERN NSString *const varNames_memberole;
FOUNDATION_EXTERN NSString *const varNames_member;
FOUNDATION_EXTERN NSString *const varNames_updatepsw;
FOUNDATION_EXTERN NSString *const varNames_bindphone;
FOUNDATION_EXTERN NSString *const varNames_bindidcard;
FOUNDATION_EXTERN NSString *const varNames_backuserpsw;
FOUNDATION_EXTERN NSString *const varNames_phonetest;
FOUNDATION_EXTERN NSString *const varNames_verify;
FOUNDATION_EXTERN NSString *const varNames_appstore;
FOUNDATION_EXTERN NSString *const varNames_customqq;
FOUNDATION_EXTERN NSString *const varNames_walkthrough;



#pragma mark ---------- 接口
static inline NSDictionary *methodNames_getRequestConfig() {
    NSString *varNames_tmpbundlePath = [[[NSBundle mainBundle]resourcePath]stringByAppendingPathComponent:@"PlatFormGamesSDK.bundle"];
    NSBundle *varNames_tmpbundle = [NSBundle bundleWithPath:varNames_tmpbundlePath];
    NSString *varNames_tmppath = [varNames_tmpbundle pathForResource:@"PFGames" ofType:@"plist"];
    NSDictionary *varNames_tmpdic = [NSDictionary dictionaryWithContentsOfFile:path];
    NSDictionary *varNames_tmprequestConfig = [varNames_tmpdic objectForKey:varNames_requestConfigKey];
    return varNames_tmprequestConfig;
}
static inline NSString *methodNames_getRequestConfigValueForKey(NSString *key) {
    NSDictionary *varNames_tmpconfig = methodNames_getRequestConfig();
    NSString *varNames_tmpvalue;
    if (varNames_tmpconfig) {
        varNames_tmpvalue = [varNames_tmpconfig objectForKey:varNames_tmpkey];
    }
    return value;
}
static inline NSString *methodNames_httpDelegate() {
    NSString *varNames_tmphttp = methodNames_getRequestConfigValueForKey(varNames_httpKey);
    return varNames_tmphttp? : varNames_httpKey;
}
static inline NSString *methodNames_ipAddress() {
    NSString *varNames_tmpip = methodNames_getRequestConfigValueForKey(varNames_ipKey);
    return varNames_tmpip ? : varNames_ipKey;
}
static inline NSString *methodNames_hostPort() {
    NSString *varNames_tmpport = methodNames_getRequestConfigValueForKey(varNames_portKey);
    return varNames_tmpport ? : varNames_portKey;
}
static inline NSString *methodNames_indexAddress() {
    NSString *varNames_tmppath = methodNames_getRequestConfigValueForKey(varNames_interFace);
    return varNames_tmppath ? : @"userua";
}

static inline NSString *methodNames_memberType() {
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return varNames_tmptype ? : @"login";
}
static inline NSString *methodNames_baseURL() {
    return [NSString stringWithFormat:@"%@://%@:%@/%@", methodNames_httpDelegate(), methodNames_ipAddress(), methodNames_hostPort(), methodNames_indexAddress()];
}
static inline NSString *methodNames_protocolURL(NSString *varNames_protocol) {
    return [NSString stringWithFormat:@"%@://%@:%@/%@", methodNames_httpDelegate(), methodNames_ipAddress(), methodNames_hostPort(), varNames_protocol];
}
static inline NSString *methodNames_verifyURL() {
    NSString *varNames_tmpverify = methodNames_getRequestConfigValueForKey(varNames_verify);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpverify?:@"verify", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_phonetestURL() {
    NSString *varNames_tmpphonetest = methodNames_getRequestConfigValueForKey(varNames_phonetest);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpphonetest?:@"ptest", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_bindphoneURL() {
    NSString *varNames_tmpbindphone = methodNames_getRequestConfigValueForKey(varNames_bindphone);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpbindphone?:@"bdphone", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_bindidcardURL() {
    NSString *varNames_tmpbindidcard = methodNames_getRequestConfigValueForKey(varNames_bindidcard);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpbindidcard?:@"bindidcard", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_gameinitialiseURL() {
    NSString *varNames_tmpgameinitialise = methodNames_getRequestConfigValueForKey(varNames_gameinitialise);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpgameinitialise?:@"gameinitialise", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_activateURL() {
    NSString *varNames_tmpactivate = methodNames_getRequestConfigValueForKey(varNames_activate);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpactivate?:@"activate", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_memberVisitorURL() {
    NSString *varNames_tmpmember = methodNames_getRequestConfigValueForKey(varNames_member);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/0", methodNames_baseURL(), varNames_tmpmember?:@"login", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_memberPhoneURL() {
    NSString *varNames_tmpmember = methodNames_getRequestConfigValueForKey(varNames_member);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/1", methodNames_baseURL(), varNames_tmpmember?:@"member", varNames_tmptype?:varNames_type];
}
static inline NSString *methodNames_memberRegisterURL() {
    NSString *varNames_tmpmember = methodNames_getRequestConfigValueForKey(varNames_member);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/2", methodNames_baseURL(), varNames_tmpmember?:@"member", varNames_tmptype?:varNames_type];
}
static inline NSString *methodNames_memberLoginURL() {
    NSString *varNames_tmpmember = methodNames_getRequestConfigValueForKey(varNames_member);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/3", methodNames_baseURL(), varNames_tmpmember?:@"member", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_updatepswURL() {
    NSString *varNames_tmpupdatepsw = methodNames_getRequestConfigValueForKey(varNames_updatepsw);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpupdatepsw?:@"updatepsw", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_backuserpswURL() {
    NSString *varNames_tmpbackuserpsw = methodNames_getRequestConfigValueForKey(varNames_backuserpsw);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpbackuserpsw?:@"backuserpsw", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_memberoleURL() {
    NSString *varNames_tmpmemberole = methodNames_getRequestConfigValueForKey(varNames_memberole);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpmemberole?:@"memberole", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_updateuserloginURL() {
    NSString *varNames_tmpupdateuserlogin = methodNames_getRequestConfigValueForKey(varNames_updateuserlogin);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpupdateuserlogin?:@"updateuserlogin", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_memberorderURL() {
    NSString *varNames_tmpmemberorder = methodNames_getRequestConfigValueForKey(varNames_memberorder);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpmemberorder?:@"memberorder", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_appstoreURL() {
    NSString *varNames_tmpappstore = methodNames_getRequestConfigValueForKey(varNames_appstore);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@/", methodNames_baseURL(), varNames_tmpappstore?:@"appstore", varNames_tmptype?:methodNames_memberType()];
}
static inline NSString *methodNames_suspensionCustomQQURL() {
    NSString *varNames_tmpcustomqq = methodNames_getRequestConfigValueForKey(varNames_customqq);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@", methodNames_baseURL(), varNames_tmpcustomqq?:@"customQQ", varNames_tmptype?:@"login"];
}
static inline NSString *methodNames_suspensionWalkThroughURL() {
    NSString *varNames_tmpwalkthrough = methodNames_getRequestConfigValueForKey(varNames_walkthrough);
    NSString *varNames_tmptype = methodNames_getRequestConfigValueForKey(varNames_type);
    return [NSString stringWithFormat:@"%@/%@/%@", methodNames_baseURL(), varNames_tmpwalkthrough?:@"walkThrough", varNames_tmptype?:@"login"];
}





