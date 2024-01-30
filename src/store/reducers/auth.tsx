import AsyncStorage from '@react-native-async-storage/async-storage';
const data = {
    'host':'https://admin.shohozseba.com/user/',
    'name':'',
    'accessToken':'',
    'loggedIn':false,
    'activity':true,
    'newUser':false,
    'phoneNumber':'',
    'email':'',
    'id':'',
    'lat':'23.777176',
    'lng':'90.399452',
    "locationName":"Loading ...",
    'details':"",
    'tradeLicance':'',
    'profilePicture':'',
    'loadingR':false,
    'agoraAppId':'85944551dccc49a687206aebdccfc76c',
    'agoraToken':'007eJxTYNhSEyduUSpx+JhUtv2NKraoSy5Tvj315VfJlXC5dfOulrsCg4WppYmJqalhSnJysollopmFuZGBWWJqEpCflmxulpwtEpjSEMjIcKDGkYWRAQJBfDaG3My8jMQqBgYABJgejw==',
    'agoraAppSecret':'b6106ad415624a19afed254a9f56b6ba',
    'channel':'minhaz',
    'cart':[],
    'checkoutDetails':null
};

const reducer = (state = data, action:any) => {
    switch (action.type) {
        
        case 'LOGOUT':
            AsyncStorage.setItem('loggedIn', "false");
            return {
                ...state,
                loggedIn: action.logged
            };
        case 'UPDATECART':
            return {
                ...state,
                cart: action.payload
            };
        case 'CHECKOUTDETAILS':
            return {
                ...state,
                checkoutDetails: action.payload
            };
        case 'NEWUSER':
            return {
                ...state,
                newUser: action.payload
            };
        case 'LOADING':
            return {
                ...state,
                loadingR: action.loading
            };
        case 'CHANGE_LOCATION':
            return{
                ...state,
                lat:action.logged.latitude,
                lng:action.logged.longitude,
                locationName:action.logged.locationName
            };
        case 'LOGIN':
            AsyncStorage.setItem('loggedIn', action.logged.toString());
            return {
                ...state,
                loggedIn: action.logged
            };
        case 'PROFILE_CHANGE':
            AsyncStorage.setItem('id', action.user.id.toString());
            return {
                ...state,
                name: action.user.name,
                email: action.user.email,
                phoneNumber: action.user.phone_number,
                lat: action.user.lat,
                lng: action.user.lng,
                tradeLicance: action.user.trade_licence,
                id: action.user.id,
                details: action.user.details,
                profilePicture:action.user.profile_picture
            };
        case 'SETSTATE':
            return {
                ...state,
                loggedIn: action.stata
            };
        case 'UPDATE_DP':
                return {
                    ...state,
                    profilePicture: action.dp
                };
        case 'CHANGE_ACTIVITY':
            return {
                ...state,
                activity: action.stata
            };
        case 'CHANGE_TOKEN':
            AsyncStorage.setItem('token', action.token.toString());
            return {
                ...state,
                accessToken: action.token
            };
        default:
            return state;
    }
};
export default reducer;