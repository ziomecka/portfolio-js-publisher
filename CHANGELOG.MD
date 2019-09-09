# @2.0.4 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.09.09]
* modifies EmitterInstance type so it extends object with key of string type

# @2.0.3 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.09.09]
* adds Window to EmitterInstance type

# @2.0.2 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.09.08]
* converts EventCallback to generic type so type React.Events can be used
* exports EmitterInstance type

# @2.0.1 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.09.08]
* accepts 'string', 'number' and 'symbol' as types of keys in EmitterInstance, thus window will be valid emitterInstance
* adds and exports type UnsubscribeFunction
* adds eol-last eslint rule
* modifies README

# @2.0.0 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.09.08]
* changes Publisher parameters: from emitterInstance's methods to names of emitterInstance's methods (functions to strings)
* publisher subscribes to eventEmitter's event only once (bugFix)
* corrects rest operator in Publisher's constructor (bugFix)
* corrects getEventData method, so it returns either eventData or undefined (bugFix)
* adds type : EmitterInstance and type guard: isValidEmitter
* refactors code, among others: separates dir for mocks, separates file for types, removes eventEmitterStub's subscription to its events
* modifies README

# @1.3.1 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.09.07]
* modifies README

# @1.3.0 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.09.07]
* converts publisher's subscribersCount to method
* renames type EventCallback to SubscribersEventCallback
* exports type SubscribersEventCallback
* modifies README

# @1.2.0 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.09.07]
* changes publisher's unsubscribeAll and eventSubscribersCount methods to fat arrows
* adds PublisherProps type

# @1.1.0 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.09.07]
* changes publisher's subscribe method to fat arrow

# @1.0.1 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.09.07]
* adds babel/preset-env