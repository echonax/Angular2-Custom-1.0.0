export enum EventType{
    Any,
    
    Music,
    ElectroGuitar,
    Guitar,
    Drums,
    Bassist,
    Keyboard,
    Vocal,

    Sports,
    Basketball,
    Football,
    Rugby,
    Tenis,
    Voleyball,

    Games
};

export enum EventPublicity{
   PUBLIC,
   PRIVATE,
   FRIENDS_ONLY
};

export enum EventSubscriptionStatus{
    SUBSCRIBED,
    APPROVED,
    REJECTED
}

interface EventInfo{
    subscriberCount: number;
}