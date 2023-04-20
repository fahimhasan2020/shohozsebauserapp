import { Dimensions } from "react-native"
const {height,width} = Dimensions.get('window');
export const sizes = {
    fullHeight: '100%',
    fullWidth: '100%',
    windowHeight:height,
    windowWidth:width,
    windowHeightHalf:height/2.5,
    windowWidthHalf:width/2.5
}