"use strict";
(function (EventType) {
    EventType[EventType["Any"] = 0] = "Any";
    EventType[EventType["Music"] = 1] = "Music";
    EventType[EventType["ElectroGuitar"] = 2] = "ElectroGuitar";
    EventType[EventType["Guitar"] = 3] = "Guitar";
    EventType[EventType["Drums"] = 4] = "Drums";
    EventType[EventType["Bassist"] = 5] = "Bassist";
    EventType[EventType["Keyboard"] = 6] = "Keyboard";
    EventType[EventType["Vocal"] = 7] = "Vocal";
    EventType[EventType["Sports"] = 8] = "Sports";
    EventType[EventType["Basketball"] = 9] = "Basketball";
    EventType[EventType["Football"] = 10] = "Football";
    EventType[EventType["Rugby"] = 11] = "Rugby";
    EventType[EventType["Tenis"] = 12] = "Tenis";
    EventType[EventType["Voleyball"] = 13] = "Voleyball";
    EventType[EventType["Games"] = 14] = "Games";
})(exports.EventType || (exports.EventType = {}));
var EventType = exports.EventType;
;
(function (EventPublicity) {
    EventPublicity[EventPublicity["PUBLIC"] = 0] = "PUBLIC";
    EventPublicity[EventPublicity["PRIVATE"] = 1] = "PRIVATE";
    EventPublicity[EventPublicity["FRIENDS_ONLY"] = 2] = "FRIENDS_ONLY";
})(exports.EventPublicity || (exports.EventPublicity = {}));
var EventPublicity = exports.EventPublicity;
;
(function (EventSubscriptionStatus) {
    EventSubscriptionStatus[EventSubscriptionStatus["SUBSCRIBED"] = 0] = "SUBSCRIBED";
    EventSubscriptionStatus[EventSubscriptionStatus["APPROVED"] = 1] = "APPROVED";
    EventSubscriptionStatus[EventSubscriptionStatus["REJECTED"] = 2] = "REJECTED";
})(exports.EventSubscriptionStatus || (exports.EventSubscriptionStatus = {}));
var EventSubscriptionStatus = exports.EventSubscriptionStatus;
//# sourceMappingURL=enums.js.map